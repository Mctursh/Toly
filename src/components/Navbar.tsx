// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, Variants } from 'framer-motion';
// import { FaBars, FaX } from 'react-icons/fa6';

// interface NavLink {
//   href: string;
//   text: string;
//   active?: boolean;
// }

// interface MenuVariants extends Variants {
//   open: {
//     opacity: number;
//     x: string | number;
//   };
//   closed: {
//     opacity: number;
//     x: string | number;
//   };
// }

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const navLinks: NavLink[] = [
//     { href: '/', text: 'Home', active: true },
//     { href: '/chat', text: 'Chat' },
//     { href: '/developers', text: 'For Developers' },
//     { href: '/token', text: '$Catoly token' },
//     { href: '/about', text: 'About us' },
//     { href: '/roadmap', text: 'Roadmap' },
//   ];

//   const menuVariants: MenuVariants = {
//     open: { opacity: 1, x: 0 },
//     closed: { opacity: 0, x: "100%" }
//   };

//   const handleMenuToggle = (): void => {
//     setIsOpen(!isOpen);
//   };

//   const handleLinkClick = (): void => {
//     setIsOpen(false);
//   };

//   return (
//     <motion.nav 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="fixed top-0 left-0 w-full h-28 flex items-center justify-between px-8 md:px-16 lg:px-32 bg-black/90 backdrop-blur-sm z-50"
//     >
//       {/* Logo Section */}
//       <Link href="/" className="flex items-center gap-4">
//         <div className="relative w-12 h-12 rounded-full overflow-hidden">
//           <Image
//             src="/logo.png"
//             alt="A cat holding a GM card"
//             width={48}
//             height={48}
//             className="object-cover"
//             priority
//           />
//         </div>
//         <span className="text-2xl font-medium text-gray-50 font-['Familjen_Grotesk']">
//           Toly.AI
//         </span>
//       </Link>

//       {/* Desktop Menu */}
//       <div className="hidden lg:flex items-center gap-8">
//         {navLinks.map((link: NavLink) => (
//           <Link
//             key={link.text}
//             href={link.href}
//             className={`text-lg font-['Familjen_Grotesk'] ${
//               link.active ? 'text-[#00EE05]' : 'text-[#9097A6]'
//             } hover:text-[#00EE05] transition-colors`}
//           >
//             {link.text}
//           </Link>
//         ))}
//       </div>

//       {/* Get in Touch Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="hidden lg:flex items-center px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full text-lg font-medium text-[#6FCB71] hover:bg-[#6FCB71]/10 transition-colors"
//         type="button"
//       >
//         Get In Touch
//       </motion.button>

//       {/* Mobile Menu Button */}
//       <button
//         onClick={handleMenuToggle}
//         className="lg:hidden text-gray-50 text-2xl"
//         type="button"
//         aria-label={isOpen ? 'Close menu' : 'Open menu'}
//       >
//         {isOpen ? <FaX /> : <FaBars />}
//       </button>

//       {/* Mobile Menu */}
//       <motion.div
//         initial="closed"
//         animate={isOpen ? "open" : "closed"}
//         variants={menuVariants}
//         className="lg:hidden fixed top-32 right-0 w-full h-screen bg-black/90 backdrop-blur-sm"
//       >
//         <div className="flex flex-col items-center gap-8 pt-8">
//           {navLinks.map((link: NavLink) => (
//             <Link
//               key={link.text}
//               href={link.href}
//               onClick={handleLinkClick}
//               className={`text-xl font-['Familjen_Grotesk'] ${
//                 link.active ? 'text-[#00EE05]' : 'text-[#9097A6]'
//               } hover:text-[#00EE05] transition-colors`}
//             >
//               {link.text}
//             </Link>
//           ))}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="mt-4 px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full text-lg font-medium text-[#6FCB71] hover:bg-[#6FCB71]/10 transition-colors"
//             type="button"
//           >
//             Get In Touch
//           </motion.button>
//         </div>
//       </motion.div>
//     </motion.nav>
//   );
// };

// export default Navbar;

"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaBars, FaX } from 'react-icons/fa6';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface NavLink {
  href: string;
  text: string;
  active?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navLinks: NavLink[];
}

const menuVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.25,
      duration: 0.5,
      staggerChildren: 0.1,
    }
  },
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      bounce: 0.25,
      duration: 0.5,
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
};

const menuItemVariants: Variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 20 }
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, navLinks }) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="lg:hidden fixed top-28 right-0 w-full h-screen bg-black/90 backdrop-blur-md"
        >
          <motion.div className="flex flex-col items-center gap-8 pt-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.text}
                variants={menuItemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  onClick={() => { router.push('/contact'); setIsOpen(false); }}
                  className={`relative text-xl ${
                    link.active ? 'text-[#61BDFF]' : 'text-[#92C7FF]'
                  } hover:text-[#61BDFF] transition-colors`}
                >
                  {link.text}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61BDFF]"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            <motion.button
              variants={menuItemVariants}
              whileHover={{ scale: 1.05, backgroundColor: '#B3D9FF' }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 border-2 border-[#92C7FF] rounded-full text-lg font-medium text-[#92C7FF] bg-transparent hover:bg-[#B3D9FF] transition-colors"
              type="button"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const router = useRouter();

  const navLinks: NavLink[] = [
    { href: '/', text: 'Home', active: true },
    { href: '/chat', text: 'Chat' },
    { href: 'https://toly.gitbook.io', text: 'For Developers' },
    { href: '/token', text: '$Catoly token' },
    { href: '/about', text: 'About us' },
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 w-full h-28 flex items-center z-60 justify-between px-8 md:px-16 lg:px-32 
        ${scrolled ? 'bg-black/90' : 'bg-transparent'} 
        backdrop-blur-sm z-50 transition-all duration-300
        ${spaceGrotesk.className}
      `}
    >
      {/* Animated Background Line */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#61BDFF]/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Logo Section */}
      <Link href="/">
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="relative w-12 h-12 rounded-full overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(111,203,113,0.2)",
                "0 0 0 4px rgba(111,203,113,0.2)",
                "0 0 0 0px rgba(111,203,113,0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Image
              src="/logo.png"
              alt="A cat holding a GM card"
              width={48}
              height={48}
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.span 
            className="text-2xl font-medium text-gray-50"
            animate={{
              textShadow: [
                "0 0 0px rgba(111,203,113,0.5)",
                "0 0 10px rgba(111,203,113,0.5)",
                "0 0 0px rgba(111,203,113,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Toly.AI
          </motion.span>
        </motion.div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <motion.div
            key={link.text}
            whileHover={{ scale: 1.05, color: '#61BDFF' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={link.href}
              className={`text-lg ${link.active ? 'text-[#61BDFF]' : 'text-[#92C7FF]'} hover:text-[#61BDFF] transition-colors`}
            >
              {link.text}
              {link.active && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#61BDFF]"
                  layoutId="underline"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Animated Get in Touch Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden lg:block"
      >
        <motion.button
          className="relative group flex items-center px-6 py-3 border-2 border-[#92C7FF] rounded-full overflow-hidden"
          onClick={() => router.push('/contact')}
          type="button"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#92C7FF]/10 to-[#B3D9FF]/10"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(146,199,255,0.2)",
                "0 0 0 4px rgba(146,199,255,0.2)",
                "0 0 0 0px rgba(146,199,255,0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <span className="relative z-10 text-lg font-medium text-[#92C7FF]">
            Get In Touch
          </span>
        </motion.button>
      </motion.div>

      {/* Mobile Menu Button with animation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden relative text-gray-50 text-2xl"
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <FaX /> : <FaBars />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
    </motion.nav>
  );
};

export default Navbar;