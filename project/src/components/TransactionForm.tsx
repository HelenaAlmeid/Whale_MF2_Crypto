import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { CryptoTransaction } from '../types/crypto';
import { popularCoins } from '../data/coins';
import { generateId } from '../utils/crypto';

interface TransactionFormProps {
  onAddTransaction: (transaction: CryptoTransaction) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    coin: '',
    symbol: '',
    quantity: '',
    purchaseDate: '',
    investedValue: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCoins = popularCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.coin.trim()) newErrors.coin = 'Selecione uma criptomoeda';
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantidade deve ser maior que zero';
    }
    if (!formData.purchaseDate) newErrors.purchaseDate = 'Data de compra é obrigatória';
    if (!formData.investedValue || parseFloat(formData.investedValue) <= 0) {
      newErrors.investedValue = 'Valor investido deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const transaction: CryptoTransaction = {
      id: generateId(),
      coin: formData.coin,
      symbol: formData.symbol,
      quantity: parseFloat(formData.quantity),
      purchaseDate: formData.purchaseDate,
      investedValue: parseFloat(formData.investedValue),
      createdAt: new Date().toISOString()
    };

    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      coin: '',
      symbol: '',
      quantity: '',
      purchaseDate: '',
      investedValue: ''
    });
    setSearchTerm('');
    setErrors({});
  };

  const selectCoin = (coin: typeof popularCoins[0]) => {
    setFormData({
      ...formData,
      coin: coin.name,
      symbol: coin.symbol
    });
    setSearchTerm(coin.name);
    setShowSuggestions(false);
    if (errors.coin) {
      setErrors({ ...errors, coin: '' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Plus className="w-5 h-5 mr-2 text-blue-600" />
        Nova Transação
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Criptomoeda
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
                if (e.target.value !== formData.coin) {
                  setFormData({ ...formData, coin: '', symbol: '' });
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.coin ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Buscar criptomoeda..."
            />
            <Search className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
          
          {showSuggestions && searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredCoins.map((coin) => (
                <button
                  key={coin.symbol}
                  type="button"
                  onClick={() => selectCoin(coin)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center justify-between"
                >
                  <span>{coin.name}</span>
                  <span className="text-sm text-gray-500">{coin.symbol}</span>
                </button>
              ))}
              {filteredCoins.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Nenhuma criptomoeda encontrada
                </div>
              )}
            </div>
          )}
          
          {errors.coin && (
            <p className="mt-1 text-sm text-red-600">{errors.coin}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={formData.quantity}
              onChange={(e) => {
                setFormData({ ...formData, quantity: e.target.value });
                if (errors.quantity) setErrors({ ...errors, quantity: '' });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.quantity ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.00000000"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da Compra
            </label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => {
                setFormData({ ...formData, purchaseDate: e.target.value });
                if (errors.purchaseDate) setErrors({ ...errors, purchaseDate: '' });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.purchaseDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.purchaseDate && (
              <p className="mt-1 text-sm text-red-600">{errors.purchaseDate}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor Investido (R$)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.investedValue}
            onChange={(e) => {
              setFormData({ ...formData, investedValue: e.target.value });
              if (errors.investedValue) setErrors({ ...errors, investedValue: '' });
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.investedValue ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="0,00"
          />
          {errors.investedValue && (
            <p className="mt-1 text-sm text-red-600">{errors.investedValue}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Adicionar Transação
        </button>
      </form>
    </div>
  );
};