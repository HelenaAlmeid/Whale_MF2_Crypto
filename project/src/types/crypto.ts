export interface CryptoTransaction {
  id: string;
  coin: string;
  symbol: string;
  quantity: number;
  purchaseDate: string;
  investedValue: number;
  createdAt: string;
}

export interface CryptoSummary {
  coin: string;
  symbol: string;
  totalQuantity: number;
  totalInvested: number;
  transactionCount: number;
  averagePrice: number;
}