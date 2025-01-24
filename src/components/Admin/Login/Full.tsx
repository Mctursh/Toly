"use client"
import Footer from '@/components/Landing/Footer';
import Navbar from '@/components/Navbar';
import AdminLogin from './Login';
import { Familjen_Grotesk } from 'next/font/google';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

const AdminLoginPage = () => {
    return (
      <main className={`relative min-h-screen bg-black overflow-x-hidden ${familjenGrotesk.className}`}>
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