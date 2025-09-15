import { CryptoTransaction } from '../types/crypto';

const STORAGE_KEY = 'crypto-transactions';

export const storage = {
  getTransactions: (): CryptoTransaction[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  },

  saveTransactions: (transactions: CryptoTransaction[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  },

  addTransaction: (transaction: CryptoTransaction): void => {
    const transactions = storage.getTransactions();
    transactions.push(transaction);
    storage.saveTransactions(transactions);
  },

  removeTransaction: (id: string): void => {
    const transactions = storage.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    storage.saveTransactions(filtered);
  }
};