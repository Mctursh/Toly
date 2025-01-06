"use client"
import HeroSection from '@/components/Landing/Hero';
import Navbar from '@/components/Navbar';
import FeaturesSection from '@/components/Landing/Features';
import GetStartedSection from '@/components/Landing/GetStarted';

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GetStartedSection />

    </main>
  );
}