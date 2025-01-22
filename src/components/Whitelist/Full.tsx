"use client"
import Footer from '../Landing/Footer';
import Navbar from '../Navbar';
import WhitelistSection from './Whitelist';
import { Familjen_Grotesk } from 'next/font/google';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

const WhitelistPage = () => {
    return (
      <main className={`relative min-h-screen bg-black overflow-x-hidden ${familjenGrotesk.className}`}>
        {/* Fixed navbar always on top */}
        <Navbar />
        <WhitelistSection />
        {/* Footer */}
        <footer>
          <div>
            <Footer />
          </div>
        </footer>
      </main>
    );
  };
  
  export default WhitelistPage;