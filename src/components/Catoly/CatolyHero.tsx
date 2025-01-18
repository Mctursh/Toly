"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import AnimatedSphere from './AnimatedSphere';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const CatolyHero = () => {
  return (
    <div className="relative max-w-[1280px] mx-auto pt-32 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Content */}
        <motion.div 
          className="flex flex-col items-start gap-8 max-w-[600px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* About Us Button */}
          <Link 
            href="/about" 
            className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-black border border-[#00EE05]/20 hover:bg-[#00EE05]/10 transition-colors"
          >
            <span className="text-[#00EE05] text-sm uppercase">
              $CATOLY
            </span>
          </Link>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Your AI Companion Exploring The Solana Blockchain To Bring
          </h1>

          {/* Description */}
          <p className="text-lg text-[#9097A6] leading-relaxed">
            Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
          </p>

          {/* CTA Button */}
          <Link 
            href="/token" 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#6FCB71] rounded-full hover:bg-[#5FB761] transition-colors"
          >
            <span className="text-black font-medium uppercase">
              BUY CATOLY TOKEN
            </span>
          </Link>
        </motion.div>

        {/* Right Image */}
            <motion.div 
            className="relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
            <div className="w-full h-full">
                <AnimatedSphere />
            </div>
            </motion.div>
      </div>
    </div>
  );
};

export default CatolyHero;