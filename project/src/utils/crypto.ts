import { CryptoTransaction, CryptoSummary } from '../types/crypto';

export const calculatePortfolioSummary = (transactions: CryptoTransaction[]): CryptoSummary[] => {
  const summaryMap = new Map<string, CryptoSummary>();

  transactions.forEach(transaction => {
    const key = transaction.coin;
    
    if (summaryMap.has(key)) {
      const existing = summaryMap.get(key)!;
      existing.totalQuantity += transaction.quantity;
      existing.totalInvested += transaction.investedValue;
      existing.transactionCount += 1;
      existing.averagePrice = existing.totalInvested / existing.totalQuantity;
    } else {
      summaryMap.set(key, {
        coin: transaction.coin,
        symbol: transaction.symbol,
        totalQuantity: transaction.quantity,
        totalInvested: transaction.investedValue,
        transactionCount: 1,
        averagePrice: transaction.investedValue / transaction.quantity
      });
    }
  });

  return Array.from(summaryMap.values()).sort((a, b) => b.totalInvested - a.totalInvested);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};