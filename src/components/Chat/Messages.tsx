"use client"
import { format, isToday, isYesterday } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCheck, FaTrash } from 'react-icons/fa6';
import { useState, useEffect, useRef, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import ReactMarkdown from 'react-markdown';
import { type Message } from '@/types/chat';
import { useChatContext } from '../Context/ChatProvider';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

import "../../styles/message.css";

interface MessageProps {
  message: Message;
  isConsecutive?: boolean;
  onDelete?: () => void;
  tools?: Tool[]; // Add this to store tools with the message
}

interface Tool {
  tool_name: string;
  additional_kwargs: string;
}

export const Messages: React.FC<MessageProps> = ({ message, isConsecutive, onDelete }) => {
  const { state, addToolToMessage } = useChatContext()
  const threadId = state.chat?.threadId
  // const params = useParams(); // Access the dynamic route parameters
  const chatId = state.chat?.chatId
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
        <div key={match.index} className="relative group w-full">
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
    console.log("Current message tools:", message.tools);
  }, [message.tools]);

  useEffect(() => {
    if (message.role === 'assistant' && message.isLoading && message.id !== 'temp-loading' && chatId && threadId) {
      const fetchStream = async () => {
        abortControllerRef.current = new AbortController();
        
        try {
          // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/stream?question=${encodeURIComponent(message.content)}`, {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/stream?conversationId=${chatId}&threadId=${threadId}`, {
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
          if (!reader) {
            setStreamedContent("Sorry, I was unable to get you a response, Kindly you try again")
            return
          };

          let accumulated = '';
          let buffer = '';
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = new TextDecoder().decode(value);
            // Each chunk might contain multiple SSE messages
            const messages = text.split('\n\n');

            const lines = buffer.split('\n');
            // Keep the last (potentially incomplete) line in the buffer
            buffer = lines.pop() || '';

            for (const msgText  of messages) {
              if (msgText .startsWith('data: ')) {
                const data = msgText .slice(6); // Remove "data: " prefix
                try {
                  // Try to parse as tool data
                  const parsedData = JSON.parse(data);
                  if (parsedData.type === 'tool') {
                    addToolToMessage(message.id, {
                      tool_name: parsedData.payload.tool_name,
                      additional_kwargs: JSON.stringify(parsedData.payload.additional_kwargs)
                    });
                    console.log(parsedData)
                  } else {
                    // If not tool data, treat as content
                    accumulated += data;
                    setStreamedContent(accumulated);
                  }
                } catch {
                  // If can't parse as JSON, it's content
                  accumulated += data;
                  setStreamedContent(accumulated);
                }
              }
            }
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
  }, [message.isLoading, message.content, message.role, addToolToMessage, message.id, message.tools]);

  const renderToolUI = (tool: Tool) => {
    console.log("Attempting to render tool:", tool);

    let kwargs;
    try {
      kwargs = typeof tool.additional_kwargs === 'string' 
        ? JSON.parse(tool.additional_kwargs) 
        : tool.additional_kwargs;
      
      switch (tool.tool_name) {
        case 'get_account_type':
          return (
            <div key={`${message.id}-${tool.tool_name}`} className="mt-2 p-3 bg-gray-800 rounded-lg">
              <div className="flex flex-col gap-y-1">
                <div className="text-sm text-gray-300">
                  Account Type: {kwargs.isWallet ? 'Wallet' : kwargs.isToken ? 'Token' : 'Program'}
                </div>
                <div className="text-sm text-gray-300">
                  Owner: {kwargs.owner}
                </div>
              </div>
            </div>
          );

        case 'get_complete_balance':
          return (
            <div key={`${message.id}-${tool.tool_name}`} className="mt-2 p-3 bg-gray-800 rounded-lg">
              <div className="flex flex-col gap-y-2">
                <div className="text-sm text-gray-300">
                  <div>SOL Balance: {kwargs.nativeBalance?.balanceFormatted}</div>
                  <div>Value in USD: ${kwargs.nativeBalance?.valueInUsd}</div>
                </div>
                {kwargs.tokenPortfolio?.tokens && (
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-200 mb-1">Token Portfolio:</div>
                    <div className="space-y-1">
                      {kwargs.tokenPortfolio.tokens.map((token: any, index: number) => (
                        <div key={`${message.id}-token-${index}`} className="text-sm text-gray-300 flex justify-between">
                          <span>{token.name} ({token.symbol})</span>
                          <span>${token.value.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-700 text-sm text-gray-200">
                      Total Value: ${kwargs.totalValueUsd}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );

        default:
          console.warn(`Unknown tool type: ${tool.tool_name}`);
          return null;
      }
    } catch (error) {
      console.error('Error rendering tool UI:', error, tool);
      return null;
    }
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} 
      ${!isConsecutive ? 'mt-6' : 'mt-2'}`}>
      <div className="relative group max-w-[80%]">
        <div className={`max-w-full whitespace-normal text__word-wrap box-content flex justify-center py-4 px-6 break-words ${
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
              <div className="w-fit">{message.content}</div>
            ) : (
              renderContent(message.content)
            )}
        </div>
        {/*conditionally render the action ui based on the tool streamed in below */}
        <div className="mt-2">
          {message.tools?.map((tool, index) => (
            <div key={`${message.id}-tool-${index}`}>
              {renderToolUI(tool)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};