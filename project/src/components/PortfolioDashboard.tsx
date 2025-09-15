import React from 'react';
import { TrendingUp, PieChart, Hash, DollarSign } from 'lucide-react';
import { CryptoSummary } from '../types/crypto';
import { formatCurrency } from '../utils/crypto';

interface PortfolioDashboardProps {
  summary: CryptoSummary[];
}

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ summary }) => {
  const totalInvested = summary.reduce((acc, item) => acc + item.totalInvested, 0);
  const totalTransactions = summary.reduce((acc, item) => acc + item.transactionCount, 0);
  const uniqueCoins = summary.length;

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Investido',
      value: formatCurrency(totalInvested),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: PieChart,
      label: 'Moedas Diferentes',
      value: uniqueCoins.toString(),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Hash,
      label: 'Total de Transações',
      value: totalTransactions.toString(),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Dashboard do Portfólio
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {summary.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumo por Moeda
          </h3>
          <div className="space-y-3">
            {summary.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {item.symbol}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.coin}</p>
                    <p className="text-sm text-gray-600">
                      {item.totalQuantity.toLocaleString('pt-BR', { maximumFractionDigits: 8 })} {item.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.totalInvested)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.transactionCount} transação{item.transactionCount !== 1 ? 'ões' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};