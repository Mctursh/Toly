"use client"
import Footer from '@/components/Landing/Footer';
import Navbar from '@/components/Navbar';
import AdminDashboard from './Dashboard';
import { Familjen_Grotesk } from 'next/font/google';

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] });

const AdminDashboardPage = () => {
    return (
      <main className={`relative min-h-screen bg-black overflow-x-hidden ${familjenGrotesk.className}`}>
        {/* Fixed navbar always on top */}
        <Navbar />
        <AdminDashboard />
        {/* Footer */}
        <footer>
          <div>
            <Footer />
          </div>
        </footer>
      </main>
    );
  };
  
  export default AdminDashboardPage;