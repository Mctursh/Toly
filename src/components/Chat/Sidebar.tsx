import React, { FC } from 'react';
import { 
  FaPlus, 
  FaCircleQuestion,
  FaX,
  FaRocket,
} from "react-icons/fa6";
import { FaCog, FaHistory } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { Conversation } from '@/types/chat';
import { Source_Code_Pro } from 'next/font/google';

interface NavigationItem {
  name: string;
  icon: IconType;
  description: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  clearChat: () => void;
  switchConversation: (convo: Conversation) => Promise<void>;
  currentThreadId?: string;
  onPromptSelect: (promptText: string) => void;
  onModalOpen: (type: string, name: string) => void;
  navigationItems: NavigationItem[];
  conversations: Conversation[]
  setConversations: (value: Conversation[]) => void
  loading: boolean
  error: string | null
  
}

const SourceCodeProFont = Source_Code_Pro({ subsets: ['latin'] });

export const Sidebar: FC<SidebarProps> = ({ 
  isSidebarOpen, 
  toggleSidebar,
  currentThreadId,
  onPromptSelect,
  onModalOpen,
  navigationItems,
  switchConversation,
  clearChat,
  conversations,
  loading,
  error,
}) => {

  const footerItems = [
    {
      icon: FaRocket,
      label: 'Automations',
      description: 'Configure and manage automated trading actions.'
    },
    { 
      icon: FaCircleQuestion, 
      label: 'FAQ', 
      description: 'Get answers to frequently asked questions about using Toly AI.' 
    },
    {
      icon: FaHistory,
      label: 'Changelog',
      description: 'View latest updates and changes to Toly.'
    },
    { 
      icon: FaCog, 
      label: 'Settings', 
      description: 'Customize your Toly AI experience and manage your preferences.' 
    }
  ];

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
            <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
            {/* <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full relative z-10" /> */}
          </div>
          <span className={`text-2xl font-medium ${SourceCodeProFont.className}`}>catoly.AI</span>
        </div>

        <div className="px-6">
          <button 
            onClick={clearChat}
            className="w-full flex items-center justify-center gap-3 h-14 bg-[#0B0C0F] rounded-xl border border-[#6FCB71]/20 hover:bg-[#6FCB71]/5 transition-colors duration-200"
          >
            <FaPlus className="text-[#6FCB71]" />
            <span className="text-[#6FCB71] font-medium">New Chat</span>
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
              onClick={() => {
                if (item.name === 'Explore') {
                  onModalOpen('explore', item.name.toLowerCase());
                } else {
                  onModalOpen('info', item.name.toLowerCase());
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
            >
              <item.icon className="text-xl" />
              <span className="font-medium text-nowrap">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Recent Conversations */}
        <div className="mt-2 px-6">
          <div className="mb-4 px-4 text-[#9097A6] flex items-center gap-x-3">
            <span><FaHistory className="text-xl"/></span>
            <h3 className="">Recent chats</h3>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6FCB71]" />
            </div>
          ) : error ? (
            <div className="px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          ) : (
            <div className="space-y-2 h-auto max-h-[250px] overflow-y-auto">
              {conversations?.length ? (conversations.map((conversation) => (
                <button
                  key={conversation?.threadId}
                  onClick={() => switchConversation(conversation)}
                  className={`w-full text-left px-6 py-3.5 border rounded-xl transition-colors duration-200 
                    ${true 
                    // ${conversation.threadId === currentThreadId 
                      ? 'bg-white/10 border-[#6FCB71]/40' 
                      : 'border-white/5 hover:bg-white/5'}`}
                >
                  <p className="text-sm text-white truncate">
                    {conversation?.lastMessage?.content || 'New Conversation'}
                  </p>
                  <p className="text-xs text-[#9097A6] mt-1">
                    {new Date(conversation?.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </button>
              ))) : (
                <p className='flex justify-center my-4' >No Recent Chat</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex-shrink-0 px-6 py-8 border-t border-white/5 space-y-2">
        {footerItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => onModalOpen('info', item.label.toLowerCase())}
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