export interface NativeBalance {
  balance: number;
  balanceFormatted: string;
  valueInUsd: number;
  pricePerSol: number;
}

export interface Token {
  name: string;
  image: string;
  symbol: string;
  balance: number;
  decimals: number;
  pricePerToken: number;
  value: number;
  currency: string;
}

export interface TokenPortfolio {
  totalValue: number;
  tokens: Token[];
}

export interface PortfolioResponse {
  nativeBalance: NativeBalance;
  tokenPortfolio: TokenPortfolio;
  totalValueUsd: number;
}