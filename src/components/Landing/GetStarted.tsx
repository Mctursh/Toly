"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface ChatBubbleProps {
  text: string;
  position: 'left' | 'right';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, position }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`
      absolute flex flex-row items-center p-4 md:p-6 bg-[#0B0C0F] z-20
      ${position === 'left' 
        ? 'left-0 top-[20px] w-[280px] md:w-[380px] rounded-[30px_30px_0_30px] md:rounded-[50px_50px_0_50px] transform -translate-x-1/4' 
        : 'right-0 top-[60px] w-[280px] md:w-[380px] rounded-[30px_30px_30px_0] md:rounded-[50px_50px_50px_0] transform translate-x-1/4'
      }
    `}
  >
    <p className={`
      text-white font-medium text-sm md:text-[18px] leading-[150%] capitalize
      ${spaceGrotesk.className}
    `}>
      What Makes Solana's Consensus Mechanism Unique?
    </p>
  </motion.div>
);

const GetStartedSection = () => {
  return (
    <div className="relative w-full min-h-[503px]">
      <div className="relative w-full max-w-[969px] mx-auto px-4 md:px-6"> 
        {/* Header Content */}
        <motion.div 
          className="flex flex-col items-center gap-2 mb-8 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 
            className={`max-w-[693px] text-2xl md:text-[30px] font-bold leading-[130%] text-center tracking-[-0.02em] capitalize text-[#FAFAFA] ${inter.className}`}
          >
            Let's Get Started With Toly
          </h2>
          
          <p 
            className={`max-w-[593px] text-base md:text-[18px] leading-[160%] text-center text-[#9097A6] ${spaceGrotesk.className}`}
          >
            Embarking on an Exciting Journey: Discovering the World of Toly and Unleashing Its Full Potential
          </p>
        </motion.div>

        {/* Interactive Chat Area */}
        <div className="relative w-full h-[200px] md:h-[280px]">
          {/* Center Avatar */}
          <motion.div 
            className="absolute left-[calc(50%-200px/2)] md:left-[calc(50%-280px/2)] top-0 w-[200px] md:w-[280px] h-[200px] md:h-[280px] z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-[#6FCB71]" />
              <Image
                src="/dyor.png"
                alt="Toly Cat"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
          </motion.div>

          {/* Chat Bubbles Container */}
          <div className="relative w-full h-full">
            <ChatBubble position="left" text="What Makes Solana's Consensus Mechanism Unique?" />
            <ChatBubble position="right" text="What Makes Solana's Consensus Mechanism Unique?" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedSection;