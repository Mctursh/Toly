// components/WalletPanel.tsx
  "use client";
  
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PortfolioResponse } from '@/types/portfolio';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { LoadingOrNotFound } from './LoadingOrNotFound';
import TokenItem from './TokenItem';
import { ChatContext, useChatContext } from '../Context/ChatProvider';
import { ChatView } from '@/types/chat';
import { copyToClipboard, ellipsify } from '@/utils';
import { FaCopy } from 'react-icons/fa';
import { useApi } from '@/hooks/useHttp';

type WalletPanel = {
  walletAddress: string
  inAppwallet?: string
  setCurrentView: (value: ChatView) => void
}
  
const WalletPanel = ({ 
  walletAddress,
  setCurrentView,
  inAppwallet,
}: WalletPanel) => {
    const { get } = useApi()
    const primaryWallet = inAppwallet || ''
    const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4600';
  
    const fetchPortfolio = useCallback(async () => {
      try {
        
        setLoading(true);
        setError(null);
  
        const walletAddress = primaryWallet
        // const walletAddress = '3wRBJjPEmdk4b2NBEojeMKyuUCKLspKyViYUQMwJUsqt';
        
        // const url = `${API_URL}/das/portfolio/${walletAddress}?detailed=true&network=devnet`;
        // const url = `${API_URL}/das/portfolio/${walletAddress}?detailed=true&network=mainnet`;
        const url = `${API_URL}/das/portfolio?detailed=true&network=mainnet`;
        // const url = `${API_URL}/das/spl-portfolio/${walletAddress}?detailed=true&network=devnet`;
     

        // Most like going to be a cjors issue so add credential to server with apikey infact for all the endpoints
        // const response = await fetch(url, {
        const response = await get(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        
        
        // if (!response.ok) {
        //   const errorText = await response.text();
        //   console.error('Error response:', errorText);
        //   throw new Error(`Failed to fetch portfolio: ${response.status} - ${errorText}`);
        // }
  
        const data = await response?.data;
        console.log(data);

        
        if(data?.success === false){
          setError(null)
          setLoading(false)
          setPortfolio(null)
        } else {
          setPortfolio(data);
        }
        

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch portfolio';
        console.error('Full error:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }, [API_URL, inAppwallet]); // Add API_URL as dependency
  
    useEffect(() => {
      // conditional should only call if primary wallet is available
      if(walletAddress){
        fetchPortfolio();
      }
    }, [fetchPortfolio, walletAddress]);

  
    return (
      <div className="w-[300px] bg-[#121417] h-full">
        <div className="p-4">
          {/* Header with Total Value */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Portfolio</h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${primaryWallet ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-[#9097A6]">
                  {primaryWallet ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>
            {portfolio && (
              <div className="bg-[#0B0C0F] p-4 rounded-lg border border-white/5">
                <p className="text-sm text-[#9097A6]">Total Value</p>
                <p className="text-xl font-bold">
                  ${portfolio?.totalValueUsd?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} USD
                </p>
                <p className="text-xs text-[#9097A6] mt-1">
                  {portfolio?.tokenPortfolio?.tokens?.length} Token{portfolio?.tokenPortfolio?.tokens?.length !== 1 ? 's' : ''}
                </p>
                  <button
                    onClick={() => copyToClipboard(inAppwallet || walletAddress)}
                    title='Copy address'
                    className='flex items-center justify-between text-xs text-[#9097A6] w-full mt-1'
                  >
                    <p className="text-xs text-[#9097A6]">{ellipsify(inAppwallet || walletAddress, 8)}</p>
                    <FaCopy className='text-gray-400' />
                  </button>
              </div>
            )}
          </div>
  
          {/* Error State */}
          {error && (
            <div className="p-3 mb-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
  
          {/* Loading State */}
          <LoadingOrNotFound loading={loading} text='Tokens not found' />
          {!loading && (
            <div className="space-y-4">
               {portfolio?.nativeBalance && (
                <TokenItem
                  token={{
                    type: 'native',
                    name: 'Solana',
                    symbol: 'SOL',
                    image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', // Hard coded das should return the png -server bug
                    ...portfolio?.nativeBalance
                  }}
                />
              )}


               {portfolio?.tokenPortfolio?.tokens.map((token, index) => (
                <TokenItem key={index} token={{type: 'token', ...token}}/>
                ))}
            </div>
          )}

          {!error && !loading && !portfolio && (
          // {!error && !loading && !portfolio && walletAddress && (
            <div className="flex flex-col gap-y-4">
            {/* <div className="p-3 mb-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm"> */}
              <p className='text-sm text-center' >Your in app wallet hasn’t been activated, please generate one now</p>
              <button
                type='button'
                role='link'
                className='rounded-lg text-base bg-[#6FCB71] p-3 text-white'
                onClick={() => setCurrentView("settings")}
              > 
                Generate wallet
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default WalletPanel;