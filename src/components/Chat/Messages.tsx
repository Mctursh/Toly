import { format, isToday, isYesterday } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCheck, FaTrash } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { type Message } from '@/types/chat';
import { useChatContext } from '../Context/ChatProvider';

interface MessageProps {
  message: Message;
  isConsecutive?: boolean;
  onDelete?: () => void;
}

export const Messages: React.FC<MessageProps> = ({ message, isConsecutive, onDelete }) => {
  const { state } = useChatContext()
  const accessToken = state.accessToken
  const [copied, setCopied] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const formatMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    if (isYesterday(date)) {
      return 'Yesterday ' + format(date, 'HH:mm');
    }
    return format(date, 'MMM d, HH:mm');
  };

  const renderContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <ReactMarkdown key={lastIndex} className="prose prose-invert text-nowrap">
            {content.slice(lastIndex, match.index)}
          </ReactMarkdown>
        );
      }

      const language = match[1] || 'javascript';
      const code = match[2].trim();

      parts.push(
        <div key={match.index} className="relative group">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            className="rounded-md !bg-[#1E1E1E]"
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{
              maxWidth: '100%',
              overflowX: 'auto',
              padding: '1rem'
            }}
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

    if (lastIndex < content.length) {
      parts.push(
        <ReactMarkdown key={lastIndex} className="prose prose-invert">
          {content.slice(lastIndex)}
        </ReactMarkdown>
      );
    }

    return parts;
  };

  useEffect(() => {
    if (message.role === 'assistant' && message.isLoading) {
      const fetchStream = async () => {
        abortControllerRef.current = new AbortController();
        
        try {
          // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/stream?question=${encodeURIComponent(message.content)}`, {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/stream`, {
          // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/mock-stream`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              question: message.content
            }),
            signal: abortControllerRef.current.signal
           });

          const reader = response.body?.getReader();
          if (!reader) return;

          let accumulated = '';
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const text = new TextDecoder().decode(value);
            accumulated += text;
            setStreamedContent(accumulated);
          }
        } catch (error) {
          // if (error.name === 'AbortError') return;
          console.error('Stream error:', error);
          throw error
        }
      };

      fetchStream();
      
      return () => {
        abortControllerRef.current?.abort();
      };
    }
  }, [message.isLoading, message.content, message.role]);

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} 
      ${!isConsecutive ? 'mt-6' : 'mt-2'}`}>
      <div className="relative group">
        <div className={`max-w-[80%] box-content flex justify-center py-4 px-6 break-words ${
          message.role === 'user' 
            ? 'bg-[#6FCB71] text-black ml-auto rounded-3xl rounded-br-[0]' 
            : 'bg-[#121417] text-white mr-auto rounded-3xl rounded-bl-[0] flex-col gap-y-4'
        }`}>
          {message.isLoading ? (
              streamedContent ? renderContent(streamedContent) : (
                <div className="flex justify-center">
                  <div className="animate-pulse">Thinking...</div>
                </div>
              )
            ) : message.role === 'user' ? (
              <div className="w-fit text-nowrap">{message.content}</div>
            ) : (
              renderContent(message.content)
            )}
          {!message.isLoading && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-60 transition-opacity absolute bottom-1 right-2">
              <span className="text-xs">{formatMessageTime(message.timestamp)}</span>
              {onDelete && (
                <button onClick={onDelete} className="p-1 hover:text-red-500 transition-colors">
                  <FaTrash size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};