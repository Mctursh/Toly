"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className={`w-full bg-black/90 backdrop-blur-sm py-[30px] ${spaceGrotesk.className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-16 lg:px-32">
        <div className="text-center text-[#92C7FF] text-sm">
          Powered by Arcane - Copyright &copy; 2024. All Rights Reserved
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;