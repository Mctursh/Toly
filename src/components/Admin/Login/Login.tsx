// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const { login } = useAdmin();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(credentials.username, credentials.password);
      // Redirect handled in useAdmin
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md bg-gray-900 rounded-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-2xl text-white font-bold mb-6 ${spaceGrotesk.className}`}>
          Admin Access
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({
                ...prev,
                username: e.target.value
              }))}
              className="w-full p-3 bg-black border border-gray-700 rounded"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({
                ...prev,
                password: e.target.value
              }))}
              className="w-full p-3 bg-black border border-gray-700 rounded"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#6FCB71] text-black rounded-full font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Verifying...' : 'Access Admin Panel'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}