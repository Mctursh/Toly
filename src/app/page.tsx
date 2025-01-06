"use client"
import HeroSection from '@/components/Landing/Hero';
import Navbar from '@/components/Navbar';
import FeaturesSection from '@/components/Landing/Features';
import DemoChatComponent from '@/components/Landing/DemoChat';
import GetStartedSection from '@/components/Landing/GetStarted';
import Footer from '@/components/Landing/Footer';

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoChatComponent />
      <GetStartedSection />
      <Footer />
    </main>
  );
}