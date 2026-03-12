import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import Navigation from '@/react-app/components/Navigation';
import { Wallet as WalletIcon, TrendingUp, TrendingDown, Plus, ArrowUpRight } from 'lucide-react';
import type { WalletTransaction } from '@/shared/types';

interface WalletData {
  balance: number;
  transactions: WalletTransaction[];
}

export default function Wallet() {
  const { user } = useAuth();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      const response = await fetch('/api/wallet');
      if (response.ok) {
        const data = await response.json();
        setWalletData(data);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
      case 'cashback':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'debit':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      case 'transfer':
        return <ArrowUpRight className="w-5 h-5 text-blue-400" />;
      default:
        return <WalletIcon className="w-5 h-5 text-white/60" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit':
      case 'cashback':
        return 'text-green-400';
      case 'debit':
        return 'text-red-400';
      case 'transfer':
        return 'text-blue-400';
      default:
        return 'text-white';
    }
  };

  const formatTransactionType = (type: string) => {
    const types: { [key: string]: string } = {
      'credit': 'Crédito',
      'debit': 'Débito',
      'cashback': 'Cashback',
      'transfer': 'Transferência'
    };
    return types[type] || type;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Acesso restrito</h2>
            <p className="text-white/70">Faça login para acessar sua carteira</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-white/70">Carregando carteira...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            Carteira Neural
          </h1>

          {/* Balance Card */}
          <div className="mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <WalletIcon className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-lg text-white/70 mb-2">Saldo Disponível</h2>
            <div className="text-5xl font-bold text-white mb-6">
              R$ {(walletData?.balance || 0).toFixed(2)}
            </div>

            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Adicionar Saldo</span>
              </button>
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-colors">
                Transferir
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all text-center">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-white text-sm font-medium">Pix</div>
            </button>
            <button className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all text-center">
              <div className="text-2xl mb-2">🏦</div>
              <div className="text-white text-sm font-medium">Transferência</div>
            </button>
            <button className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-white text-sm font-medium">Celular</div>
            </button>
            <button className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-white text-sm font-medium">Investir</div>
            </button>
          </div>

          {/* Transactions */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Transações Recentes</h3>
              <button className="text-purple-400 hover:text-purple-300 font-medium">
                Ver todas
              </button>
            </div>

            {walletData?.transactions && walletData.transactions.length > 0 ? (
              <div className="space-y-4">
                {walletData.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      {getTransactionIcon(transaction.transaction_type)}
                      <div>
                        <div className="text-white font-medium">
                          {transaction.description || formatTransactionType(transaction.transaction_type)}
                        </div>
                        <div className="text-white/60 text-sm">
                          {new Date(transaction.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`font-bold text-lg ${getTransactionColor(transaction.transaction_type)}`}>
                      {transaction.transaction_type === 'debit' ? '-' : '+'}
                      R$ {Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💳</div>
                <h4 className="text-xl font-semibold text-white mb-2">Nenhuma transação ainda</h4>
                <p className="text-white/70">
                  Suas transações aparecerão aqui quando você começar a usar a carteira
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
