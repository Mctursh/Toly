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
    'AjUQRmTe1QYubbnMvW9kXiP4XpCVRPzB89ZooFAs4FW2',
    "2qiTSSrtLUmm5nviDx25kKyoF78M4vVPkLhs6B8whyNk",
    "HCn9cfDrsH1YH9x14ea9jaGt85C2U7nqoGC2Rt6E63Kb",
    "HCn9cfDrsH1YH9x14ea9jaGt85C2U7nqoGC2Rt6E63Kb",
    "91koqUb4y2kDQ8UmTqzJA8JfwZHgEa6beabLnMxJrJxf",
    "AUhWpg5PSPRpjC2UP1n4dsh9iwseh4o24fan87KPBYMc",
    "BsmRrAN5wxYsipcPmuYpvjjntdNsDuQxDPSxN5vFfjFc",
    "HArR5FqqJmY9epvxUohm5dsGRYFYGFhpuVPpJxnPKAec",
    "7swPMfwXw32UnJr8f2Wj7ji6hQAUmXV1JJQsKQa4razG",
    "9aKgTYx5K2k8921dnsU3NpjmHPmPSLWwhZf4Y7TTVZya",
    "3EFDyEgWrodacrCF5g8KfXWFrHgmeQn7rXq2sTnh3U6n",
    "ATTCPxbJxTaN3PTVL6xQvBARGRmyGKGKHnhA4Ko5mh8y",
    "8hnxiLmJAqiZARUqgk7uakLhMSGLJrgW1TY7Fy3ubFVR",
    "8H7cLCiw6tgVSddLWEQqang48e87PuXy8CyWuiJjgPr",
    "BQSrecL6Dgxhk7fiV6A1gqeciywHrfAodmqB16fT7UNK",
    "FqN1z25HKvQ7rF4BNvf1YxaH4xJRSAsfnryJiMyJURbZ",
    "JakevMAR7R4Evr4PZpTqNAb1KkVXAskzYohd1vxEUqj",
    "9zo7iaZ5hSpNLAoPygDNfbibbCK3Wpjqz4BbDEddYY1w",
    "FszW2C2JZxykpT43pm71h4yvmUWoxoF2Y4LJc28MN5PV",
    "GExDBALhPupU97CLbAyURn9NZFueBdLki7aec5NDGUYw",
    "FFBhFZPnitLHuLBAWQPEhinHsUzBucSEA2YiwnQkU7wd",
    "FGTYxDncXGEsW3Hvwy3fxRqBePW7bkNxntW2mfz22ptv",
    "Gfb8dEgdigz531fmjA82XpQH6PnHoKcEokkhwobmDj6a",
    "BE6AgdaazzxRhB4Yhc2VXX2ik9nsR3gupAhqxGGGUEP6",
    "HCn9cfDrsH1YH9x14ea9jaGt85C2U7nqoGC2Rt6E63Kb",
    "HvyjMSMwA2fEvQN9QNk8XqKVN4m3uHMA9n5MBVycFQLR",
    "6pSLVbweU4gPZHqUKg43tghdZovuUMkq9Rd67mZKYH66",
    "3EunnJvAM4n8ipyAw9QJKG6SSMLQUHbT2Wd8QYWJumMw",
    "69Fkwez3TZg95KW5sGmN9YZKT7axUm1Cj8334ZkFrmeE",
    "3u54qKYCb2zGZgL6Zm6Ahw7F7gMvnpVhBSNY6cGPHoW5",
    "A3NxvdHpTd65phqr6vHefLbdmogpt7HDrNmm5w9uedAo",
    "BuvBJhVW78pR4EyGBQxngGRJxiMXWsjUx1z4EzvKsC1g",
    "7NBQhh12bDrVr3L7AFRFPNSTepMHMbdRHbtBh41h7SYv",
    "CxyWRrcRRWce54Ao5mjKfUrfT8HpPgepsgiv7y5bfhJb",
    "FQQ3ruJkFSP2Q1mj1ReJzAiTKxmaWT7wXwuiRxu4RGmd",
    "2qF65vSXThVcGu6952urPjETBEMFSm8QBNsD8eNAupLP",
    "Au81ovbXoJFDJmdGhjdtJLnifk71exiFmT4ELq9daZWJ",
    "8JMXV7JsQzUtmwPyz7TaHEEyZBsody7KsihVYoC5bvjS",
    "HeNrJb29WXpQdXxcr2boJxyUa6Bo9Y1e6yFEsxxyXtuS",
    "8jSPfbduUipWoYeXqj2E3hPrXisQbjYqD5ZxdtLFXHqR",
    "FwZWrzn2eLEHwUuK1trzvnwSXrzLyi4WWGKAovmiQDky",
    "HB6GHqRjwi3FvEcnFeD26srGzM5rN4GegFCSc5ZCEGdk",
    "Awg95wkr7rEnJNLnidkUNF6ixUK18DrFsN3q6oXGcYXa",
    "79ynJAUr481DjXbiiazGjHKuDsFkPE4m2fmHceaCrKSe",
    "2XiSUn5zqqrVzzaTWvV7UPQ1H6MrKrfo1Y3ojNFejLBw",
    "8Luc6CfBXDwni85ZZhKPuSib9mDDX5V1sHaXXbEbo8zN",
    "H8hsiH5wSpnadRNLGMpS5bFFKVePSNBE3mM2w5GPtDYA",
    "98Y4NJ69g9a41yPFZ2TiBN6rNnZ5HC9usNr8kVARTuuD",
    "BLYsEu6yi9goGLJHsUg5HajU7NkXMyqt2b76bf3Cw1LH",
    "79ynJAUr481DjXbiiazGjHKuDsFkPE4m2fmHceaCrKSe",
    "24ErVMTPmHoiwaef2UmQa8KLbhp6jfNx23UxDDFqcJ2C",
    "ATnrE9atLWjmWKzkYK1UCREANKDMSbAgUbc8MekUmqfN",
    "ATnrE9atLWjmWKzkYK1UCREANKDMSbAgUbc8MekUmqfN",
    "4Xgj3NfgE3Dw1gnhiV8sMnBP8xHAJUEhmPuReVHMZsu1",
    "nyiKqHFJEyrZTWMoCQ4FcUKsV4DMqFMPwcSnTt2dxCe",
    "BqRtYdaM896r66q3tTRdWNqNcPCJ66v5fwKfpwJCTLju",
    "AcS2wTc7XUMTnJkAbednF3m44QBGfenJbiBPYB6QwQMn",
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