"use client"
import Footer from '@/components/Landing/Footer';
import Navbar from '@/components/Navbar';
import AdminLogin from './Login';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const AdminLoginPage = () => {
    return (
      <main className={`relative min-h-screen bg-black overflow-x-hidden ${spaceGrotesk.className}`}>
        {/* Fixed navbar always on top */}
        <Navbar />
        <AdminLogin />
        {/* Footer */}
        <footer>
          <div>
            <Footer />
          </div>
        </footer>
      </main>
    );
  };
  
  export default AdminLoginPage;