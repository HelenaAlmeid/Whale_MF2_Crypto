import React, { useState, useEffect } from 'react';
import { Bitcoin, Menu, X } from 'lucide-react';
import { CryptoTransaction } from './types/crypto';
import { storage } from './utils/storage';
import { calculatePortfolioSummary } from './utils/crypto';
import { TransactionForm } from './components/TransactionForm';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { TransactionList } from './components/TransactionList';
import { Notification, NotificationProps } from './components/Notification';

function App() {
  const [transactions, setTransactions] = useState<CryptoTransaction[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'history'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<Omit<NotificationProps, 'onClose'>>({
    type: 'success',
    message: '',
    isVisible: false
  });

  useEffect(() => {
    const savedTransactions = storage.getTransactions();
    setTransactions(savedTransactions);
  }, []);

  const showNotification = (type: NotificationProps['type'], message: string) => {
    setNotification({
      type,
      message,
      isVisible: true
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleAddTransaction = (transaction: CryptoTransaction) => {
    try {
      storage.addTransaction(transaction);
      const updatedTransactions = storage.getTransactions();
      setTransactions(updatedTransactions);
      showNotification('success', `Transação de ${transaction.coin} adicionada com sucesso!`);
      setActiveTab('dashboard');
    } catch (error) {
      showNotification('error', 'Erro ao adicionar transação. Tente novamente.');
    }
  };

  const handleDeleteTransaction = (id: string) => {
    try {
      const transaction = transactions.find(t => t.id === id);
      storage.removeTransaction(id);
      const updatedTransactions = storage.getTransactions();
      setTransactions(updatedTransactions);
      showNotification('success', `Transação de ${transaction?.coin || 'crypto'} removida com sucesso!`);
    } catch (error) {
      showNotification('error', 'Erro ao remover transação. Tente novamente.');
    }
  };

  const portfolioSummary = calculatePortfolioSummary(transactions);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', count: portfolioSummary.length },
    { id: 'add', label: 'Nova Transação', count: null },
    { id: 'history', label: 'Histórico', count: transactions.length }
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PortfolioDashboard summary={portfolioSummary} />;
      case 'add':
        return <TransactionForm onAddTransaction={handleAddTransaction} />;
      case 'history':
        return (
          <TransactionList 
            transactions={transactions} 
            onDeleteTransaction={handleDeleteTransaction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Bitcoin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CryptoPortfolio</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Gerencie seus investimentos em criptomoedas</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Notification */}
      <Notification
        {...notification}
        onClose={hideNotification}
      />
    </div>
  );
}

export default App;