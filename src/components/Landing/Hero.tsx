"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import { Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-black pt-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,.9)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,.9)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Main Container */}
      <motion.div 
        className="relative mx-auto max-w-[1920px] flex flex-col items-center px-4 md:px-8 lg:px-[324px] gap-[29px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Introducing Section */}
        <div className="w-full max-w-[266px] h-[55px] flex flex-row justify-center items-center p-[40px_24px] gap-[24px] rounded-[24px] border-2 border-[#61BDFF]">
          <motion.div 
            className="flex justify-center items-center gap-[8px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className={`text-[24px] leading-[30px] font-normal text-[#FAFAFA] text-center capitalize ${spaceGrotesk.className}`}>
              ✨ Introducing Toly AI
            </span>
          </motion.div>
        </div>

        {/* Main Content Section */}
        <div className="w-full max-w-[944px] flex flex-col items-center gap-[10px] text-center px-4">
          <motion.h1 
            className={`font-bold text-4xl md:text-[52px] leading-tight md:leading-[63px] tracking-[-0.02em] text-[#FAFAFA] capitalize ${inter.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The <span className="text-[#6FCB71]">Intelligent Meme-Based</span> AI Agent
          </motion.h1>
          
          <motion.p 
            className={`max-w-[820px] font-normal text-base md:text-[18px] leading-[160%] text-[#9097A6] mt-6 ${spaceGrotesk.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
          </motion.p>
        </div>

        {/* Action Buttons Group */}
        <div className="flex flex-col md:flex-row gap-4 mt-12 w-full max-w-[634px] justify-center">
          {/* Research Button */}
          <motion.div 
            className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                RESEARCH
              </span>
            </div>
          </motion.div>

          {/* Insights Button */}
          <motion.div 
            className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                INSIGHTS
              </span>
            </div>
          </motion.div>

          {/* Analysis Button */}
          <motion.div 
            className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                ANALYSIS
              </span>
            </div>
          </motion.div>
        </div>

        {/* Get Started Button */}
        <motion.button
          className="mt-12 px-8 py-4 bg-[#6FCB71] rounded-full text-black font-bold text-lg hover:bg-[#5FB761] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;