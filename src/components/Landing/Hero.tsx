"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  return (
    <section className={`relative w-full min-h-screen bg-black ${spaceGrotesk.className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,.9)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,.9)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Main Content Container */}
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col items-center max-w-7xl mx-auto">
          {/* Introducing Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-2xl font-normal text-[#FAFAFA] text-center capitalize px-6 py-3 rounded-3xl inline-block">
              ✨ Introducing Toly AI
            </span>
          </motion.div>

          {/* Main Heading Section */}
          <div className="text-center mb-16 max-w-4xl px-4">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight md:leading-[1.2] tracking-[-0.02em] capitalize text-[#FAFAFA] mb-6"
              style={{ fontFamily: 'Inter' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The Intelligent meme-Based AI Agent
            </motion.h1>
            <motion.p 
              className="text-lg text-[#9097A6] leading-[160%] max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
            </motion.p>
          </div>

          {/* Feature Buttons Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-2xl mt-8">
            {["RESEARCH", "INSIGHTS", "ANALYSIS"].map((text, index) => (
              <motion.button
                key={text}
                className="w-full md:w-[189.66px] px-6 py-4 rounded-3xl bg-transparent hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-xl md:text-2xl font-bold text-[#FAFAFA] text-center capitalize">
                  {text}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;