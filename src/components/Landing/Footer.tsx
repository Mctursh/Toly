"use client"
import React from 'react';
import Link from 'next/link';
import { Familjen_Grotesk } from 'next/font/google';
import { motion } from 'framer-motion';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

interface FooterLink {
  text: string;
  href: string;
  isActive?: boolean;
}

const Footer = () => {
  const links: FooterLink[] = [
    { text: 'Home', href: '/', isActive: true },
    { text: 'How catoly works', href: 'https://solana-projects.gitbook.io/toly/user-guide/' },
    { text: 'For Developers', href: 'https://solana-projects.gitbook.io/toly/developer-guide/' },
    { text: '$Catoly token', href: '/catoly' },
    { text: 'About us', href: '/about' },
  ];

  return (
    <footer className={`w-full bg-black py-8 ${familjenGrotesk.className}`}>
      <motion.div 
        className="max-w-[1280px] mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center gap-8 md:gap-32">
          {/* Navigation Links */}
          <nav className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-8">
            {links.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className={`
                  text-lg leading-[150%] text-center whitespace-nowrap transition-colors duration-300
                  ${link.isActive ? 'text-[#00EE05]' : 'text-[#9097A6] hover:text-[#00EE05]'}
                `}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Divider for mobile */}
          <div className="w-full h-[1px] bg-[#9097A6]/10 md:hidden" />

          {/* Powered by Text */}
          <div className="text-lg leading-[160%] text-[#9097A6] whitespace-nowrap">
            Powered by Arcane
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;