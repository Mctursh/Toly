"use client"
import React from 'react';
import Navbar from '../Navbar';
import GetStartedSection from '../Landing/GetStarted';
import Footer from '../Landing/Footer';
import { Familjen_Grotesk } from 'next/font/google';
import CatolyHero from './CatolyHero';
import RightContentSection from './RightContentSection';
import TwoColumnSection from './TwoColumnSection';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

const CatolyPage = () => {
  return (
    <main className={`relative min-h-screen bg-black overflow-x-hidden ${familjenGrotesk.className}`}>
      {/* Fixed navbar always on top */}
      <Navbar />

      {/* Content wrapper with proper spacing */}
      <div className="flex flex-col w-full">
        {/* First Section */}
        <section className="relative w-full min-h-screen">
            <CatolyHero />
        </section>

        {/* Second Section */}
        <section className="relative w-full">
            <RightContentSection />
        </section>

        {/* Third Section */}
        <section className="relative w-full">
            <TwoColumnSection />
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