import { CheckCircle2, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface JupiterSwap {
  outputMint: string;
  inputMint: string;
  inputAmount: number;
}

interface SwapProps {
  data: JupiterSwap;
}

interface SwapQuote {
  outAmount: string;
  inAmount: string;
  inputMint: string;
  outputMint: string;
}
interface TokenInfo {
  content: {
    metadata: {
      symbol: string;
    };
    files: {
      uri: string;
    }[];
  };
  id: string;
}

interface TradeOptions {
  outputMint: string;
  inputAmount: number;
  inputMint?: string;
  slippageBps?: number;
}


export default function SwapOnJupiter({ data }: SwapProps) {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quoteData, setQuoteData] = useState<SwapQuote | null>(null);
  const [swapping, setSwapping] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/das/tokens/${data.inputMint},${data.outputMint}`
        );
        if (!response.ok) throw new Error('Failed to fetch tokens');
        const tokenData = await response.json();
        setTokens(tokenData);

        const quoteResponse = await fetch(
          `https://api.jup.ag/swap/v1/quote?inputMint=${data.inputMint}&outputMint=${data.outputMint}&amount=${data.inputAmount * Math.pow(10, 6)}`
        );
        if (!quoteResponse.ok) throw new Error('Failed to fetch quote');
        const quoteResult = await quoteResponse.json();

        setQuoteData(quoteResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data.inputMint, data.outputMint, data.inputAmount]);


  const handleSwap = async () => {
      setSwapping(true);
      setError(null);
      setSignature(null);
  
      try {
        const tradeOptions: TradeOptions = {
          outputMint: data.outputMint,
          inputAmount: data.inputAmount,
          inputMint: data.inputMint,
          slippageBps: 200, // Default slippage
        };
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/actions/trade/swap/tx`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: "FxmGwcJW4fQQboEETbYrfMGKebKdEyW1HXiMMShWXbCj",
            options: tradeOptions,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Swap failed');
        }
  
        const result = await response.json();
        setSignature(result.signature);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Swap failed. Please try again.');
        console.log(error)
      } finally {
        setSwapping(false);
      }
    };

  const inputToken = tokens.find(token => token?.id === data.inputMint);
  const outputToken = tokens.find(token => token?.id === data.outputMint);

  if (loading) {
    return (
      <div className="mt-2 p-3 bg-[#121417] text-gray-300 rounded-lg min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" color='#6FCB71' />
      </div>
    );
  }


  const outputAmount = quoteData?.outAmount || '0';
  const formattedOutputAmount = parseFloat(outputAmount) / Math.pow(10, 6);

  return (
    <div className="mt-2 p-3 bg-[#121417] text-gray-300 rounded-lg">
      <div className="flex flex-col gap-y-1">
        <div className="text-sm grid grid-cols-1 items-center justify-items-center">
          <div className="text-lg">
            Swap token on Jupiter
          </div>
        </div>

        <div className="w-full flex justify-center flex-col items-center gap-x-2 mt-2">
          <img
            className="w-[60px] h-[60px] rounded-md"
            src={inputToken?.content.files[0].uri}
            alt={inputToken?.content.metadata.symbol}
          />
          <div className="text-center mt-4">
            <code>{data.inputMint}</code>
            <div>{data.inputAmount} ${inputToken?.content.metadata.symbol}</div>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <div className="w-[2px] h-[50px] inset-[2px] bg-white rounded-full" />
        </div>

        <div className="w-full flex justify-center flex-col items-center gap-x-2 mt-2">
          <img
            className="w-[60px] h-[60px] rounded-md"
            src={outputToken?.content.files[0]?.uri}
            alt={outputToken?.content.metadata.symbol}
          />
          <div className="text-center mt-4">
            <code>{data.outputMint}</code>
            <div>{formattedOutputAmount} ${outputToken?.content.metadata.symbol}</div>
          </div>
        </div>

        <div className="mt-2 flex flex-col">
        <button
        onClick={handleSwap}
        disabled={swapping || !!signature}
        className="bg-[#6FCB71] mt-3 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed px-4 py-2 rounded-sm w-full flex items-center justify-center gap-2"
      >
        {swapping ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Swapping...
          </>
        ) : signature ? (
          <>
            <CheckCircle2 className="h-4 w-4" color='#fff' />
            Swap Complete
          </>
        ) : (
          'Swap on Jupiter'
        )}
      </button>
        </div>
      </div>
    </div>
  );
}