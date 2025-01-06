"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';
import Image from 'next/image';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  // GSAP animation would typically be used with useEffect for more complex animations, but here we use framer-motion for simplicity
  const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, rotate: [0, 5, -5, 0], transition: { duration: 0.5, ease: 'easeInOut' } }
  };

  const borderAnimation = {
    animate: {
      backgroundSize: ['0% 0%', '150% 150%'],
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: { duration: 5, repeat: Infinity, ease: 'linear' }
    }
  };

  return (
    <motion.div 
      className={`relative w-[387.33px] h-[371px] p-[40px_24px] flex flex-col items-center gap-6 rounded-[24px] ${spaceGrotesk.className}`}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      style={{
        background: 'linear-gradient(45deg, #61BDFF, #B3D9FF, #61BDFF)',
        backgroundSize: '200% 200%',
        backgroundClip: 'padding-box, border-box',
        border: '6px solid transparent',
        borderColor: '#61BDFF',
      }}
      animate={borderAnimation.animate}
    >
      <div className="w-[120px] h-[120px] rounded-[500px] overflow-hidden">
        <Image 
          src={imageUrl}
          alt={title}
          width={120}
          height={120}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center gap-2 w-[339.33px]">
        <h3 className="text-[#FAFAFA] text-[24px] leading-[30px] font-bold text-center capitalize">{title}</h3>
        <p className="text-[#9097A6] text-[18px] leading-[150%] text-center">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const cards = [
    { title: 'DYOR', description: 'Look into wallets, tokens and transactions for more detailed analysis', imageUrl: '/logo.png' },
    { title: 'RESEARCH ON THE LATEST', description: 'Ask questions, get real-time insights, and master the skills you need to thrive in the Solana ecosystem.', imageUrl: '/wen.png' },
    { title: 'ANALYTICS', description: 'Stay ahead of the market by getting detailed insights into top traders, volumes, tokens and strategies', imageUrl: '/dyor.png' },
  ];

  return (
    <div className="absolute w-[1210px] h-[371px] left-[calc(50%-1210px/2)] top-[1117px] flex flex-row items-start gap-[24px]">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default FeaturesSection;