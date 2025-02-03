import React from 'react';

type BaseTokenDisplay = {
  image: string;
  name: string;
  symbol: string;
};

interface RegularToken extends BaseTokenDisplay {
  type: 'token';
  balance: number;
  decimals: number;
  pricePerToken: number;
  value: number;
  currency: string;
}

interface NativeToken extends BaseTokenDisplay {
  type: 'native';
  balance: number;
  balanceFormatted: string;
  valueInUsd: number;
  pricePerSol: number;
}

type TokenItemProps = {
  token: (RegularToken | NativeToken) & { type: 'token' | 'native' };
};

const TokenItem: React.FC<TokenItemProps> = ({ token }) => {
  const getValue = () => {
    if (token.type === 'native') {
      return token.valueInUsd?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return token.value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getBalance = () => {
    if (token.type === 'native') {
      return token.balanceFormatted;
    }
    return token.balance?.toLocaleString('en-US', {
      minimumFractionDigits: token.decimals,
      maximumFractionDigits: token.decimals,
    });
  };

  const getPrice = () => {
    if (token.type === 'native') {
      return token.pricePerSol.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return token.pricePerToken.toLocaleString('en-US', {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
  };

  return (
    <div className="flex items-center justify-between p-3 bg-[#0B0C0F] rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <img
            src={token.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1200px-A_black_image.jpg'}
            alt={token.name}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1200px-A_black_image.jpg';
            }}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium nowrap">
              {token.name.length > 6 ? `${token.name.substring(0, 6)}...` : token.name}
            </p>
            <span className="text-xs text-[#9097A6]">{token.symbol}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9097A6]">
            <span>{getBalance()}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 text-right">
        <p className="text-sm font-medium nowrap">${getValue()}</p>
        <p className="text-xs text-[#9097A6]">${getPrice()}</p>
      </div>
    </div>
  );
};

export default TokenItem;
