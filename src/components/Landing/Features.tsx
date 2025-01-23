"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Familjen_Grotesk } from 'next/font/google';
import ChatInterface from './ChatInterface';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

const FeatureSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-24 pb-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Section - Green Background with Chat Interface */}
        <motion.div 
          className="relative w-full lg:w-[715px] h-[500px] lg:aspect-video bg-[#6FCB71] rounded-3xl overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cat Image */}
          <motion.div 
            className="absolute w-48 h-48 lg:w-[245px] lg:h-[245px] -left-16 bottom-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/logo.png"
              alt="Toly Cat"
              width={245}
              height={245}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>

          {/* Chat Interface Container */}
          <div className="absolute w-[85%] h-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3">
            <ChatInterface variant="green" />
          </div>
        </motion.div>

        {/* Right Section - Text Content */}
        <motion.div 
          className="flex flex-col justify-center items-start gap-6 w-full lg:w-[417px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-2xl lg:text-[30px] font-bold leading-[130%] tracking-[-0.02em] text-[#FAFAFA] capitalize"
            style={{ fontFamily: 'Inter' }}
          >
            Advanced AI-Powered Blockchain Analysis
          </h2>
          
          <p className={`text-base lg:text-lg leading-[160%] text-[#9097A6] ${familjenGrotesk.className}`}>
          Experience real-time insights and deep analysis of the Solana blockchain with our intelligent AI assistant. Get detailed information about transactions, tokens, and market trends instantly.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureSection;