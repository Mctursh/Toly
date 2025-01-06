"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const questionsLeft = [
    "Toly, what is proof of history?",
    "How does Solana handle scalability?",
  ];
  
  const questionsRight = [
    "What makes Solana's consensus unique?",
    "What can I build on Solana?",
  ];

const GetStartedSection: React.FC = () => {
  const [leftMessage, setLeftMessage] = useState('');
  const [rightMessage, setRightMessage] = useState('');
  const [typingIndexLeft, setTypingIndexLeft] = useState(0);
  const [typingIndexRight, setTypingIndexRight] = useState(0);

  useEffect(() => {
    const typeMessage = (setMessage: React.Dispatch<React.SetStateAction<string>>, setIndex: React.Dispatch<React.SetStateAction<number>>, message: string) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= message.length) {
          setMessage(message.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          // Reset typing after a delay
          setTimeout(() => {
            setIndex((oldIndex) => (oldIndex + 1) % questionsLeft.length); // Adjust for each side
            setMessage('');
          }, 3000);
        }
      }, 50);
      return interval;
    };

    const leftInterval = typeMessage(setLeftMessage, setTypingIndexLeft, questionsLeft[typingIndexLeft]);
    const rightInterval = typeMessage(setRightMessage, setTypingIndexRight, questionsRight[typingIndexRight]);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, [typingIndexLeft, typingIndexRight]);


  return (
    <div className={`relative w-[80%] mx-auto mt-24 h-[503px] rounded-lg bg-[#121417] ${spaceGrotesk.className}`}>
      {/* Title and Description */}
      <div className="absolute w-[693px] max-sm:w-[400px] h-[105px] left-1/2 top-[100px] -translate-x-1/2 flex flex-col justify-center items-center gap-2">
        <h2 className="w-full text-[#FAFAFA] max-sm:text-[24px] text-[30px] leading-[130%] font-bold text-center capitalize tracking-[-0.02em]">
          Let’s Get Started With Toly
        </h2>
        <p className="w-[593px] text-[#9097A6] max-sm:w-[393px] text-[18px] max-sm:text-[12px] leading-[160%] text-center">
          Embarking on an exciting journey: Discover the world of Solana by letting Toly unleash its true potential
        </p>
      </div>

      {/* Image */}
      <div className="absolute w-[280px] h-[280px] max-sm:w-[220px] max-sm:h-[220px] max-sm:top-[220px] left-1/2 max-sm:ml-[40px] top-[245px] -translate-x-1/2">
        <Image 
          src="/dyor.png"
          alt="Solana"
          className="object-cover rounded-[500px] w-[200px] h-[200px] max-sm:w-[120px] max-sm:h-[120px]"
        />
      </div>

      {/* Chat Messages */}
      <motion.div 
        className="absolute w-[300px] h-[80px] left-[260px] max-sm:w-[200px] max-sm:h-[40px] max-sm:left-[10px] max-sm:top-[230px] top-[262px] bg-[#0B0C0F] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[50px] flex items-center p-6 gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-white text-[14px] max-sm:text-[10px] leading-[150%] capitalize">{leftMessage}</span>
      </motion.div>

      <motion.div 
        className="absolute w-[300px] h-[80px] left-[650px] max-sm:w-[200px] max-sm:h-[40px] max-sm:left-[200px] max-sm:top-[275px] top-[313px] bg-[#0B0C0F] rounded-tl-[50px] rounded-br-[50px] rounded-bl-[50px] flex items-center p-6 gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-white text-[14px] max-sm:[10px] leading-[150%] capitalize">{rightMessage}</span>
      </motion.div>
    </div>
  );
};

export default GetStartedSection;