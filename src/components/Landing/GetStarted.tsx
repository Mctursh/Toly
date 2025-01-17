import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const ChatBubble = ({ text, position }: { text: string; position: 'left' | 'right' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`
      absolute flex flex-row items-start p-6 gap-4 bg-[#0B0C0F]
      ${position === 'left' 
        ? 'left-[475px] top-[262px] w-[381px] rounded-[50px_50px_0px_50px]' 
        : 'left-[1016px] top-[313px] w-[428px] rounded-[50px_50px_50px_0px]'
      }
    `}
  >
    <p className={`
      text-white font-medium text-lg leading-[150%] capitalize flex-grow
      ${spaceGrotesk.className}
    `}>
      {text}
    </p>
  </motion.div>
);

const GetStartedSection = () => {
  return (
    <div className="relative w-[1920px] h-[503px] left-[calc(50%-1920px/2)] top-[2629px] bg-[#121417]">
      {/* Header Content */}
      <motion.div 
        className="absolute w-[693px] h-[105px] left-[calc(50%-693px/2-0.5px)] top-[100px] flex flex-col justify-center items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 
          className="w-full text-[30px] font-bold leading-[130%] text-center tracking-[-0.02em] capitalize text-[#FAFAFA]"
          style={{ fontFamily: 'Inter' }}
        >
          Let's Get Started With Toly
        </h2>
        
        <p className={`w-[593px] text-lg leading-[160%] text-center text-[#9097A6] ${spaceGrotesk.className}`}>
          Embarking on an Exciting Journey: Discovering the World of Toly and Unleashing Its Full Potential
        </p>
      </motion.div>

      {/* Chat Section */}
      <div className="absolute w-[969px] h-[280px] left-[calc(50%-969px/2-0.5px)] top-[245px]">
        {/* Center Cat Image */}
        <motion.div 
          className="absolute w-[280px] h-[280px] left-[calc(50%-280px/2-25px)] top-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo.png"
            alt="Toly Cat"
            width={280}
            height={280}
            className="rounded-full object-cover"
            priority
          />
        </motion.div>

        {/* Chat Bubbles */}
        <ChatBubble 
          text="What Makes Solana's Consensus Mechanism Unique?"
          position="left"
        />
        
        <ChatBubble 
          text="What Makes Solana's Consensus Mechanism Unique?"
          position="right"
        />
      </div>

      {/* Optional: Add animated dots or lines connecting the bubbles */}
      <svg 
        className="absolute left-0 top-[200px] w-full"
        height="100"
        style={{ pointerEvents: 'none' }}
      >
        <motion.path
          d="M 500 50 L 1400 50"
          stroke="#61BDFF"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          fill="none"
        />
      </svg>
    </div>
  );
};

export default GetStartedSection;