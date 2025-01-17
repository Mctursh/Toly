"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaX } from 'react-icons/fa6';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface NavLink {
  href: string;
  text: string;
  active?: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { href: '/', text: 'Home', active: true },
    { href: '/developers', text: 'For Developers' },
    { href: '/token', text: '$Catoly token' },
    { href: '/about', text: 'About us' },
  ];

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-32 flex items-center justify-between px-8 md:px-16 lg:px-32">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/logo.png"
            alt="Toly.AI logo"
            width={48}
            height={48}
            className="object-cover"
            priority
          />
        </div>
        <span className={`text-2xl font-medium text-[#FAFAFA] ${spaceGrotesk.className}`}>
          toly.AI
        </span>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden lg:flex items-center justify-between bg-[#222222] rounded-3xl px-4 py-3 w-[666px]">
        {navLinks.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className={`text-lg font-normal ${
              link.active ? 'text-[#00EE05]' : 'text-[#9097A6]'
            } hover:text-[#00EE05] transition-colors text-center ${spaceGrotesk.className}`}
          >
            {link.text}
          </Link>
        ))}
      </div>

      {/* Get in Touch Button */}
      <button
        className="hidden lg:flex items-center px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full"
        type="button"
      >
        <span className={`text-lg font-medium text-[#6FCB71] capitalize ${spaceGrotesk.className}`}>
          get in touch
        </span>
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-[#FAFAFA] text-2xl"
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <FaX /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden fixed top-32 right-0 w-full bg-black/90 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl ${
                    link.active ? 'text-[#00EE05]' : 'text-[#9097A6]'
                  } hover:text-[#00EE05] transition-colors ${spaceGrotesk.className}`}
                >
                  {link.text}
                </Link>
              ))}
              <button
                className="mt-4 px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full"
                type="button"
              >
                <span className={`text-lg font-medium text-[#6FCB71] ${spaceGrotesk.className}`}>
                  get in touch
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;