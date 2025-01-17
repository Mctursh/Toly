"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const RightContentSection = () => {
  return (
    <div className="relative max-w-[1280px] mx-auto py-20 px-4 md:px-6 lg:px-8">
      <motion.div 
        className="ml-auto w-full lg:w-[611px]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6">
          <h2 className={`${inter.className} text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-[#FAFAFA] capitalize`}>
            Your AI companion exploring the solana blockchain to bring
          </h2>

          <p className={`${spaceGrotesk.className} text-lg leading-[160%] text-[#9097A6]`}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <Link href="/token">
            <motion.button 
              className="flex justify-center items-center w-[235px] h-[64px] bg-[#6FCB71] border border-[rgba(111,203,113,0.2)] rounded-[50px] px-6 hover:bg-[#5FB761] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`${spaceGrotesk.className} font-medium text-lg uppercase text-[#0B0C0F]`}>
                Buy catoly token
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RightContentSection;