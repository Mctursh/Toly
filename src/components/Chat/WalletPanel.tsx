// components/WalletPanel.tsx
  "use client";
  
  import React, { FC, useEffect, useState } from 'react';
  import { usePrivy } from '@privy-io/react-auth';
  import { PortfolioResponse } from '@/types/portfolio';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
  
  const WalletPanel: FC = () => {
    const { user, primaryWallet } = useDynamicContext();
    const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4600';
  
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // const token = await getAccessToken();
        const walletAddress = primaryWallet?.address
  
        if (!walletAddress) {
          throw new Error('No wallet address found');
        }
  
        const response = await fetch(
          `${API_URL}/das/spl-portfolio/${walletAddress}?detailed=true&network=devnet`,
          {
            headers: {
              // 'Authorization': `Bearer ${token}`
            }
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }
  
        const data: PortfolioResponse = await response.json();
        setPortfolio(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch portfolio');
        console.error('Portfolio fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (primaryWallet?.address) {
        fetchPortfolio();
      }
    }, [primaryWallet?.address]);
  
    return (
      <div className="w-[300px] bg-[#121417] h-full border-r border-white/5">
        <div className="p-4">
          {/* Header with Total Value */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Portfolio</h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${primaryWallet?.address ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-[#9097A6]">
                  {primaryWallet?.address ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>
            {portfolio && (
              <div className="bg-[#0B0C0F] p-4 rounded-lg border border-white/5">
                <p className="text-sm text-[#9097A6]">Total Value</p>
                <p className="text-xl font-bold">
                  {portfolio.summary.totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} {portfolio.summary.primaryCurrency}
                </p>
                <p className="text-xs text-[#9097A6] mt-1">
                  {portfolio.summary.tokenCount} Token{portfolio.summary.tokenCount !== 1 ? 's' : ''}
                </p>
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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6FCB71]" />
            </div>
          ) : (
            <div className="space-y-4">
              {portfolio?.detail.tokens.map((token, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#0B0C0F] rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <img 
                        src={token.image}
                        alt={token.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-token.png';
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{token.name}</p>
                        <span className="text-xs text-[#9097A6]">{token.symbol}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#9097A6]">
                        <span>{token.balance} tokens</span>
                        <span>•</span>
                        <span>{token.percentOfPortfolio}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {token.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })} {token.currency}
                    </p>
                    <p className="text-xs text-[#9097A6]">
                      ${token.pricePerToken.toLocaleString(undefined, {
                        minimumFractionDigits: 6,
                        maximumFractionDigits: 6
                      })} / token
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default WalletPanel;