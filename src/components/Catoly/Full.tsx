"use client"
import React from 'react';
import Navbar from '../Navbar';
import GetStartedSection from '../Landing/GetStarted';
import Footer from '../Landing/Footer';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const CatolyPage = () => {
  return (
    <main className={`relative min-h-screen bg-black overflow-x-hidden ${spaceGrotesk.className}`}>
      {/* Fixed navbar always on top */}
      <Navbar />

      {/* Content wrapper with proper spacing */}
      <div className="flex flex-col w-full">
        {/* First Section */}
        <section className="relative w-full min-h-screen pt-20">

        </section>

        {/* Second Section */}
        <section className="relative w-full min-h-screen px-4 lg:px-0">
          <div className="max-w-[1280px] mx-auto">

          </div>
        </section>

        {/* Get Started Section */}
        <section className="relative w-full bg-[#121417] py-20 px-4 lg:px-0">
          <div className="max-w-[1280px] mx-auto">
            <GetStartedSection />
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div>
            <Footer />
          </div>
        </footer>
      </div>
    </main>
  );
};

export default CatolyPage;