"use client"
import React from 'react';
import Navbar from '../Navbar';
import HeroSection from './Hero';
import FeatureSection from './Features';
import SecondFeatureSection from './FeaturesTwo';
import GetStartedSection from './GetStarted';
import Footer from './Footer';
import { Familjen_Grotesk } from 'next/font/google';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

const HomePage = () => {
  return (
    <main className={`relative min-h-screen bg-black overflow-x-hidden ${familjenGrotesk.className}`}>
      {/* Fixed navbar always on top */}
      <Navbar />

      {/* Content wrapper with proper spacing */}
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen pt-28">
          <HeroSection />
        </section>

        {/* Feature Sections */}
        <section className="relative w-full px-4 lg:px-0">
          <div className="max-w-[1280px] mx-auto">
            <FeatureSection />
          </div>
        </section>

        <section className="relative w-full px-4 lg:px-0">
          <div className="max-w-[1280px] mx-auto">
            <SecondFeatureSection />
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

export default HomePage;