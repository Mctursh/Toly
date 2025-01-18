"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const columnContent = [
  {
    title: "Empowering Smart Trading Decisions",
    description: "Transform your trading strategy with AI-powered insights. Get comprehensive analysis of market trends, token movements, and trading opportunities all powered by Toly."
  },
  {
    title: "Community-Driven Innovation Hub",
    description: "Join a thriving ecosystem where AI technology meets community insight. Participate in governance, shape the future of AI-assisted trading, and be part of the next generation of DeFi."
  }
];

const TwoColumnSection = () => {
  return (
    <div className="relative max-w-[1280px] mx-auto py-20 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[100px]">
        {columnContent.map((content, index) => (
          <motion.div 
            key={index}
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex flex-col items-center gap-6 max-w-[582.5px] mx-auto">
              <h2 className={`${inter.className} text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-center text-[#FAFAFA] capitalize`}>
                {content.title}
              </h2>

              <p className={`${spaceGrotesk.className} text-lg leading-[160%] text-center text-[#9097A6]`}>
                {content.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TwoColumnSection;