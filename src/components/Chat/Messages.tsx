"use client"
import { format, isToday, isYesterday } from 'date-fns';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
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
import TokenLookup from '../ActionUIs/TokenLookup';
import SwapOnJupiter from '../ActionUIs/JupSwap';
import { LaunchTokenOnPump } from '../ActionUIs/PumpLaunch';
import TransferTokens from '../ActionUIs/TransferToken';

interface MessageProps {
  message: Message;
  isConsecutive?: boolean;
  onDelete?: () => void;
  setmessageTools?: (messageId: string, tool: Tool) => void
  tools?: Tool[]; // Add this to store tools with the message
  threadId: string
  chatId: string
  accessToken: string 
}

interface Tool {
  tool_name: string;
  additional_kwargs: string;
}

export const Messages: React.FC<MessageProps> = ({
  message,
  isConsecutive,
  setmessageTools,
  threadId,
  chatId,
  accessToken
}) => {
  const [copied, setCopied] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const [messageTools, setMesaageTool] = useState<Tool[]>([]);
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

  const CodeBlock = ({ className, children }: any) => {
    const [copied, setCopied] = useState(false);
    const language = className?.replace("language-", "") || "javascript";
    const code = String(children).trim();
  
    return (
      <div className="relative group w-full">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          className="rounded-md !bg-[#1E1E1E]"
          wrapLines={true}
          wrapLongLines={true}
          customStyle={{
            maxWidth: "100%",
            overflowX: "auto",
            padding: "1rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
        <CopyToClipboard
          text={code}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          <button className="absolute top-2 right-2 p-2 rounded-md bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? <FaCheck size={14} /> : <FaRegCopy size={14} />}
          </button>
        </CopyToClipboard>
      </div>
    );
  };

  // Function to clean up the raw text into readable Markdown format
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\s+/g, " ") // Remove excessive spaces
      .replace(/\n{2,}/g, "\n\n") // Ensure proper paragraph spacing
      .replace(/(?<![-*])\s*(`[^`]+`):/g, "$1") // Remove colons after inline code if not in a list
      .replace(/(\!\[.*?\]\(.*?\))(?=[^\n])/g, "$1\n") // Ensure images are followed by a newline
      .replace(/(?<=\S)-\s(?=\*\*)/g, "\n- ") // Fix list items stuck together
      .replace(/(?<!\n)(#+)\s*([^#\n])/g, "\n$1 $2") // Ensure headers are on a new line
      .replace(/(#+ .+?)(?=\n|$)/g, "$1\n---\n") // Add horizontal rules before headers
      .trim();
};
  // const cleanMarkdown = (text: string) => {
  //   return text
  //     .replace(/\s+/g, " ") // Remove excessive spaces
  //     .replace(/\n{2,}/g, "\n\n") // Ensure proper paragraph spacing
  //     .replace(/(?<![-*])\s*(`[^`]+`):/g, "$1") // Remove colons after inline code if not in a list
  //     .replace(/(\!\[.*?\]\(.*?\))(?=[^\n])/g, "$1\n") // Ensure images are followed by a newline
  //     .replace(/\n?(-\s.*?)(?=\n|$)/g, "\n$1") // Ensure list items are on new lines
  //     .replace(/(?<!\n)(#+)\s*([^#\n])/g, "\n$1 $2") // Ensure headers are on a new line
  //     .replace(/(#+ .+?)(?=\n|$)/g, "$1\n---\n") // Add horizontal rules before and after headers
  //     .trim();
  // };
  

  const renderContent = (content: string) => {
    // const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const formattedContent = cleanMarkdown(content);
    console.log(formattedContent);
    console.log(content);
  
    const parts = [];
    let lastIndex = 0;
    let match;

    // const RenderContent = ({ content }: { content: string }) => {
    //   const formattedContent = cleanMarkdown(content);
    
    //   return (
    //     <ReactMarkdown
    //       className="prose prose-invert"
    //       remarkPlugins={[remarkGfm]} // Support tables, lists, etc.
    //       rehypePlugins={[rehypeRaw]} // Allow raw HTML if needed
    //       components={{
    //         code: CodeBlock, // Render code blocks properly
    //       }}
    //     >
    //       {formattedContent}
    //     </ReactMarkdown>
    //   );
    // };

    // while ((match = codeBlockRegex.exec(content)) !== null) {
    //   if (match.index > lastIndex) {
    //     parts.push(
    //       <ReactMarkdown key={lastIndex} className="prose prose-invert text-nowrap">
    //         {content.slice(lastIndex, match.index)}
    //       </ReactMarkdown>
    //     );
    //   }

    //   const language = match[1] || 'javascript';
    //   const code = match[2].trim();

    //   parts.push(
    //     <div key={match.index} className="relative group w-full">
    //       <SyntaxHighlighter
    //         language={language}
    //         style={vscDarkPlus}
    //         className="rounded-md !bg-[#1E1E1E]"
    //         wrapLines={true}
    //         wrapLongLines={true}
    //         customStyle={{
    //           maxWidth: '100%',
    //           overflowX: 'auto',
    //           padding: '1rem'
    //         }}
    //       >
    //         {code}
    //       </SyntaxHighlighter>
    //       <CopyToClipboard text={code} onCopy={() => {
    //         setCopied(true);
    //         setTimeout(() => setCopied(false), 2000);
    //       }}>
    //         <button className="absolute top-2 right-2 p-2 rounded-md bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
    //           {copied ? <FaCheck size={14} /> : <FaRegCopy size={14} />}
    //         </button>
    //       </CopyToClipboard>
    //     </div>
    //   );

    //   lastIndex = match.index + match[0].length;
    // }

    parts.push(
      <ReactMarkdown
      className="prose prose-invert"
      remarkPlugins={[remarkGfm]} // Support tables, lists, etc.
      rehypePlugins={[rehypeRaw]} // Allow raw HTML if needed
      components={{
        code: CodeBlock, // Render code blocks properly
      }}
    >
      {formattedContent}
    </ReactMarkdown>
      // <ReactMarkdown key={lastIndex} className="prose prose-invert">
      //   {content.slice(lastIndex)}
      // </ReactMarkdown>
    );
    // if (lastIndex < content.length) {
    //   parts.push(
    //     <ReactMarkdown key={lastIndex} className="prose prose-invert">
    //       {content.slice(lastIndex)}
    //     </ReactMarkdown>
    //   );
    // }

    return parts;
  };

  useEffect(() => {
    console.log("Current message tools:", messageTools);
  }, [messageTools]);
  // }, [message.tools]);

  useEffect(() => {
    console.log("chatId", chatId);
    console.log("threadId", threadId);
    
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
          let tools: Tool[] = []
          
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
                    // dispatch({
                    //   type: "ADD TOOL TO MESSAGE",
                    //   payload: {}
                    // })
                    const tool = {
                      tool_name: parsedData.payload.tool_name,
                      additional_kwargs: JSON.stringify(parsedData.payload.additional_kwargs)
                    }
                    tools = [...new Set([...tools, tool])];
                    // setmessageTools(message.id, {
                    //   tool_name: parsedData.payload.tool_name,
                    //   additional_kwargs: JSON.stringify(parsedData.payload.additional_kwargs)
                    // });
                    // addToolToMessage(message.id, {
                    //   tool_name: parsedData.payload.tool_name,
                    //   additional_kwargs: JSON.stringify(parsedData.payload.additional_kwargs)
                    // });
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

          if(tools.length){
            // tools.forEach((tool) => {
            //   setmessageTools(message.id, tool)
            // })
            setMesaageTool(tools)
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

  const renderToolUI = (tool: Tool) => {
    console.log("Attempting to render tool:", tool);

    let kwargs;
    try {
      kwargs = typeof tool.additional_kwargs === 'string' 
        ? JSON.parse(tool.additional_kwargs) 
        : tool.additional_kwargs;
      
      switch (tool.tool_name) {
        case 'get_account_type':
          const accountData = JSON.parse(kwargs);
          return (
            <div key={`${message.id}-${tool.tool_name}`} className="mt-2 p-3 bg-gray-800 rounded-lg">
            <div className="flex flex-col gap-y-1">
              <div className="text-sm text-gray-300">
                Account Type: {accountData.isWallet ? 'Wallet' : accountData.isToken ? 'Token' : 'Program'}
              </div>
            </div>
          </div>
          );

        case 'get_complete_balance':
          const completeBalanceData = JSON.parse(kwargs);
          return (
            <div key={`${message.id}-${tool.tool_name}`} className="mt-2 p-3 bg-gray-800 rounded-lg">
              <div className="flex flex-col gap-y-2">
                <div className="text-sm text-gray-300">
                  <div>SOL Balance: {completeBalanceData.nativeBalance?.balanceFormatted}</div>
                  <div>Value in USD: ${completeBalanceData.nativeBalance?.valueInUsd}</div>
                </div>
                {completeBalanceData.tokenPortfolio?.tokens && (
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-200 mb-1">Token Portfolio:</div>
                    <div className="space-y-1">
                      {completeBalanceData.tokenPortfolio.tokens.map((token: any, index: number) => (
                        <div key={`${message.id}-token-${index}`} className="text-sm text-gray-300 flex justify-between">
                          <span>{token.name} ({token.symbol})</span>
                          <span>${token.value.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-700 text-sm text-gray-200">
                      Total Value: ${completeBalanceData.totalValueUsd}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case 'check_token_detailed_report':
          const checkTokenDetailedReport = JSON.parse(kwargs);
          return (
            <TokenLookup data={checkTokenDetailedReport} />
          );
        case 'swap_tokens':
          const swapOnJup = JSON.parse(kwargs);
          console.log(swapOnJup)
            return (
              <SwapOnJupiter data={swapOnJup} />
            );
        case 'launch_pumpfun_token':
          const launchOnPump = JSON.parse(kwargs);
            return (
              <LaunchTokenOnPump />
            );
        case 'transfer_tokens':
           return (
              <TransferTokens />
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
          {messageTools?.map((tool, index) => (
            <div key={`${message.id}-tool-${index}`}>
              {renderToolUI(tool)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};