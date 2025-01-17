"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';
import ChatInterface from './ChatInterface';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// Pre-defined messages for this section
const preloadedMessages = [
  {
    user: true,
    text: "What makes Solana's consensus mechanism unique?"
  },
  {
    user: false,
    text: "Solana uses a proof-of-stake consensus mechanism combined with proof-of-history. This unique approach helps achieve high throughput and low transaction costs. Would you like me to explain more about how it works?"
  },
  {
    user: true,
    text: "Yes, please tell me more about proof-of-history"
  },
  {
    user: false,
    text: "Proof-of-History (PoH) is a sequence of computations that creates a digital record proving that an event occurred at a specific moment in time. Think of it as a cryptographic clock that helps order transactions without all nodes having to agree on time."
  }
];

const SecondFeatureSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Text Section */}
        <motion.div 
          className="flex flex-col justify-center items-start gap-6 w-full lg:w-[445px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-2xl lg:text-[30px] font-bold leading-[130%] tracking-[-0.02em] text-[#FAFAFA] capitalize"
            style={{ fontFamily: 'Inter' }}
          >
            Your AI companion exploring the solana blockchain to bring you
          </h2>
          
          <p className={`text-base lg:text-lg leading-[160%] text-[#9097A6] ${spaceGrotesk.className}`}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          </p>
        </motion.div>

        {/* Right Section - Purple Background with Chat Interface */}
        <motion.div 
          className="relative w-full lg:w-[715px] aspect-video bg-[#C44FE2] rounded-3xl overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cat Image */}
          <motion.div 
            className="absolute w-48 h-48 lg:w-[196px] lg:h-[196px] -right-16 bottom-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/logo.png"
              alt="Toly Cat"
              width={196}
              height={196}
              className="rounded-full object-cover"
              priority
            />
          </motion.div>

          {/* Chat Interface */}
          <div className="absolute w-[85%] h-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3">
            <ChatInterface 
              variant="purple"
              preloadedMessages={preloadedMessages}
              suggestions={[
                {
                  title: "Learn about Solana",
                  description: "Explore consensus mechanisms"
                },
                {
                  title: "Transaction Analysis",
                  description: "Understand blockchain activity"
                },
                {
                  title: "Network Stats",
                  description: "View current metrics"
                },
                {
                  title: "Developer Tools",
                  description: "Access development resources"
                }
              ]}
              initialPrompt="Tell me about Solana's technology"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecondFeatureSection;