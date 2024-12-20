"use client"
import React, { useState, useEffect, type FC } from 'react';
import { 
  FaPlus, 
  FaMagnifyingGlass,
  FaChartLine, 
  FaWallet, 
  FaPaperPlane,
  FaUserTie,
  FaChartPie,
  FaCircleQuestion,
  FaBars,
  FaX,
  FaChevronDown,
} from "react-icons/fa6";
import { FaCog, FaHistory } from 'react-icons/fa'
import type { IconType } from 'react-icons'

interface NavigationItem {
  name: string;
  icon: IconType;
}

interface FeatureCard {
  title: string;
  description: string;
}

interface RecentChat {
  id: string;
  message: string;
}

interface Props {
  username: string;
  profileImage?: string;
}

const Dashboard: FC<Props> = ({ username, profileImage = "/logo.png" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  
  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems: NavigationItem[] = [
    { name: 'Explore', icon: FaMagnifyingGlass },
    { name: 'History', icon: FaHistory },
    { name: 'Solana Analytics', icon: FaChartLine },
    { name: 'Wallet Audit', icon: FaWallet },
    { name: 'Send Transactions', icon: FaPaperPlane },
    { name: 'Top Performing Traders', icon: FaUserTie },
    { name: 'Top Performing Strategies', icon: FaChartPie }
  ];

  const featureCards: FeatureCard[] = [
    {
      title: "DYOR",
      description: "Look into wallets, tokens and transactions for more detailed analysis"
    },
    {
      title: "RESEARCH ON THE LATEST",
      description: "Ask questions, get real-time insights, and master the skills you need to thrive in the Solana ecosystem."
    },
    {
      title: "ANALYTICS",
      description: "Stay ahead of the market by getting detailed insights into top traders, volumes, tokens and strategies"
    }
  ];

  const recentChats: RecentChat[] = [
    { id: '1', message: "How does Solana handle..." },
    { id: '2', message: "Can you explain how the S..." },
    { id: '3', message: "What are some key dif..." },
    { id: '4', message: "What is the consensus me..." },
    { id: '5', message: "What programming lang..." }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (): void => {
    if (!inputValue.trim()) return;
    // Handle message sending logic here
    setInputValue('');
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white font-['Familjen_Grotesk']">
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative w-[309px] h-screen bg-[#0B0C0F] transition-all duration-300 z-50 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r border-white/5`}
      >
        {/* Fixed Logo Section */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-4 p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
              <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full relative z-10" />
            </div>
            <span className="text-2xl font-medium">Toly.AI</span>
          </div>

          {/* New Chat Button */}
          <div className="px-6">
            <button 
              type="button"
              onClick={() => { /* Handle new chat */ }}
              className="w-full flex items-center justify-center gap-3 h-14 bg-[#0B0C0F] rounded-xl border border-[#6FCB71]/20 hover:bg-[#6FCB71]/5 transition-colors duration-200"
            >
              <FaPlus className="text-[#6FCB71]" />
              <span className="text-[#6FCB71] font-medium">New Chat</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation and Chats */}
        <div className="flex-1 overflow-y-auto mt-8">
          {/* Navigation Menu */}
          <nav className="px-6 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => { /* Handle navigation */ }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
              >
                <item.icon className="text-xl" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Recent Chats */}
          <div className="mt-10 px-6">
            <h3 className="text-[#9097A6] mb-4 px-4">Recent chats</h3>
            <div className="space-y-2">
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => { /* Handle chat selection */ }}
                  className="w-full text-left px-6 py-3.5 border border-white/5 rounded-xl hover:bg-white/5 transition-colors duration-200"
                >
                  {chat.message}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Menu */}
        <div className="flex-shrink-0 px-6 py-8 border-t border-white/5 space-y-2">
          {[
            { icon: FaCircleQuestion, label: 'FAQ' },
            { icon: FaCog, label: 'Settings' }
          ].map((item) => (
            <button 
              key={item.label}
              type="button"
              onClick={() => { /* Handle menu action */ }}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
            >
              <item.icon className="text-xl" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Close Button */}
        <button 
          type="button"
          className="lg:hidden absolute top-8 right-6 text-white/80 hover:text-white transition-colors duration-200"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <FaX size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen relative">
        {/* Fixed Top Bar */}
        <div className="flex-shrink-0 flex justify-between items-center p-8 bg-black">
          <button 
            type="button"
            className="lg:hidden text-white/80 hover:text-white transition-colors duration-200"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <FaBars size={24} />
          </button>
          
          <div className="ml-auto flex items-center gap-4 px-6 py-3 bg-[#121417] border-2 border-[#6FCB71]/20 rounded-full hover:border-[#6FCB71]/40 transition-colors duration-200">
            <div className="relative">
              <div className="absolute inset-0 bg-[#6FCB71]/10 rounded-full blur-sm" />
              <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full relative z-10" />
            </div>
            <span className="font-medium">{username}</span>
            <FaChevronDown size={12} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-[180px]">
          {/* Welcome Section */}
          <div className="max-w-4xl mx-auto text-center pt-8">
            <div className="flex justify-center items-end mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#6FCB71]/10 via-transparent to-transparent blur-3xl" />
              <img src="/logo.png" alt="Bot" className="w-12 h-12 rounded-full -rotate-12 relative z-10" />
              <img src="/logo.png" alt="Bot" className="w-[150px] h-[150px] rounded-full mx-[-10px] relative z-20" />
              <img src="/logo.png" alt="Bot" className="w-12 h-12 rounded-full rotate-12 relative z-10" />
            </div>
            
            <h1 className="text-5xl font-bold mb-6">Welcome, {username}!</h1>
            <p className="text-lg text-[#9097A6] max-w-2xl mx-auto">
              Toly is here to help with insights on transactions, tokens, wallets and all activities on the 
              <span className="text-[#6FCB71]"> Solana Blockchain</span>! What is on your mind today?
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
            {featureCards.map((card, index) => (
              <div 
                key={index}
                className="bg-[#121417] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors duration-200"
              >
                <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
                <p className="text-[#9097A6] leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
          
          {/* Add more content here to enable scrolling */}
        </div>

        {/* Fixed Chat Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-8">
          <div className="w-full max-w-3xl mx-auto px-8 pb-8">
            <div className="relative">
              <img src="/sidecat.png" alt="Side Cat" 
                className="absolute -top-32 right-0 w-24 h-24" />
              
              <div className="flex items-center gap-4 bg-[#121417] p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
                    <div className="w-12 h-12 bg-[#6FCB71] rounded-full flex items-center justify-center relative z-10">
                      <img src="/dyor.png" alt="Bot" className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask Toly something..."
                    className="flex-1 bg-transparent text-[#9097A6] outline-none placeholder:text-[#9097A6]/50"
                  />
                </div>
                <button 
                  type="button"
                  onClick={handleSendMessage}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-200
                    ${inputValue.trim() ? 'bg-[#6FCB71] text-black' : 'bg-[#6FCB71]/20 text-[#6FCB71]'}`}
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-center text-[#9097A6] mt-6 opacity-80">
              Information provided by Toly is not Financial Advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;