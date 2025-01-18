"use client"
import Footer from '../Landing/Footer';
import Navbar from '../Navbar';
import AboutSection from './About';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const AboutPage = () => {
    return (
      <main className={`relative min-h-screen bg-black overflow-x-hidden ${spaceGrotesk.className}`}>
        {/* Fixed navbar always on top */}
        <Navbar />
        <AboutSection />
        {/* Footer */}
        <footer>
          <div>
            <Footer />
          </div>
        </footer>
      </main>
    );
  };
  
  export default AboutPage;