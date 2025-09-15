import React from 'react';
import { History, Trash2, Calendar, Coins } from 'lucide-react';
import { CryptoTransaction } from '../types/crypto';
import { formatCurrency, formatDate } from '../utils/crypto';

interface TransactionListProps {
  transactions: CryptoTransaction[];
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDeleteTransaction 
}) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <Coins className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma transação encontrada
        </h3>
        <p className="text-gray-600">
          Comece adicionando sua primeira compra de criptomoeda usando o formulário acima.
        </p>
      </div>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <History className="w-5 h-5 mr-2 text-blue-600" />
          Histórico de Transações
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {sortedTransactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">
                    {transaction.symbol}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {transaction.coin}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center">
                      <Coins className="w-4 h-4 mr-1" />
                      {transaction.quantity.toLocaleString('pt-BR', { maximumFractionDigits: 8 })} {transaction.symbol}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(transaction.purchaseDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(transaction.investedValue)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(transaction.investedValue / transaction.quantity)} por unidade
                  </p>
                </div>
                
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir transação"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};