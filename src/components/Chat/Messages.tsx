// components/Chat/Messages.tsx
import { format, isToday, isYesterday } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCheck, FaTrash } from 'react-icons/fa6';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { type Message } from '@/types/chat';

interface MessageProps {
  message: Message;
  isConsecutive?: boolean;  // For grouping messages
  onDelete?: () => void;    // Added onDelete prop
}

export const Messages: React.FC<MessageProps> = ({ message, isConsecutive, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const formatMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    if (isYesterday(date)) {
      return 'Yesterday ' + format(date, 'HH:mm');
    }
    return format(date, 'MMM d, HH:mm');
  };

  // Function to detect and parse code blocks in markdown
  const renderContent = () => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message.content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <ReactMarkdown key={lastIndex} className="prose prose-invert">
            {message.content.slice(lastIndex, match.index)}
          </ReactMarkdown>
        );
      }

      const language = match[1] || 'javascript';
      const code = match[2].trim();

      // Add code block
      parts.push(
        <div key={match.index} className="relative group">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            className="rounded-md !bg-[#1E1E1E]"
          >
            {code}
          </SyntaxHighlighter>
          <CopyToClipboard text={code} onCopy={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}>
            <button className="absolute top-2 right-2 p-2 rounded-md bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? <FaCheck size={14} /> : <FaRegCopy size={14} />}
            </button>
          </CopyToClipboard>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < message.content.length) {
      parts.push(
        <ReactMarkdown key={lastIndex} className="prose prose-invert">
          {message.content.slice(lastIndex)}
        </ReactMarkdown>
      );
    }

    return parts;
  };

  return (
    <div
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} 
        ${!isConsecutive ? 'mt-6' : 'mt-2'}`}
    >
      {/* Message Bubble */}
      <div className="relative group">
        <div className={`max-w-[80%] p-4 rounded-lg ${
          message.role === 'user' 
            ? 'bg-[#6FCB71] text-black' 
            : 'bg-[#121417] text-white'
        }`}>
          {message.isLoading ? (
            <div className="flex justify-center">
              <div className="animate-pulse">Thinking...</div>
            </div>
          ) : (
            <>
              {renderContent()}
              {/* Timestamp and Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-60 transition-opacity absolute bottom-1 right-2">
                <span className="text-xs">
                  {formatMessageTime(new Date(message.timestamp))}
                </span>
                {onDelete && (
                  <button 
                    onClick={onDelete}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;