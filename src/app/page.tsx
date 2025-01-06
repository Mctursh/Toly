"use client"
import HeroSection from '@/components/Landing/Hero';
import Navbar from '@/components/Navbar';
import FeaturesSection from '@/components/Landing/Features'


export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}