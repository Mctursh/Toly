// app/whitelist/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function WhitelistSection() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { getToken, isAuthenticated } = useAuth();
  const router = useRouter();
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';


  useEffect(() => {
    checkWhitelistStatus();
  }, []);

  const checkWhitelistStatus = async () => {
    try {
      // const token = await getToken();
      const response = await fetch(`${API_URL}/whitelist/check-status`, {
        headers: {
          // 'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.isWhitelisted) {
        router.push('/chat');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Failed to check whitelist status:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // const token = await getToken();
      const response = await fetch(`${API_URL}/whitelist/validate-code`, {
        method: 'POST',
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        router.push('/chat');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid code');
      }
    } catch (error) {
      setError('Failed to validate code');
    }
  };

  if (isLoading) {
    return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Enter Access Code</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4"
            placeholder="Enter your access code"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#6FCB71] text-black font-bold py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}