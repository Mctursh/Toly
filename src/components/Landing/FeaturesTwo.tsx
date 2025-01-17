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
        Looking into AI-powered blockchain analysis tools can help improve your trading and investment strategies.
      </div>
    </div>
  </div>
);

const ChatInterface = () => (
  <div className="bg-[#0B0C0F] rounded-xl border-4 border-[#6FCB71] w-full h-full overflow-hidden">
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
          {['Market Analysis', 'Wallet Insights', 'Token Metrics', 'Trade History', 'Smart Contracts'].map((item) => (
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
            <div className="w-8 h-8 rounded-full bg-[#C44FE2] flex items-center justify-center">
              <span className="text-sm font-medium">AI</span>
            </div>
            <span className="text-gray-200">Analysis Assistant</span>
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
              Ask about blockchain analysis...
            </div>
            <button className="bg-[#C44FE2] text-white px-4 py-2 rounded-lg hover:bg-[#B33FD1] transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SecondFeatureSection = () => {
  return (
    <div className="relative w-full">
      <motion.div 
        className="absolute w-[1237px] h-[452px] left-[383px] top-[1895px] flex flex-row items-center gap-[77px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Text Section */}
        <div className="flex flex-col justify-center items-start gap-6 w-[445px]">
          <h2 
            className="w-full text-[30px] font-bold leading-[130%] tracking-[-0.02em] text-[#FAFAFA] capitalize"
            style={{ fontFamily: 'Inter' }}
          >
            Your AI companion exploring the solana blockchain to bring you
          </h2>
          
          <p className={`w-full text-lg leading-[160%] text-[#9097A6] ${spaceGrotesk.className}`}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          </p>
        </div>

        {/* Right Section - Purple Background with Chat Interface */}
        <div className="relative w-[715px] h-[452px] bg-[#C44FE2] rounded-3xl">
          {/* Cat Image */}
          <div className="absolute w-[196px] h-[196px] right-[-60px] top-[272px]">
            <Image
              src="/logo.png"
              alt="Toly Cat"
              width={196}
              height={196}
              className="rounded-full object-cover opacity-80"
              priority
            />
          </div>

          {/* Chat Interface */}
          <div className="absolute w-[559px] h-[476px] left-[calc(50%-559px/2)] top-[calc(50%-476px/2+98px)]">
            <ChatInterface />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecondFeatureSection;