export interface TokenDetail {
    name: string;
    image: string;
    symbol: string;
    balance: number;
    decimals: number;
    pricePerToken: number;
    value: number;
    currency: string;
    percentOfPortfolio: string;
  }
  
export interface PortfolioResponse {
    summary: {
      totalValue: number;
      tokenCount: number;
      primaryCurrency: string;
    };
    detail: {
      tokens: TokenDetail[];
    };
  }