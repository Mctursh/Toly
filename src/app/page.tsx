"use client"
import HeroSection from '@/components/Landing/Hero';
import Navbar from '@/components/Navbar';
import GetStartedSection from '@/components/Landing/GetStarted';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <GetStartedSection />

    </main>
  );
}