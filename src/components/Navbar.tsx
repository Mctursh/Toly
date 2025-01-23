// "use client"
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaBars, FaX } from 'react-icons/fa6';
// import { Familjen_Grotesk } from 'next/font/google';

// const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

// interface NavLink {
//   href: string;
//   text: string;
// }

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isScrolled, setIsScrolled] = useState<boolean>(false);
//   const pathname = usePathname();

//   // Navigation links with their paths
//   const navLinks: NavLink[] = [
//     { href: '/', text: 'Home' },
//     { href: 'https://solana-projects.gitbook.io/toly/user-guide/', text: 'How Toly Works' },
//     { href: 'https://solana-projects.gitbook.io/toly/developer-guide/', text: 'For Developers' },
//     { href: '/catoly', text: '$Catoly token' },
//     { href: '/about', text: 'About us' },
//   ];

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   const menuVariants = {
//     initial: { opacity: 0, y: -20 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 }
//   };

//   return (
//     <motion.nav 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-black/90 backdrop-blur-sm' : ''
//       }`}
//     >
//       <div className="max-w-7xl mx-auto h-32 flex items-center justify-between px-4 sm:px-6 lg:px-8">
//         {/* Logo Section */}
//         <Link href="/" className="flex items-center gap-4 group cursor-pointer">
//           <motion.div 
//             className="relative w-12 h-12 rounded-full overflow-hidden"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Image
//               src="/logo.png"
//               alt="Toly.AI logo"
//               width={48}
//               height={48}
//               className="object-cover transform group-hover:scale-110 transition-transform duration-300"
//               priority
//             />
//           </motion.div>
//           <span className={`text-2xl font-medium text-[#FAFAFA] group-hover:text-[#6FCB71] transition-colors ${familjenGrotesk.className}`}>
//             toly.AI
//           </span>
//         </Link>

//         {/* Desktop Navigation Menu */}
//         <div className="hidden lg:flex items-center justify-between bg-[#222222] rounded-3xl px-6 py-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.text}
//               href={link.href}
//               className={`relative px-4 py-2 text-lg font-normal cursor-pointer group ${
//                 pathname === link.href ? 'text-[#00EE05]' : 'text-[#9097A6]'
//               } hover:text-[#00EE05] transition-colors ${familjenGrotesk.className}`}
//             >
//               {link.text}
//               {pathname === link.href && (
//                 <motion.div
//                   className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00EE05]"
//                   layoutId="underline"
//                 />
//               )}
//               <motion.div
//                 className="absolute inset-0 bg-white/5 rounded-lg"
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.2 }}
//               />
//             </Link>
//           ))}
//         </div>

//         {/* Get in Touch Button */}
//         <Link href="/contact">
//           <motion.button
//             className="hidden lg:flex items-center px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full cursor-pointer hover:bg-[#6FCB71]/10 transition-colors group"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <span className={`text-lg font-medium text-[#6FCB71] group-hover:text-[#7FDB85] transition-colors capitalize ${familjenGrotesk.className}`}>
//               get in touch
//             </span>
//           </motion.button>
//         </Link>

//         {/* Mobile Menu Button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setIsOpen(!isOpen)}
//           className="lg:hidden text-[#FAFAFA] text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
//           aria-label={isOpen ? 'Close menu' : 'Open menu'}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={isOpen ? 'close' : 'open'}
//               initial={{ opacity: 0, rotate: -90 }}
//               animate={{ opacity: 1, rotate: 0 }}
//               exit={{ opacity: 0, rotate: 90 }}
//               transition={{ duration: 0.2 }}
//             >
//               {isOpen ? <FaX /> : <FaBars />}
//             </motion.div>
//           </AnimatePresence>
//         </motion.button>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               variants={menuVariants}
//               className="lg:hidden fixed top-32 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10"
//             >
//               <div className="flex flex-col items-center gap-6 p-8">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.text}
//                     href={link.href}
//                     className={`text-xl cursor-pointer ${
//                       pathname === link.href ? 'text-[#00EE05]' : 'text-[#9097A6]'
//                     } hover:text-[#00EE05] transition-colors ${familjenGrotesk.className}`}
//                   >
//                     {link.text}
//                   </Link>
//                 ))}
//                 <Link href="/contact">
//                   <motion.button
//                     className="mt-4 px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full hover:bg-[#6FCB71]/10 transition-colors"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <span className={`text-lg font-medium capitalize text-[#6FCB71] ${familjenGrotesk.className}`}>
//                       get in touch
//                     </span>
//                   </motion.button>
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;

"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaX } from 'react-icons/fa6';
import { Familjen_Grotesk } from 'next/font/google';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

interface NavLink {
  href: string;
  text: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { href: '/', text: 'Home' },
    { href: 'https://solana-projects.gitbook.io/toly/user-guide/', text: 'How Toly Works' },
    { href: 'https://solana-projects.gitbook.io/toly/developer-guide/', text: 'For Developers' },
    { href: '/catoly', text: '$Catoly token' },
    { href: '/about', text: 'About us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    >
      <div className={`absolute inset-0 transition-colors duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : ''}`} />
      <div className="relative max-w-7xl mx-auto h-32 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <motion.div 
            className="relative w-12 h-12 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/logo.png"
              alt="Toly.AI logo"
              width={48}
              height={48}
              className="object-cover transform group-hover:scale-110 transition-transform duration-300"
              priority
            />
          </motion.div>
          <span className={`text-2xl font-medium text-[#FAFAFA] group-hover:text-[#6FCB71] transition-colors ${familjenGrotesk.className}`}>
            toly.AI
          </span>
        </Link>

        {/* Desktop Navigation Menu */}
        <div className={`hidden lg:flex items-center justify-between rounded-3xl px-6 py-4 ${isScrolled ? 'bg-[#222222]' : 'bg-black/20 backdrop-blur-sm'}`}>
          {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              className={`relative px-4 py-2 text-lg font-normal cursor-pointer group ${
                pathname === link.href ? 'text-[#00EE05]' : 'text-[#9097A6]'
              } hover:text-[#00EE05] transition-colors ${familjenGrotesk.className}`}
            >
              {link.text}
              {pathname === link.href && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00EE05]"
                  layoutId="underline"
                />
              )}
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </div>

        {/* Get in Touch Button */}
        <Link href="/contact">
          <motion.button
            className="hidden lg:flex items-center px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full cursor-pointer hover:bg-[#6FCB71]/10 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`text-lg font-medium text-[#6FCB71] group-hover:text-[#7FDB85] transition-colors capitalize ${familjenGrotesk.className}`}>
              get in touch
            </span>
          </motion.button>
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#FAFAFA] text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={menuVariants}
              className={`lg:hidden fixed top-32 left-0 right-0 ${isScrolled ? 'bg-black/95' : 'bg-black/20'} backdrop-blur-md border-t border-white/10`}
            >
              <div className="flex flex-col items-center gap-6 p-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className={`text-xl cursor-pointer ${
                      pathname === link.href ? 'text-[#00EE05]' : 'text-[#9097A6]'
                    } hover:text-[#00EE05] transition-colors ${familjenGrotesk.className}`}
                  >
                    {link.text}
                  </Link>
                ))}
                <Link href="/contact">
                  <motion.button
                    className="mt-4 px-6 py-3 border-2 border-[#6FCB71]/20 rounded-full hover:bg-[#6FCB71]/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`text-lg font-medium capitalize text-[#6FCB71] ${familjenGrotesk.className}`}>
                      get in touch
                    </span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;