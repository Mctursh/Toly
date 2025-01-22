"use client"
import React from 'react';
import { Familjen_Grotesk, Inter, Manrope } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const manrope = Manrope({ subsets: ['latin'] });

const ContactSection = () => {
  return (
    <section className={`${familjenGrotesk.className} relative w-full min-h-screen py-32`}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[60px] xl:gap-[80px]">
          {/* Left Section - Form */}
          <div className="flex flex-col items-start gap-8 md:gap-[40px] w-full lg:w-1/2">
            {/* Header */}
            <div className="flex flex-col items-start gap-6 md:gap-8 w-full">
              {/* Contact Button */}
              <div className="flex justify-center items-center h-[50px] md:h-[64px] border border-[#00EE05] rounded-[50px] px-6">
                <span className="font-medium text-base md:text-[18px] leading-[150%] uppercase text-[#00EE05]">
                  contact us
                </span>
              </div>

              {/* Title and Description */}
              <div className="flex flex-col gap-4 md:gap-6 w-full">
                <h2 className={`${inter.className} text-3xl md:text-[42px] lg:text-[52px] font-bold leading-tight md:leading-[1.2] tracking-[-0.02em] text-[#FAFAFA] capitalize`}>
                  Hi! Can we help you?
                </h2>
                <p className="text-base md:text-lg text-[#9097A6] leading-relaxed">
                  Our team will get back to you within 24 hours.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Inputs */}
              <div className={`${manrope.className} w-full space-y-4 md:space-y-6`}>
                <input 
                  type="text" 
                  placeholder="NAME"
                  className="w-full h-[60px] md:h-[76px] bg-transparent border-2 border-[#292929] rounded-[50px] px-6 text-base md:text-lg tracking-[0.02em] uppercase text-white placeholder-white/60 focus:outline-none focus:border-[#00EE05] transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS"
                  className="w-full h-[60px] md:h-[76px] bg-transparent border-2 border-[#292929] rounded-[50px] px-6 text-base md:text-lg tracking-[0.02em] uppercase text-white placeholder-white/60 focus:outline-none focus:border-[#00EE05] transition-colors"
                />
                <textarea 
                  placeholder="TYPE YOUR MESSAGE"
                  className="w-full h-[160px] md:h-[203px] bg-transparent border-2 border-[#292929] rounded-[50px] p-6 text-base md:text-lg tracking-[0.02em] uppercase text-white placeholder-white/60 focus:outline-none focus:border-[#00EE05] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button className="flex justify-center items-center h-[50px] md:h-[64px] px-8 bg-[#6FCB71] rounded-[50px] hover:bg-[#5FB761] transition-colors">
                <span className="font-medium text-base md:text-lg uppercase text-[#0B0C0F]">
                  SEND MESSAGE
                </span>
              </button>
            </div>
          </div>

          {/* Right Section - Image and Links */}
          <div className="flex flex-col items-start gap-8 md:gap-[50px] w-full lg:w-1/2">
            {/* Image */}
            <div className="relative w-full aspect-square md:aspect-[1.2] rounded-[500px] overflow-hidden">
              <Image
                src="/logo.png"
                alt="Contact Image"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 gap-8 md:gap-[50px] w-full">
              {/* Find Us Links */}
              <div className="flex flex-col gap-4 md:gap-6">
                <h3 className={`${inter.className} text-xl md:text-[30px] font-bold leading-tight tracking-[-0.02em] text-[#FAFAFA] capitalize`}>
                  Find Us
                </h3>
                {['Dexscreener', 'Dextool', 'Github', 'Gitbook'].map((item) => (
                  <Link 
                    key={item}
                    href="#" 
                    className="text-base md:text-lg text-[#9097A6] hover:text-[#FAFAFA] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Socials Links */}
              <div className="flex flex-col gap-4 md:gap-6">
                <h3 className={`${inter.className} text-xl md:text-[30px] font-bold leading-tight tracking-[-0.02em] text-[#FAFAFA] capitalize`}>
                  Socials
                </h3>
                {['Twitter', 'Telegram', 'Discord'].map((item) => (
                  <Link 
                    key={item}
                    href="#" 
                    className="text-base md:text-lg text-[#9097A6] hover:text-[#FAFAFA] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;