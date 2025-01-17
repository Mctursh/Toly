import React from 'react';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import { motion } from 'framer-motion';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface FooterLink {
  text: string;
  href: string;
  isActive?: boolean;
}

const Footer = () => {
  const links: FooterLink[] = [
    { text: 'Home', href: '/', isActive: true },
    { text: 'How toly works', href: '/how-it-works' },
    { text: 'For Developers', href: '/developers' },
    { text: '$Catoly token', href: '/token' },
    { text: 'About us', href: '/about' },
    { text: 'Roadmap', href: '/roadmap' }
  ];

  return (
    <motion.footer 
      className={`absolute w-[696px] h-[86px] left-[calc(50%-696px/2+23px)] top-[3318px] flex flex-col items-center gap-[30px] ${spaceGrotesk.className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation Links */}
      <div className="flex flex-row items-center gap-8 w-full h-[27px]">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`
              text-lg leading-[150%] text-center capitalize
              ${link.isActive ? 'text-[#00EE05]' : 'text-[#9097A6]'}
              hover:text-[#00EE05] transition-colors duration-300
              ${getWidthClass(link.text)}
            `}
          >
            {link.text}
          </Link>
        ))}
      </div>

      {/* Powered by Text */}
      <div className="w-full text-lg leading-[160%] text-center text-[#9097A6]">
        Powered by Arcane
      </div>
    </motion.footer>
  );
};

// Helper function to assign the correct width based on the link text
const getWidthClass = (text: string): string => {
  const widthMap: { [key: string]: string } = {
    'Home': 'w-[46px]',
    'How toly works': 'w-[123px]',
    'For Developers': 'w-[114px]',
    '$Catoly token': 'w-[109px]',
    'About us': 'w-[69px]',
    'Roadmap': 'w-[75px]'
  };

  return widthMap[text] || '';
};

export default Footer;