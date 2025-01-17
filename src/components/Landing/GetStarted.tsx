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
      absolute flex flex-row items-center p-6 bg-[#0B0C0F] min-h-[102px]
      ${position === 'left' 
        ? 'left-[475px] top-[262px] w-[381px] rounded-[50px_50px_0_50px]' 
        : 'left-[1016px] top-[313px] w-[428px] rounded-[50px_50px_50px_0]'
      }
    `}
  >
    <p className={`
      text-white font-medium text-[18px] leading-[150%] capitalize
      ${spaceGrotesk.className}
    `}>
      What Makes Solana's Consensus Mechanism Unique?
    </p>
  </motion.div>
);

const GetStartedSection = () => {
  return (
    <section className="relative w-full bg-[#121417]">
      <div className="relative w-[1920px] h-[503px] mx-auto">
        {/* Header Content */}
        <motion.div 
          className="absolute w-[693px] h-[105px] left-[calc(50%-693px/2-0.5px)] top-[100px] flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 
            className={`w-full h-[39px] text-[30px] font-bold leading-[130%] text-center tracking-[-0.02em] capitalize text-[#FAFAFA] ${inter.className}`}
          >
            Let's Get Started With Toly
          </h2>
          
          <p 
            className={`w-[593px] h-[58px] text-[18px] leading-[160%] text-center text-[#9097A6] ${spaceGrotesk.className}`}
          >
            Embarking on an Exciting Journey: Discovering the World of Toly and Unleashing Its Full Potential
          </p>
        </motion.div>

        {/* Interactive Chat Area */}
        <div className="absolute w-[969px] h-[280px] left-[calc(50%-969px/2-0.5px)] top-[245px]">
          {/* Center Avatar */}
          <motion.div 
            className="absolute w-[280px] h-[280px] left-[calc(50%-280px/2-25px)] top-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/dyor.png"
                alt="Toly Cat"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Chat Bubbles */}
          <ChatBubble position="left" text="What Makes Solana's Consensus Mechanism Unique?" />
          <ChatBubble position="right" text="What Makes Solana's Consensus Mechanism Unique?" />

          {/* Connecting Line */}
          <svg 
            className="absolute w-full top-[160px] left-0"
            height="2"
            style={{ pointerEvents: 'none' }}
            viewBox="0 0 1920 2"
          >
            <motion.path
              d="M 500 1 H 1400"
              stroke="#61BDFF"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#61BDFF]/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;