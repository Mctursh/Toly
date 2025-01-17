import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const ChatMessage = () => (
  <div className="flex gap-4 mb-4">
    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
      <Image
        src="/logo.png"
        alt="AI Assistant"
        width={32}
        height={32}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="bg-gray-800 rounded-lg p-3 text-gray-200 text-sm">
        Hi there! I'm here to help you explore and understand the Solana blockchain. 
        Feel free to ask me about transactions, tokens, wallets, or any other blockchain activities.
      </div>
    </div>
  </div>
);

const ChatInterface = () => (
  <div className="bg-[#0B0C0F] rounded-xl border-4 border-white w-full h-full overflow-hidden">
    {/* Sidebar */}
    <div className="flex h-full">
      <div className="w-64 bg-[#141518] border-r border-gray-800 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="bg-[#1E1F24] rounded-lg p-2 text-gray-400 text-sm">
            🔍 Search conversations...
          </div>
        </div>
        
        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2">
          {['Recent Chats', 'Token Analysis', 'Wallet Tracking', 'Transaction History', 'Market Updates'].map((item) => (
            <div 
              key={item}
              className="px-4 py-2 text-gray-400 hover:bg-[#1E1F24] hover:text-gray-200 cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-sm font-medium">AI</span>
            </div>
            <span className="text-gray-200">Toly Assistant</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <ChatMessage />
          <ChatMessage />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#1E1F24] rounded-lg p-3 text-gray-400">
              Type your message...
            </div>
            <button className="bg-[#6FCB71] text-black px-4 py-2 rounded-lg hover:bg-[#5FB761] transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeatureSection = () => {
  return (
    <div className="relative w-full min-h-screen">
      <motion.div 
        className="absolute w-[1210px] h-[452px] left-[384px] top-[1188px] flex flex-row items-center gap-[78px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section - Green Background with Chat Interface */}
        <div className="relative w-[715px] h-[452px] bg-[#6FCB71] rounded-3xl overflow-hidden">
          {/* Cat Image */}
          <div className="absolute w-[245px] h-[245px] left-[-76px] top-[251px]">
            <Image
              src="/logo.png"
              alt="Toly Cat"
              width={245}
              height={245}
              className="rounded-full object-cover"
              priority
            />
          </div>

          {/* Chat Interface */}
          <div className="absolute w-[559px] h-[476px] left-[calc(50%-559px/2)] top-[calc(50%-476px/2+98px)]">
            <ChatInterface />
          </div>
        </div>

        {/* Right Section - Text Content */}
        <div className="flex flex-col justify-center items-start gap-6 w-[417px]">
          <h2 
            className="w-full text-[30px] font-bold leading-[130%] tracking-[-0.02em] text-[#FAFAFA] capitalize"
            style={{ fontFamily: 'Inter' }}
          >
            Your AI Companion Exploring The Solana Blockchain To Bring You
          </h2>
          
          <p className={`w-full text-lg leading-[160%] text-[#9097A6] ${spaceGrotesk.className}`}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureSection;