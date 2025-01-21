// components/Sidebar.tsx
"use client";

import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { 
  FaPlus, 
  FaMagnifyingGlass,
  FaChartLine, 
  FaWallet, 
  FaPaperPlane,
  FaUserTie,
  FaChartPie,
  FaCircleQuestion,
  FaX
} from "react-icons/fa6";
import { FaCog, FaHistory } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { Conversation } from '@/types/chat';
import Http from '@/services/httpService';

interface NavigationItem {
  name: string;
  icon: IconType;
  href: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  currentThreadId?: string;
}

export const Sidebar: FC<SidebarProps> = ({ 
  isSidebarOpen, 
  toggleSidebar,
  currentThreadId 
}) => {
  const router = useRouter();
  // const { getAccessToken } = usePrivy();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4600';
  // const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  const navigationItems: NavigationItem[] = [
    { name: 'Explore', icon: FaMagnifyingGlass, href: '/explore' },
    { name: 'History', icon: FaHistory, href: '/history' },
    { name: 'Solana Analytics', icon: FaChartLine, href: '/analytics' },
    { name: 'Wallet Audit', icon: FaWallet, href: '/audit' },
    { name: 'Send Transactions', icon: FaPaperPlane, href: '/send' },
    { name: 'Top Performing Traders', icon: FaUserTie, href: '/traders' },
    { name: 'Top Performing Strategies', icon: FaChartPie, href: '/strategies' }
  ];

  const fetchConversations = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      // const token = await getAccessToken();
      
      const response = await fetch(
        `${API_URL}/chat/conversations?page=${page}&limit=${limit}`,
        {
          headers: {
            // 'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (!response.ok) throw new Error('Failed to fetch conversations');
      
      const data = await response.json();
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch conversations');
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNewConversation = async () => {
    try {
      // const token = await getAccessToken();
      
      const response = await Http.post(`${API_URL}/chat/conversations`,{}, {
        headers: {
          // 'Authorization': `Bearer ${token}`
        }
      });

      // if (!response.) throw new Error('Failed to create conversation');
      
      const newConversation = await response.data
      setConversations(prev => [newConversation, ...prev]);
      router.push(`/chat/${newConversation.threadId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create conversation');
      console.error('Error creating conversation:', err);
    }
  };

  const switchConversation = async (threadId: string) => {
    try {
      // const token = await getAccessToken();
      
      await fetch(`${API_URL}/chat/conversations/${threadId}/switch`, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${token}`
        }
      });

      router.push(`/chat/${threadId}`);
    } catch (err) {
      console.error('Error switching conversation:', err);
    }
  };

  useEffect(() => {
    // fetchConversations();
  }, []);

  return (
    <div 
      className={`fixed lg:relative w-[309px] h-screen bg-[#0B0C0F] transition-all duration-300 z-50 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-white/5`}
    >
      {/* Logo and New Chat Button */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-4 p-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#92C7FF]/20 rounded-full blur-lg" />
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full relative z-10" />
          </div>
          <span className="text-2xl font-medium">Toly.AI</span>
        </div>

        <div className="px-6">
          <button 
            onClick={createNewConversation}
            className="w-full flex items-center justify-center gap-3 h-14 bg-[#0B0C0F] rounded-xl border border-[#92C7FF]/20 hover:bg-[#92C7FF]/5 transition-colors duration-200"
          >
            <FaPlus className="text-[#92C7FF]" />
            <span className="text-[#92C7FF] font-medium">New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Navigation and Conversations */}
      <div className="flex-1 overflow-y-auto mt-8">
        {/* Navigation Items */}
        <nav className="px-6 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
            >
              <item.icon className="text-xl" />
              <span className="font-medium text-nowrap">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Recent Conversations */}
        <div className="mt-10 px-6">
          <h3 className="text-[#9097A6] mb-4 px-4">Recent chats</h3>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#92C7FF]" />
            </div>
          ) : error ? (
            <div className="px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => switchConversation(conversation.threadId)}
                  className={`w-full text-left px-6 py-3.5 border rounded-xl transition-colors duration-200 
                    ${conversation.threadId === currentThreadId 
                      ? 'bg-white/10 border-[#92C7FF]/40' 
                      : 'border-white/5 hover:bg-white/5'}`}
                >
                  <p className="text-sm text-white truncate">
                    {conversation.lastMessage || 'New Conversation'}
                  </p>
                  <p className="text-xs text-[#9097A6] mt-1">
                    {new Date(conversation.updatedAt).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex-shrink-0 px-6 py-8 border-t border-white/5 space-y-2">
        {[
          { icon: FaCircleQuestion, label: 'FAQ', href: '/faq' },
          { icon: FaCog, label: 'Settings', href: '/settings' }
        ].map((item) => (
          <button 
            key={item.label}
            onClick={() => router.push(item.href)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Close Button */}
      <button 
        className="lg:hidden absolute top-8 right-6 text-white/80 hover:text-white transition-colors duration-200"
        onClick={toggleSidebar}
        aria-label="Close sidebar"
      >
        <FaX size={24} />
      </button>
    </div>
  );
};

export default Sidebar;