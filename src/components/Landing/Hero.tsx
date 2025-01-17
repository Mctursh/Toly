"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const HeroSection = () => {
  return (
    <div className="relative max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col items-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,.9)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,.9)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-24">
        {/* Introducing Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-[rgba(255,255,255,0.05)] rounded-full px-8 py-3"
        >
          <span className="text-2xl font-normal text-[#FAFAFA]">
            ✨ Introducing Toly AI
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-center text-[#FAFAFA] mb-6 max-w-3xl"
        >
          The <span className="text-[#6FCB71]">Intelligent</span> Meme-Based <span className="text-[#6FCB71]">AI</span> Agent
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-[#9097A6] text-center max-w-2xl mb-12"
        >
          Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Link href="#research">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#6FCB71] rounded-full text-black font-medium text-lg"
            >
              RESEARCH
            </motion.button>
          </Link>
          <Link href="#insights">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-[#6FCB71] rounded-full text-[#6FCB71] font-medium text-lg"
            >
              INSIGHTS
            </motion.button>
          </Link>
          <Link href="#analysis">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-[#6FCB71] rounded-full text-[#6FCB71] font-medium text-lg"
            >
              ANALYSIS
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;