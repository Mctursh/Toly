// app/chat/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';
import { Inter } from 'next/font/google';
import { FaPaperPlane, FaChevronDown } from "react-icons/fa6";
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { Messages } from './Messages';
import { EmojiSuggestions } from './EmojiSuggestions';
import { ConfirmationModal } from './ConfirmationModal';
import Sidebar from './Sidebar';
import WalletPanel from './WalletPanel';
import { 
  type Message, 
  type ChatState, 
  type AIResponse, 
  type Coordinates,
  type DeleteMessageConfirmation 
} from '@/types/chat';
import { Email } from '@privy-io/react-auth'; 

interface DashboardProps {
  username?: string | Email;
  profileImage?: string;
}

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const Dashboard: React.FC<DashboardProps> = ({ 
  username = "Anonymous",
  profileImage = '/dyor.png'
}) => {
  const { user, getAccessToken, logout } = usePrivy();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [emojiSuggestionsPosition, setEmojiSuggestionsPosition] = useState<Coordinates | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteMessageConfirmation>({
    messageId: null,
    isOpen: false
  });
  
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const PAGE_SIZE = 20;
  
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    if (currentThreadId) {
      setPage(1);
      setHasMore(true);
      fetchMessages(1);
    }
  }, [currentThreadId]);

  const fetchMessages = async (pageNum: number = 1, loadMore: boolean = false) => {
    try {
      if (!loadMore) {
        setChatState(prev => ({ ...prev, isLoading: true }));
      } else {
        setIsFetchingMore(true);
      }
      
      const token = await getAccessToken();
      
      const response = await fetch(
        `${API_URL}/chat/conversations/${currentThreadId}?page=${pageNum}&limit=${PAGE_SIZE}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data = await response.json();
      
      if (data.messages.length < PAGE_SIZE) {
        setHasMore(false);
      }
      
      setChatState(prev => ({
        ...prev,
        messages: loadMore ? [...prev.messages, ...data.messages] : data.messages,
        isLoading: false
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        error: 'Failed to load messages',
        isLoading: false
      }));
    } finally {
      setIsFetchingMore(false);
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !isFetchingMore) {
      setPage(prev => prev + 1);
      fetchMessages(page + 1, true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    if (e.target.value.includes(':')) {
      const rect = e.target.getBoundingClientRect();
      setEmojiSuggestionsPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX
      });
    } else {
      setEmojiSuggestionsPosition(null);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputValue(prev => prev.replace(/:[^:\s]*$/, '') + emoji + ' ');
    setEmojiSuggestionsPosition(null);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const token = await getAccessToken();
      const response = await fetch(`${API_URL}/chat/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete message');

      setChatState(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m.id !== messageId)
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        error: 'Failed to delete message'
      }));
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentThreadId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    try {
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage, {
          id: 'temp-loading',
          content: '',
          role: 'assistant',
          timestamp: new Date(),
          isLoading: true
        }],
      }));
      setInputValue('');

      const token = await getAccessToken();
      const response = await fetch(`${API_URL}/chat/conversations/${currentThreadId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: inputValue })
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const data: AIResponse = await response.json();
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.result[1].TransactionExplorer.messages[0].content,
        role: 'assistant',
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages.filter(m => m.id !== 'temp-loading'), aiMessage]
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m.id !== 'temp-loading'),
        error: 'Failed to send message'
      }));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const WelcomeScreen = () => (
    <div className="max-w-3xl mx-auto text-center pt-6">
      <div className="flex justify-center items-end mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#92C7FF]/10 via-transparent to-transparent blur-3xl" />
        <img src="/logo.png" alt="Bot" className="w-8 h-8 rounded-full -rotate-12 relative z-10" />
        <img src="/logo.png" alt="Bot" className="w-12 h-12 rounded-full mx-[-8px] relative z-20" />
        <img src="/logo.png" alt="Bot" className="w-8 h-8 rounded-full rotate-12 relative z-10" />
      </div>
      
      <h1 className={`text-3xl font-semibold mb-4 ${spaceGrotesk.className}`}>
        Welcome to Toly AI
      </h1>
      <p className="text-base text-[#9097A6] max-w-[280px] mx-auto">
        Toly is here to help with insights on transactions, tokens, wallets and all activities on the 
        <span className="text-[#92C7FF]"> Solana Blockchain</span>! What is on your mind today?
      </p>
    </div>
  );

  return (
    <div className={`flex h-screen overflow-hidden bg-black text-white ${spaceGrotesk.className}`}>
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        currentThreadId={currentThreadId || undefined}
      />
      
      <div className="flex-1 flex">
        <WalletPanel />
        
        <div className="flex-1 flex flex-col h-screen relative">
          {/* Header */}
          <div className="flex-shrink-0 flex justify-between items-center p-8 bg-black">
            <button 
              type="button"
              className="lg:hidden text-white/80 hover:text-white transition-colors duration-200"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaPaperPlane size={24} />
            </button>
            
            <div className="relative profile-dropdown">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="ml-auto flex items-center gap-4 px-6 py-3 bg-[#121417] border-2 border-[#61BDFF]/20 rounded-full hover:border-[#61BDFF]/40 transition-colors duration-200"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#61BDFF]/10 rounded-full blur-sm" />
                  <img src="/logo.png" alt="Profile" className="w-8 h-8 rounded-full relative z-10" />
                </div>
                <span className="font-medium">
                  {typeof user?.email === 'string' ? user.email : 'Anonymous'}
                </span>
                <FaChevronDown size={12} className={`transform transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#121417] rounded-xl border border-white/5 shadow-lg overflow-hidden z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-[#9097A6] hover:bg-white/5 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-8 pb-[180px]"
          >
            {chatState.isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6FCB71]" />
              </div>
            ) : chatState.messages.length === 0 ? (
              <WelcomeScreen />
            ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                {isFetchingMore && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6FCB71]" />
                  </div>
                )}
                
                {chatState.messages.map((message, index) => {
                  const isConsecutive = index > 0 && 
                    chatState.messages[index - 1].role === message.role &&
                    (new Date(message.timestamp).getTime() - 
                    new Date(chatState.messages[index - 1].timestamp).getTime()) < 300000;

                  return (
                    <Messages 
                      key={message.id} 
                      message={message} 
                      isConsecutive={isConsecutive}
                      onDelete={() => setDeleteConfirmation({
                        messageId: message.id,
                        isOpen: true
                      })}
                    />
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-6">
            <div className="w-full max-w-3xl mx-auto px-4 pb-6">
              <div className="relative">
                {chatState.error && (
                  <div className="absolute -top-8 left-0 right-0 p-2 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm text-center">
                    {chatState.error}
                  </div>
                )}
                
                <img 
                  src="/sidecat.png" 
                  alt="Side Cat" 
                  className="absolute -top-24 right-0 w-16 h-16"
                />
                
                <div className="flex items-center gap-2 bg-[#121417] p-2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#92C7FF]/20 rounded-full blur-lg" />
                      <div className="w-8 h-8 bg-[#92C7FF] rounded-full flex items-center justify-center relative z-10">
                        <img src="/dyor.png" alt="Bot" className="w-6 h-6 rounded-full" />
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <input 
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask Toly something..."
                        className="w-full bg-transparent text-[#9097A6] outline-none placeholder:text-[#9097A6]/50 text-sm"
                      />
                      {emojiSuggestionsPosition && (
                        <EmojiSuggestions
                          query={inputValue}
                          position={emojiSuggestionsPosition}
                          onSelect={handleEmojiSelect}
                        />
                      )}
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || chatState.isLoading}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200
                      ${inputValue.trim() ? 'bg-[#92C7FF] text-black' : 'bg-[#92C7FF]/20 text-[#92C7FF]'}`}
                  >
                    <FaPaperPlane size={12} />
                  </button>
                </div>
                
                <p className="text-center text-[#9097A6] text-xs mt-4">
                  Information provided by Toly is Not Financial Advice
                </p>
              </div>
            </div>
          </div>
          
          {/* Delete Message Confirmation Modal */}
          <ConfirmationModal
            isOpen={deleteConfirmation.isOpen}
            onClose={() => setDeleteConfirmation({ messageId: null, isOpen: false })}
            onConfirm={() => {
              if (deleteConfirmation.messageId) {
                handleDeleteMessage(deleteConfirmation.messageId);
                setDeleteConfirmation({ messageId: null, isOpen: false });
              }
            }}
            message="Are you sure you want to delete this message?"
          />
        </div>
      </div>
    </div>
  );
}