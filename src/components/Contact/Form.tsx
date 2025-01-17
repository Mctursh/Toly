"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Space_Grotesk, Inter, Manrope } from 'next/font/google';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const manrope = Manrope({ subsets: ['latin'] });

const ContactSection = () => {
  return (
    <section className={`${spaceGrotesk.className} relative`}>
      <div className="absolute w-[1356px] h-[893px] left-[calc(50%-1356px/2)] top-[213px] flex flex-row items-start gap-[132px]">
        {/* Left Section - Form */}
        <div className="flex flex-col items-start gap-[50px] w-[612px]">
          {/* Header */}
          <div className="flex flex-col items-start gap-[40px] w-full">
            {/* Contact Button */}
            <div className="flex flex-row justify-center items-center w-[151px] h-[64px] border border-[#00EE05] rounded-[50px] px-6 py-3">
              <span className="font-medium text-[18px] leading-[150%] uppercase text-[#00EE05]">
                contact us
              </span>
            </div>

            {/* Title and Description */}
            <div className="flex flex-col justify-center items-start gap-6 w-full">
              <h2 className={`${inter.className} w-full text-[52px] font-bold leading-[63px] tracking-[-0.02em] text-[#FAFAFA] capitalize`}>
                Hi! Can we help you?
              </h2>
              <p className="text-[18px] leading-[160%] text-[#9097A6]">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col items-start gap-[30px] w-full">
            {/* Name Input */}
            <div className={`${manrope.className} flex flex-row items-center w-full h-[76px] border-2 border-[#292929] rounded-[50px] px-[30px] py-[10px]`}>
              <input 
                type="text" 
                placeholder="NAME"
                className="w-full bg-transparent text-[18px] leading-[25px] tracking-[0.02em] uppercase text-white placeholder-white focus:outline-none"
              />
            </div>

            {/* Email Input */}
            <div className={`${manrope.className} flex flex-row items-center w-full h-[76px] border-2 border-[#292929] rounded-[50px] px-[30px] py-[10px]`}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent text-[18px] leading-[25px] tracking-[0.02em] uppercase text-white placeholder-white focus:outline-none"
              />
            </div>

            {/* Message Input */}
            <div className={`${manrope.className} flex flex-row items-start w-full h-[203px] border-2 border-[#292929] rounded-[50px] p-[30px]`}>
              <textarea 
                placeholder="TYPE YOUR MESSAGE"
                className="w-full h-full bg-transparent text-[18px] leading-[25px] tracking-[0.02em] uppercase text-white placeholder-white focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button className="flex flex-row justify-center items-center w-[235px] h-[64px] bg-[#6FCB71] border border-[rgba(111,203,113,0.2)] rounded-[50px] px-6 py-3">
              <span className="font-medium text-[18px] leading-[150%] uppercase text-[#0B0C0F]">
                SEND MESSAGE
              </span>
            </button>
          </div>
        </div>

        {/* Right Section - Image and Links */}
        <div className="flex flex-col items-start gap-[50px] w-[612px]">
          {/* Image */}
          <div className="w-[612px] h-[592px] rounded-[500px] overflow-hidden">
            <Image
              src="/logo.png"
              alt="Contact Image"
              width={612}
              height={592}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Links Section */}
          <div className="flex flex-row items-start gap-[100px] w-full">
            {/* Find Us Links */}
            <div className="flex flex-col justify-center items-start gap-6 flex-1">
              <h3 className={`${inter.className} text-[30px] font-bold leading-[130%] tracking-[-0.02em] text-[#FAFAFA] capitalize`}>
                Find Us
              </h3>
              {['Dexscreener', 'Dextool', 'Github', 'Gitbook'].map((item, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  className="w-full text-[18px] leading-[160%] text-[#9097A6] hover:text-[#FAFAFA] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Socials Links */}
            <div className="flex flex-col justify-center items-start gap-6 flex-1">
              <h3 className={`${inter.className} text-[30px] font-bold leading-[130%] tracking-[-0.02em] text-[#FAFAFA] capitalize`}>
                Socials
              </h3>
              {['Twitter', 'Telegram', 'Discord'].map((item, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  className="w-full text-[18px] leading-[160%] text-[#9097A6] hover:text-[#FAFAFA] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;