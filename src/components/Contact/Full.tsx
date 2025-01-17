"use client"
import Footer from '../Landing/Footer';
import Navbar from '../Navbar';
import ContactSection from './Form';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const ContactPage = () => {
    return (
      <main className={`relative min-h-screen bg-black overflow-x-hidden ${spaceGrotesk.className}`}>
        {/* Fixed navbar always on top */}
        <Navbar />
        <ContactSection />
        {/* Footer */}
        <footer>
          <div>
            <Footer />
          </div>
        </footer>
      </main>
    );
  };
  
  export default ContactPage;