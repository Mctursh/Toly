"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';
import ChatInterface from '../Landing/ChatInterface';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const AboutSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-24 pb-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Section - Purple Background with Interactive Element */}
        <motion.div 
          className="relative w-full lg:w-[715px] h-[500px] lg:aspect-video bg-[#C44FE2] rounded-3xl overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative Cat Image */}
          <motion.div 
            className="absolute w-48 h-48 lg:w-[245px] lg:h-[245px] -left-16 bottom-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/wen.png"
              alt="Toly Cat"
              width={245}
              height={245}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>

          {/* About Stats/Info Display */}
          <div className="absolute w-[85%] h-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 bg-black/40 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6 h-full">
              <motion.div 
                className="flex flex-col items-center justify-center bg-black/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-4xl font-bold text-white mb-2">24/7</span>
                <span className="text-sm text-gray-200">AI Assistance</span>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center justify-center bg-black/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-4xl font-bold text-white mb-2">100%</span>
                <span className="text-sm text-gray-200">Decentralized</span>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center justify-center bg-black/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-4xl font-bold text-white mb-2">1M+</span>
                <span className="text-sm text-gray-200">Transactions Analyzed</span>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center justify-center bg-black/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-4xl font-bold text-white mb-2">10k+</span>
                <span className="text-sm text-gray-200">Community Members</span>
              </motion.div>
            </div>
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
            Building the Future of AI-Powered DeFi
          </h2>
          
          <p className={`text-base lg:text-lg leading-[160%] text-[#9097A6] ${spaceGrotesk.className}`}>
            Toly.AI combines cutting-edge artificial intelligence with deep blockchain analytics to revolutionize how traders interact with the Solana ecosystem. Our mission is to make complex blockchain data accessible and actionable for everyone.
          </p>

          {/* Additional Info Points */}
          <div className="space-y-4 mt-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6FCB71] flex items-center justify-center flex-shrink-0">
                <span className="text-black text-sm">✓</span>
              </div>
              <p className="text-[#9097A6]">Real-time AI-powered market analysis</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6FCB71] flex items-center justify-center flex-shrink-0">
                <span className="text-black text-sm">✓</span>
              </div>
              <p className="text-[#9097A6]">Advanced blockchain data visualization</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6FCB71] flex items-center justify-center flex-shrink-0">
                <span className="text-black text-sm">✓</span>
              </div>
              <p className="text-[#9097A6]">Community-driven development and governance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;