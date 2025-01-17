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
    <div className="relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,.9)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,.9)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Main Container */}
      <motion.div 
        className="absolute w-[1920px] h-[746px] left-[calc(50%-1920px/2+2px)] top-[calc(50%-746px/2-1130.5px)] flex flex-col items-center py-[129px] px-[324px] gap-[29px] isolate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Introducing Section with Sky Blue Border */}
        <div className="w-[266px] h-[55px] flex flex-row justify-center items-center p-[40px_24px] gap-[24px] rounded-[24px] border-2 border-[#61BDFF]">
          <motion.div 
            className="w-[218px] h-[30px] flex justify-center items-center gap-[8px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className={`text-[24px] leading-[30px] font-normal text-[#FAFAFA] text-center capitalize ${spaceGrotesk.className}`}>
              ✨ Introducing Toly AI
            </span>
          </motion.div>
        </div>

        {/* Main Content Section */}
        <div className="w-[944px] h-[116px] flex flex-row justify-center items-center gap-[10px] relative">
          <h1 
            className={`absolute w-[934px] h-[63px] left-0 top-0 font-bold text-[52px] leading-[63px] tracking-[-0.02em] text-[#FAFAFA] capitalize ${inter.className}`}
          >
            The <span className="text-[#6FCB71]">Intelligent Meme-Based</span> AI Agent
          </h1>
          
          <p 
            className={`absolute w-[820px] h-[29px] left-[57px] top-[87.5px] font-normal text-[18px] leading-[160%] text-[#9097A6] ${spaceGrotesk.className}`}
          >
            Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
          </p>
        </div>

        {/* Action Buttons Group */}
        <div className="absolute w-[634px] h-[55px] left-[638px] top-[402px] z-[2]">
          {/* Research Button */}
          <motion.div 
            className="absolute w-[189.66px] h-[55px] left-[calc(50%-189.66px/2-227.17px)] top-[calc(50%-55px/2+56.5px)] flex justify-center items-center p-[40px_24px] gap-[24px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`w-[116px] h-[30px] font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                RESEARCH
              </span>
            </div>
          </motion.div>

          {/* Insights Button */}
          <motion.div 
            className="absolute w-[189.66px] h-[55px] left-[calc(50%-189.66px/2-5px)] top-[calc(50%-55px/2+56.5px)] flex justify-center items-center p-[40px_24px] gap-[24px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`w-[103px] h-[30px] font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                INSIGHTS
              </span>
            </div>
          </motion.div>

          {/* Analysis Button */}
          <motion.div 
            className="absolute w-[189.66px] h-[55px] left-[calc(50%-189.66px/2+217.17px)] top-[calc(50%-55px/2+56.5px)] flex justify-center items-center p-[40px_24px] gap-[24px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`w-[104px] h-[30px] font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                ANALYSIS
              </span>
            </div>
          </motion.div>
        </div>

        {/* Get Started Button */}
        <motion.button
          className="absolute bottom-12 px-8 py-4 bg-[#6FCB71] rounded-full text-black font-bold text-lg hover:bg-[#5FB761] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;