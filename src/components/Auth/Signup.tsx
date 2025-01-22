"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Familjen_Grotesk } from 'next/font/google';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative w-full min-h-[150vh] bg-black overflow-x-hidden pb-20">
      <div className="relative max-w-[1920px] mx-auto">
        {/* Left Side Content */}
        <div className="absolute lg:left-[150px] left-8 right-8 lg:right-auto top-[260px] lg:w-[575px] flex flex-col gap-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl lg:text-[48px] leading-normal lg:leading-[60px] font-medium text-[#FAFAFA]  ${familjenGrotesk.className} capitalize z-10`}
          >
            Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`w-full lg:w-[561px] text-base lg:text-lg leading-[160%] text-[#9097A6]  ${familjenGrotesk.className}`}
          >
            Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
          </motion.p>

          {/* Bottom Image - Connection Point for Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#61BDFF]/20 rounded-full blur-lg" />
              <Image
                src="/wen.png"
                alt="Wen"
                width={100}
                height={100}
                className="relative z-10 rounded-full"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Form Section with Top Decorations */}
        <div className="absolute lg:right-[150px] left-8 right-8 lg:left-auto top-[750px] lg:top-[120px] lg:w-[480px]">
          {/* Top Decorations Container */}
          <div className="relative h-[116px] mb-8 hidden lg:block">
            {/* Diamond - Same size as image */}
            <div className="absolute left-72 top-16 w-[60px] h-[60px] bg-[#C44FE2] transform rotate-45" />
            {/* Top Image */}
            <div className="absolute left-[360px] top-10">
              <Image
                src="/dyor.png"
                alt="Top Wen Cat"
                width={100}
                height={100}
                className="relative z-10 rounded-full"
                priority
              />
            </div>
          </div>

          {/* Squiggly Line - Only visible on desktop */}
          <svg
            className="absolute left-[-700px] top-[-4px] z-0 hidden lg:block"
            width="1050"
            height="800"
            viewBox="0 0 983 744"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 600 C800 900 900 500 900 400 C900 300 300 200 900 150 C800 100 900 85 983 85"
              stroke="url(#squiggly-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="squiggly-gradient"
                x1="50"
                y1="500"
                x2="983"
                y2="85"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#61BDFF" />
                <stop offset="1" stopColor="#C44FE2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121417]/80 backdrop-blur-lg rounded-3xl p-6 relative z-10 mb-10"
          >
            <motion.form className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {['name', 'email', 'password'].map((field) => (
                  <motion.div 
                    key={field}
                    className="relative z-20"
                  >
                    <input
                      type={field === 'password' ? 'password' : 'text'}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={formData[field as keyof FormData]}
                      onChange={handleInputChange}
                      className={`w-full h-16 px-6 bg-black/40 rounded-2xl text-lg text-[#9097A6]  ${familjenGrotesk.className} outline-none focus:ring-2 focus:ring-[#61BDFF]/20`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                type="submit"
                className="flex justify-center items-center w-full h-16 bg-[#61BDFF] rounded-full mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`text-lg font-medium text-black capitalize  ${familjenGrotesk.className}`}>
                  Sign Me Up With Toly
                </span>
              </motion.button>

              <p className={`text-center text-[#9097A6]  ${familjenGrotesk.className} mt-4`}>
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-[#61BDFF]">
                  Sign In
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;