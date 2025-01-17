"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className={`relative min-h-screen ${spaceGrotesk.className}`}>
      {/* Main Content Container */}
      <motion.div 
        className="flex flex-col items-center py-32 px-[324px] gap-7 isolate"
        style={{ 
          y: parallaxY,
          width: '1920px',
          height: '746px',
          position: 'absolute',
          left: 'calc(50% - 1920px/2 + 2px)',
          top: 'calc(50% - 746px/2 - 1130.5px)'
        }}
      >
        {/* Introducing Section */}
        <motion.div
          className="flex justify-center items-center p-10 w-[266px] h-[55px] rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center gap-2">
            <span className="text-2xl font-normal text-[#FAFAFA] text-center capitalize">
              ✨ Introducing Toly AI
            </span>
          </div>
        </motion.div>

        {/* Main Heading Section */}
        <div className="flex justify-center items-center w-[944px] h-[116px]">
          <div className="relative w-[944px] h-[116px]">
            <motion.h1 
              className="absolute w-[934px] h-[63px] left-0 top-0 font-bold text-[52px] leading-[63px] tracking-[-0.02em] capitalize text-[#FAFAFA]"
              style={{ fontFamily: 'Inter' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The Intelligent meme-Based AI Agent
            </motion.h1>
            <motion.p 
              className="absolute w-[820px] h-[29px] left-[57px] top-[87.5px] font-normal text-lg leading-[160%] text-[#9097A6]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
            </motion.p>
          </div>
        </div>

        {/* Feature Buttons Section */}
        <div className="absolute w-[634px] h-[55px] left-[638px] top-[402px]">
          {/* Research Button */}
          <motion.div
            className="absolute flex justify-center items-center p-10 gap-6 w-[189.66px] h-[55px] rounded-3xl"
            style={{ left: 'calc(50% - 189.66px/2 - 227.17px)', top: 'calc(50% - 55px/2 + 56.5px)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-bold text-[#FAFAFA] text-center capitalize">
              RESEARCH
            </span>
          </motion.div>

          {/* Insights Button */}
          <motion.div
            className="absolute flex justify-center items-center p-10 gap-6 w-[189.66px] h-[55px] rounded-3xl"
            style={{ 
              left: 'calc(50% - 189.66px/2 - 5px)', 
              top: 'calc(50% - 55px/2 + 56.5px)',
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-bold text-[#FAFAFA] text-center capitalize">
              INSIGHTS
            </span>
          </motion.div>

          {/* Analysis Button */}
          <motion.div
            className="absolute flex justify-center items-center p-10 gap-6 w-[189.66px] h-[55px] rounded-3xl"
            style={{ left: 'calc(50% - 189.66px/2 + 217.17px)', top: 'calc(50% - 55px/2 + 56.5px)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-bold text-[#FAFAFA] text-center capitalize">
              ANALYSIS
            </span>
          </motion.div>
        </div>

      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,.9)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,.9)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
    </div>
  );
};

export default HeroSection;