"use client"
import HeroSection from '@/components/Landing/Hero';
import Navbar from '@/components/Navbar';
import FeaturesSection from '@/components/Landing/Features';
import SecondFeaturesSection from '@/components/Landing/FeaturesTwo';
import GetStartedSection from '@/components/Landing/GetStarted';
import Footer from '@/components/Landing/Footer';

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SecondFeaturesSection />
      <GetStartedSection />
      <Footer />
    </main>
  );
}