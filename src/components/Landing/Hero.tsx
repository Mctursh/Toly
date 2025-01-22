// "use client"
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { Familjen_Grotesk } from 'next/font/google';
// import { Inter } from 'next/font/google';
// import { LoginButton } from '@/components/Auth/LoginModal';

// const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });
// const inter = Inter({ subsets: ['latin'] });

// interface MousePosition {
//   x: number;
//   y: number;
// }

// const HeroSection: React.FC = () => {
//   const router = useRouter();
//   const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

//   const handleMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMousePosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top
//     });
//   };

//   return (
//     <section 
//       className="relative min-h-screen w-full overflow-x-hidden bg-black pt-32"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Base Grid Pattern */}
//       <div 
//         className="absolute inset-0"
//         style={{
//           background: `
//             linear-gradient(90deg, transparent 49.5%, rgba(111, 203, 113, 0.8) 49.5%, rgba(111, 203, 113, 0.8) 50.5%, transparent 50.5%),
//             linear-gradient(0deg, transparent 49.5%, rgba(111, 203, 113, 0.8) 49.5%, rgba(111, 203, 113, 0.8) 50.5%, transparent 50.5%)
//           `,
//           backgroundSize: '100px 100px',
//           WebkitMaskImage: `
//             linear-gradient(to bottom, 
//               rgba(0,0,0,1) 0%,
//               rgba(0,0,0,0.7) 20%,
//               rgba(0,0,0,0.4) 40%,
//               rgba(0,0,0,0.2) 60%,
//               rgba(0,0,0,0.1) 80%,
//               rgba(0,0,0,0) 100%
//             ),
//             radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
//           `,
//           maskImage: `
//             linear-gradient(to bottom, 
//               rgba(0,0,0,1) 0%,
//               rgba(0,0,0,0.7) 20%,
//               rgba(0,0,0,0.4) 40%,
//               rgba(0,0,0,0.2) 60%,
//               rgba(0,0,0,0.1) 80%,
//               rgba(0,0,0,0) 100%
//             ),
//             radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
//           `,
//           opacity: 0.3
//         }}
//       />
      
//       {/* Hover Effect Layer */}
//       <div 
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background: `
//             radial-gradient(circle 4px at ${mousePosition.x}px ${mousePosition.y}px, rgb(111, 203, 113), transparent 6px)
//           `,
//           opacity: 0.8,
//           WebkitMaskImage: `
//             linear-gradient(to bottom, 
//               rgba(0,0,0,1) 0%,
//               rgba(0,0,0,0.7) 20%,
//               rgba(0,0,0,0.4) 40%,
//               rgba(0,0,0,0.2) 60%,
//               rgba(0,0,0,0.1) 80%,
//               rgba(0,0,0,0) 100%
//             ),
//             radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
//           `,
//           maskImage: `
//             linear-gradient(to bottom, 
//               rgba(0,0,0,1) 0%,
//               rgba(0,0,0,0.7) 20%,
//               rgba(0,0,0,0.4) 40%,
//               rgba(0,0,0,0.2) 60%,
//               rgba(0,0,0,0.1) 80%,
//               rgba(0,0,0,0) 100%
//             ),
//             radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
//           `
//         }}
//       />

//       {/* Main Container */}
//       <motion.div 
//         className="relative mx-auto max-w-[1920px] flex flex-col items-center px-4 md:px-8 lg:px-[324px] gap-[29px]"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {/* Rest of the component content remains the same */}
//         <div className="w-full max-w-[280px] h-[45px] flex flex-row justify-center items-center p-[20px_24px] gap-[12px] rounded-full border-2 border-[#6FCB71]">
//           <motion.div 
//             className="flex justify-center items-center gap-[8px]"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <span className={`text-[20px] leading-[24px] font-normal text-[#FAFAFA] text-center capitalize ${familjenGrotesk.className}`}>
//               ✨ Introducing Toly AI
//             </span>
//           </motion.div>
//         </div>

//         <div className="w-full max-w-[944px] flex flex-col items-center gap-[10px] text-center px-4">
//           <motion.h1 
//             className={`w-full max-w-[944px] font-bold text-4xl md:text-[52px] leading-tight md:leading-[63px] tracking-[-0.02em] text-[#FAFAFA] capitalize ${inter.className} whitespace-normal`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             The <span className="text-[#6FCB71]">Intelligent Meme-Based</span> AI Agent
//           </motion.h1>
          
//           <motion.p 
//             className={`w-full max-w-[820px] font-normal text-base md:text-[18px] leading-[160%] text-[#9097A6] mt-6 ${familjenGrotesk.className}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//           >
//             Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
//           </motion.p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 mt-12 w-full max-w-[634px] justify-center">
//           <motion.div 
//             className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
//               <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${familjenGrotesk.className}`}>
//                 RESEARCH
//               </span>
//             </div>
//           </motion.div>

//           <motion.div 
//             className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
//               <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${familjenGrotesk.className}`}>
//                 INSIGHTS
//               </span>
//             </div>
//           </motion.div>

//           <motion.div 
//             className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
//               <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${familjenGrotesk.className}`}>
//                 ANALYSIS
//               </span>
//             </div>
//           </motion.div>
//         </div>

//         <div className="mt-8">
//           <LoginButton />
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;

"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';
import { Inter } from 'next/font/google';
import { LoginButton } from '@/components/Auth/LoginModal';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

interface MousePosition {
  x: number;
  y: number;
}

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      className="relative min-h-screen w-full overflow-x-hidden bg-black pt-32"
      onMouseMove={handleMouseMove}
    >
      {/* Base Grid Pattern - Updated with larger grid */}
      <div 
        className="absolute inset-0 h-[40vh]"
        style={{
          background: `
            linear-gradient(90deg, transparent 49.5%, rgba(111, 203, 113, 0.9) 49.5%, rgba(111, 203, 113, 0.9) 50.5%, transparent 50.5%),
            linear-gradient(0deg, transparent 49.5%, rgba(111, 203, 113, 0.9) 49.5%, rgba(111, 203, 113, 0.9) 50.5%, transparent 50.5%)
          `,
          backgroundSize: '200px 200px', // Increased from 100px to 200px
          WebkitMaskImage: `
            linear-gradient(to bottom, 
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.7) 15%,
              rgba(0,0,0,0.4) 25%,
              rgba(0,0,0,0) 40%
            ),
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
          `,
          maskImage: `
            linear-gradient(to bottom, 
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.7) 15%,
              rgba(0,0,0,0.4) 25%,
              rgba(0,0,0,0) 40%
            ),
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
          `,
          opacity: 0.4
        }}
      />
      
      {/* Hover Effect Layer - Updated with larger radius */}
      <div 
        className="absolute inset-0 pointer-events-none h-[40vh]"
        style={{
          background: `
            radial-gradient(circle 8px at ${mousePosition.x}px ${mousePosition.y}px, rgb(111, 203, 113), transparent 12px)
          `, // Increased circle size
          opacity: 0.8,
          WebkitMaskImage: `
            linear-gradient(to bottom, 
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.7) 15%,
              rgba(0,0,0,0.4) 25%,
              rgba(0,0,0,0) 40%
            ),
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
          `,
          maskImage: `
            linear-gradient(to bottom, 
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.7) 15%,
              rgba(0,0,0,0.4) 25%,
              rgba(0,0,0,0) 40%
            ),
            radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)
          `
        }}
      />

      {/* Main Container */}
      <motion.div 
        className="relative mx-auto max-w-[1920px] flex flex-col items-center px-4 md:px-8 lg:px-[324px] gap-[29px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full max-w-[280px] h-[45px] flex flex-row justify-center items-center p-[20px_24px] gap-[12px] rounded-full border-2 border-[#6FCB71]">
          <motion.div 
            className="flex justify-center items-center gap-[8px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className={`text-[20px] leading-[24px] font-normal text-[#FAFAFA] text-center capitalize ${spaceGrotesk.className}`}>
              ✨ Introducing Toly AI
            </span>
          </motion.div>
        </div>

        <div className="w-full max-w-[944px] flex flex-col items-center gap-[10px] text-center px-4">
          <motion.h1 
            className={`w-full max-w-[944px] font-bold text-4xl md:text-[52px] leading-tight md:leading-[63px] tracking-[-0.02em] text-[#FAFAFA] capitalize ${inter.className} whitespace-normal`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The <span className="text-[#6FCB71]">Intelligent Meme-Based</span> AI Agent
          </motion.h1>
          
          <motion.p 
            className={`w-full max-w-[820px] font-normal text-base md:text-[18px] leading-[160%] text-[#9097A6] mt-6 ${spaceGrotesk.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-12 w-full max-w-[634px] justify-center">
          <motion.div 
            className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                RESEARCH
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                INSIGHTS
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-[189.66px] h-[55px] p-[2px] rounded-[24px] bg-gradient-to-r from-[#73B0D0] via-[#C44FE2] to-[#47F8C3]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black rounded-[22px] flex justify-center items-center">
              <span className={`font-bold text-[24px] leading-[30px] text-center text-[#FAFAFA] capitalize ${spaceGrotesk.className}`}>
                ANALYSIS
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-8">
          <LoginButton />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;