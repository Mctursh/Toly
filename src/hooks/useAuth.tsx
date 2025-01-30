// components/auth/useAuth.tsx
import { loginPayload } from '@/types';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

// interface AuthError {
//   message: string;
//   code?: string;
// }

export function useAuth() {
  // const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  const whitelListedWallets = [
    'AzipGrfrpyS4oG31QCVyT8mAGUAg1Ws8fGo1wKeKZP9g',
    'BTzRTPtDkXPwffV2VrEpzPGovume5CdjdMGeGRXCwRai',
    '7k1hp2z16crbY92zqFCjsPd4MvmaUeqebErxK6PgXVvd',
    'DP4xV5qxSZQB82t7Lfu7d2TxFNsT4R17LpkJXgKpxQ7n',
    'HvX1ccJnUkp5pstGQDD1MmZPTSgLpg8dG2gJcCEPgsLh',
    'WQNTYQNHD79G1u5AyMPn1mhkDRMiH2dcHLCeWZpBo5X',
    'GKyQZ4C3PNxKRQy5DT44Kr3KEUu5qG5PYMHhBz4rbz35',
    'qNbt4nua9dMm4vtVEX2KiVgiSLj2S87TVMR6nb69Kyu',
    '3wRBJjPEmdk4b2NBEojeMKyuUCKLspKyViYUQMwJUsqt',
    // 'AzK5xQSkRSJUMp67mt1J2pK4igBDk9ArWW9C5UZ22Zek',
    'FNbnCKGC4yDFb8kYM24yDLr4TDpzBViHTBnms2ymi4gY',
    '6g4Yue7hgCHbgGbjNhvhh6iGjrn29SN3aofsYMRroKt3',
    'AjUQRmTe1QYubbnMvW9kXiP4XpCVRPzB89ZooFAs4FW2'
  ]
  // const accessCode = "catoly"
  const accessCode = "catoly-ski-025"

  const login = useCallback(async (payload: loginPayload) => {
    try {
      const res = await fetch('/api/login', {
        body: JSON.stringify(payload),
        method: 'POST',
        credentials: 'include', // Ensures the httpOnly cookie is sent
      });

      return await res.json()
      
    } catch (error) {
      console.log('new Err', error);
      
      throw new Error('login failed')
    }
  }, []);

  async function validateSession() {
    const res = await fetch('/api/validate-session', {
      method: 'GET',
      credentials: 'include',
    });

    // console.log(res);
    return await res.json()
  }

  async function logOut() {
    const res = await fetch('/api/logout', {
      method: 'GET',
      credentials: 'include',
    });

    // console.log(res);
    return await res.json()
  }

  const isWhitelisted = (wallet: string) => {
    return whitelListedWallets.includes(wallet)
  }

  const validateAccessCode = (code: string): boolean => {
    return code?.toLocaleLowerCase() === accessCode
  }

  return {
    ready: true,
    isAuthenticated: false,
    isVerifying: false,
    user: {},
    login,
    logout: () => {},
    getToken: "ss",
    error: null,
    clearError: () => {},
    validateSession,
    logOut,
    isWhitelisted,
    validateAccessCode
  };
}