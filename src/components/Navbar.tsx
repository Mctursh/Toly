"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FaBars, FaX } from 'react-icons/fa6';

interface NavLink {
  href: string;
  text: string;
  active?: boolean;
}

interface MenuVariants extends Variants {
  open: {
    opacity: number;
    x: string | number;
  };
  closed: {
    opacity: number;
    x: string | number;
  };
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { href: '/', text: 'Home', active: true },
    { href: '/chat', text: 'Chat' },
    { href: '/developers', text: 'For Developers' },
    { href: '/token', text: '$Catoly token' },
    { href: '/about', text: 'About us' },
    { href: '/roadmap', text: 'Roadmap' },
  ];

  const menuVariants: MenuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  };

  const handleMenuToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (): void => {
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full h-28 flex items-center justify-between px-8 md:px-16 lg:px-32 bg-black/90 backdrop-blur-sm z-50"
    >
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/logo.png"
            alt="A cat holding a GM card"
            width={48}
            height={48}
            className="object-cover"
            priority
          />
        </div>
        <span className="text-2xl font-medium text-gray-50 font-['Familjen_Grotesk']">
          Toly.AI
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link: NavLink) => (
          <Link
            key={link.text}
            href={link.href}
            className={`text-lg font-['Familjen_Grotesk'] ${
              link.active ? 'text-[#00EE05]' : 'text-[#9097A6]'
            } hover:text-[#00EE05] transition-colors`}
          >
            {link.text}
          </Link>
        ))}
      </div>

      {/* Get in Touch Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden lg:flex items-center px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full text-lg font-medium text-[#6FCB71] hover:bg-[#6FCB71]/10 transition-colors"
        type="button"
      >
        Get In Touch
      </motion.button>

      {/* Mobile Menu Button */}
      <button
        onClick={handleMenuToggle}
        className="lg:hidden text-gray-50 text-2xl"
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <FaX /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="lg:hidden fixed top-32 right-0 w-full h-screen bg-black/90 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-8 pt-8">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.text}
              href={link.href}
              onClick={handleLinkClick}
              className={`text-xl font-['Familjen_Grotesk'] ${
                link.active ? 'text-[#00EE05]' : 'text-[#9097A6]'
              } hover:text-[#00EE05] transition-colors`}
            >
              {link.text}
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full text-lg font-medium text-[#6FCB71] hover:bg-[#6FCB71]/10 transition-colors"
            type="button"
          >
            Get In Touch
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;