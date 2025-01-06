"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const DemoChatComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const [showMessages, setShowMessages] = useState<boolean>(false);
  
  const demoQuestion = "How does Solana handle scalability?";
  const demoAnswer = "Solana uses a unique consensus mechanism called Proof of History (PoH) combined with Tower BFT for exceptional scalability.";

  useEffect(() => {
    let intervalId: number | NodeJS.Timeout | undefined; // Use union type for both environments
  
    const typeMessage = () => {
      let index = 0;
      intervalId = setInterval(() => {
        if (index <= demoQuestion.length) {
          setInputValue(demoQuestion.slice(0, index));
          index++;
        } else {
          clearInterval(intervalId);
          setShowMessages(true);
          setTimeout(() => {
            setTypingIndex(0);
            setInputValue('');
            setShowMessages(false);
          }, 5000); // Show messages for 5 seconds
        }
      }, 100);
    };
  
    typeMessage(); // Call typeMessage to start the animation
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [typingIndex]);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className={`flex w-[300px] h-[400px] overflow-hidden bg-black text-white ${spaceGrotesk.className}`}>
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative w-[100px] h-full bg-[#0B0C0F] transition-all duration-300 z-50 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r border-white/5`}
      >
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 p-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#92C7FF]/20 rounded-full blur-lg" />
              <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-full relative z-10" />
            </div>
            <span className="text-base font-medium">Toly</span>
          </div>

          <div className="px-2">
            <button 
              type="button"
              className="w-full flex items-center justify-center gap-2 h-8 bg-[#0B0C0F] rounded-xl border border-[#92C7FF]/20 hover:bg-[#92C7FF]/5 transition-colors duration-200"
            >
              <FaPlus className="text-[#92C7FF] text-sm" />
              <span className="text-[#92C7FF] text-xs font-medium">New</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mt-4">
          <nav className="px-2 space-y-1">
            {[
              { name: 'Explore', icon: FaMagnifyingGlass },
              { name: 'History', icon: FaHistory },
              { name: 'Analytics', icon: FaChartLine },
              { name: 'Wallet', icon: FaWallet },
              { name: 'Send', icon: FaPaperPlane },
              { name: 'Traders', icon: FaUserTie },
              { name: 'Strategies', icon: FaChartPie }
            ].map((item) => (
              <button
                key={item.name}
                type="button"
                className="w-full flex items-center gap-1 px-2 py-1 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200 text-xs"
              >
                <item.icon className="text-sm" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-4 px-2 text-xs">
            <h3 className="text-[#9097A6] mb-2 px-2">Recent</h3>
            <div className="space-y-1">
              {[
                { id: '1', message: "How does Solana..." },
                { id: '2', message: "Explain S..." },
                { id: '3', message: "Key dif..." },
                { id: '4', message: "Consensus me..." },
                { id: '5', message: "Prog lang..." }
              ].map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  className="w-full text-left px-2 py-1 border border-white/5 rounded-xl hover:bg-white/5 transition-colors duration-200"
                >
                  {chat.message}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 px-2 py-4 border-t border-white/5 space-y-1 text-xs">
          {[
            { icon: FaCircleQuestion, label: 'FAQ' },
            { icon: FaCog, label: 'Settings' }
          ].map((item) => (
            <button 
              key={item.label}
              type="button"
              className="w-full flex items-center gap-1 px-2 py-1 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
            >
              <item.icon className="text-sm" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <button 
          type="button"
          className="lg:hidden absolute top-4 right-2 text-white/80 hover:text-white transition-colors duration-200"
          onClick={toggleSidebar}
        >
          <FaX size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        <div className="flex-shrink-0 flex justify-between items-center p-4 bg-black text-xs">
          <button 
            type="button"
            className="lg:hidden text-white/80 hover:text-white transition-colors duration-200"
            onClick={toggleSidebar}
          >
            <FaBars size={16} />
          </button>
          
          <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#121417] border border-[#61BDFF]/20 rounded-full hover:border-[#61BDFF]/40 transition-colors duration-200">
            <div className="relative">
              <div className="absolute inset-0 bg-[#61BDFF]/10 rounded-full blur-sm" />
              <img src="/logo.png" alt="Profile" className="w-4 h-4 rounded-full relative z-10" />
            </div>
            <span className="font-medium">User</span>
            <FaChevronDown size={8} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-[80px] text-xs">
          {/* Welcome Section */}
          <div className="max-w-[200px] mx-auto text-center pt-4">
            <div className="flex justify-center items-end mb-2 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#92C7FF]/10 via-transparent to-transparent blur-xl" />
              <img src="/logo.png" alt="Bot" className="w-4 h-4 rounded-full -rotate-6 relative z-10" />
              <img src="/logo.png" alt="Bot" className="w-6 h-6 rounded-full mx-[-4px] relative z-20" />
              <img src="/logo.png" alt="Bot" className="w-4 h-4 rounded-full rotate-6 relative z-10" />
            </div>
            
            <h1 className="text-lg font-semibold mb-2">Welcome!</h1>
            <p className="text-[#9097A6]">
              Toly helps with Solana insights! What's on your mind?
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            {[
              { title: "DYOR", description: "Analysis of wallets, tokens..." },
              { title: "Latest", description: "Real-time insights..." },
              { title: "Analytics", description: "Market insights..." }
            ].map((card, index) => (
              <div 
                key={index}
                className="bg-[#121417] p-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-200"
              >
                <h2 className="text-xs font-semibold mb-1">{card.title}</h2>
                <p className="text-[#9097A6] text-[10px] leading-tight">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Animated Messages */}
          {showMessages && (
            <>
              <motion.div 
                className="w-[100px] h-[40px] mb-2 bg-[#0B0C0F] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[25px] flex items-center px-2 gap-1 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-white text-[10px] leading-[150%] capitalize">{demoQuestion}</span>
              </motion.div>

              <motion.div 
                className="w-[100px] h-[40px] bg-[#61BDFF] rounded-tl-[25px] rounded-br-[25px] rounded-bl-[25px] flex items-center px-2 gap-1 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-black text-[10px] leading-[150%] capitalize">{demoAnswer}</span>
              </motion.div>
            </>
          )}
        </div>

        {/* Fixed Chat Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-3">
          <div className="w-full px-2 pb-3">
            <div className="relative">
              <img src="/sidecat.png" alt="Side Cat" 
                className="absolute -top-12 right-0 w-8 h-8" />
              
              <div className="flex items-center gap-1 bg-[#121417] p-1 rounded-lg border border-white/5">
                <div className="flex items-center gap-1 flex-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#92C7FF]/20 rounded-full blur-lg" />
                    <div className="w-4 h-4 bg-[#92C7FF] rounded-full flex items-center justify-center relative z-10">
                      <img src="/dyor.png" alt="Bot" className="w-3 h-3 rounded-full" />
                    </div>
                  </div>
                  <input 
                    type="text"
                    value={inputValue}
                    readOnly
                    className="flex-1 bg-transparent text-[#9097A6] outline-none placeholder:text-[#9097A6]/50 text-xs"
                  />
                </div>
                <button 
                  className={`w-4 h-4 flex items-center justify-center rounded-full transition-colors duration-200 bg-[#92C7FF] text-black`}
                >
                  <FaPaperPlane size={8} />
                </button>
              </div>
              
              <p className="text-center text-[#9097A6] mt-2 text-[8px]">
                Not Financial Advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoChatComponent;