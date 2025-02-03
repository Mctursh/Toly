import React, { useState } from 'react';

interface BaseOptions {
  // Add any base options here
}

interface TradeResponse {
  // Add expected response type here
}

interface TradeOptions extends BaseOptions {
  outputMint: string;
  inputAmount: number;
  inputMint?: string;
  slippageBps?: number;
}

interface TokenMeta {
  name: string;
  symbol: string;
}

interface Token {
  supply: number;
}

interface HolderSummary {
  holderSummary: {
    marketsByType: Record<string, any>;
    nonMarketHoldingPct: number;
  };
}

interface TokenLookupProps {
  data: {
    tokenMeta: TokenMeta;
    token: Token;
    image?: string;
    holderSummary: HolderSummary;
    totalMarketLiquidity: number;
    totalLPProviders: number;
    mintAuthority: string | null;
    freezeAuthority: string | null;
  };
}


const formatNumber = (num: number) => {
  if (!num) return '0';
  return new Intl.NumberFormat().format(num);
};

const formatPercentage = (num: number) => {
  if (!num) return '0';
  return num.toFixed(2);
};

//add type for props
const TokenLookup: React.FC<TokenLookupProps>  = ({ data }) => {
    const [showBuyInput, setShowBuyInput] = useState(false);
    const [showSellInput, setShowSellInput] = useState(false);
    const [buyAmount, setBuyAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
      mint,
      tokenMeta,
      token,
      image,
      holderSummary,
      totalMarketLiquidity,
      totalLPProviders,
      mintAuthority,
      freezeAuthority
    } = data;
  
    const handleBuyConfirm = async () => {
      if (!buyAmount) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/actions/trade/swap/tx`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: '24ErVMTPmHoiwaef2UmQa8KLbhp6jfNx23UxDDFqcJ2Cemail', // You'll need to get this from your auth system
            options: {
              outputMint: mint, // Assuming symbol is the mint address
              inputAmount: parseFloat(buyAmount),
              slippageBps: 100, // 1% slippage, adjust as needed
            } as TradeOptions
          })
        });
  
        if (!response.ok) {
          throw new Error('Swap request failed');
        }
  
        const result: TradeResponse = await response.json();
        console.log('Swap successful:', result);
        
        // Clear input and hide form
        setBuyAmount('');
        setShowBuyInput(false);
        
        // You might want to show a success message or update UI here
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process swap');
        console.error('Swap error:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSellConfirm = async () => {
      if (!sellAmount) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/actions/trade/swap/tx`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: 'FxmGwcJW4fQQboEETbYrfMGKebKdEyW1HXiMMShWXbCj', // You'll need to get this from your auth system
            options: {
              inputMint: mint, // Assuming symbol is the mint address
              outputMint: 'So11111111111111111111111111111111111111112',
              inputAmount: parseFloat(sellAmount),
              slippageBps: 100, // 1% slippage, adjust as needed
            } as TradeOptions
          })
        });
  
        if (!response.ok) {
          throw new Error('Swap request failed');
        }
  
        const result: TradeResponse = await response.json();
        console.log('Swap successful:', result);
        
        // Clear input and hide form
        setSellAmount('');
        setShowSellInput(false);
        
        // You might want to show a success message or update UI here
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process swap');
        console.error('Swap error:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="mt-2 p-3 bg-gray-800 text-gray-300 rounded-lg">
      <div className="flex flex-col gap-y-1">
        <div className="text-sm grid grid-cols-2 items-center">
          <div className="col-span-1 text-lg">
            Token Name: {tokenMeta?.name}
          </div>
          <div className="col-span-1 justify-self-end">
            {image && (
              <img
                className="w-16 h-16 rounded-md"
                src={image}
                alt={tokenMeta?.name}
              />
            )}
          </div>
        </div>
        
        <div>Symbol: ${tokenMeta?.symbol}</div>
        <div className="mt-2">Supply: {formatNumber(token?.supply)}</div>
        
        <div>
          {mintAuthority === null ? '✅' : '❌'} Mint Authority Renounced
        </div>
        <div>
          {freezeAuthority === null ? '✅' : '❌'} Freeze Authority Renounced
        </div>
        
        <div>Liquidity: {formatNumber(totalMarketLiquidity)}</div>
        <div>Total LPs: {totalLPProviders}</div>
        
        <div className="mt-2">
          Tradable on {Object.keys(holderSummary?.holderSummary?.marketsByType || {})
            .map(market => market.charAt(0).toUpperCase() + market.slice(1))
            .join(' and ')}
        </div>
        
        <div className="mt-2">
          Top 10 individual Holders: {formatPercentage(holderSummary?.holderSummary?.nonMarketHoldingPct)}%
        </div>

        <div className="mt-3 flex flex-col gap-2 w-full">
          <div>
            <button
              onClick={() => setShowBuyInput(!showBuyInput)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-sm w-full disabled:opacity-50"
              disabled={isLoading}
            >
              Buy {tokenMeta?.name}
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showBuyInput ? 'max-h-32 mt-2' : 'max-h-0'}`}>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="Enter amount to buy in $SOL..."
                    className="flex-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-0"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleBuyConfirm}
                    className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-sm disabled:opacity-50"
                    disabled={isLoading || !buyAmount}
                  >
                    {isLoading ? 'Processing...' : 'Confirm'}
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-1">{error}</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowSellInput(!showSellInput)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-sm w-full"
            >
              Sell {tokenMeta?.name}
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showSellInput ? 'max-h-32 mt-2' : 'max-h-0'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder={`Enter amount to sell in ...$${tokenMeta.symbol}`}
                  className="flex-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-0"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSellConfirm}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-sm"
                  disabled={isLoading || !sellAmount}
                >
                  {isLoading ? 'Processing...' : 'Confirm'}
                </button>
              </div>
              {error && (
                  <div className="text-red-500 text-sm mt-1">{error}</div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

export default TokenLookup