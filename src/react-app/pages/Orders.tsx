import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import Navigation from '@/react-app/components/Navigation';
import { Package, Clock, CheckCircle, Truck, Eye } from 'lucide-react';
import type { Order } from '@/shared/types';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-400" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-400" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Package className="w-5 h-5 text-white/60" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'processing':
        return 'text-blue-400 bg-blue-400/20';
      case 'shipped':
        return 'text-purple-400 bg-purple-400/20';
      case 'delivered':
        return 'text-green-400 bg-green-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  const formatStatus = (status: string) => {
    const statuses: { [key: string]: string } = {
      'pending': 'Pendente',
      'processing': 'Processando',
      'shipped': 'Enviado',
      'delivered': 'Entregue'
    };
    return statuses[status] || status;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Acesso restrito</h2>
            <p className="text-white/70">Faça login para ver seus pedidos</p>
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
            <p className="text-white/70">Carregando pedidos...</p>
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
            Meus Pedidos
          </h1>

          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          Pedido #{order.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {formatStatus(order.status)}
                        </span>
                      </div>
                      
                      {order.tracking_code && (
                        <div className="text-white/70 text-sm mb-2">
                          Código de rastreamento: <span className="font-mono text-purple-300">{order.tracking_code}</span>
                        </div>
                      )}
                      
                      <div className="text-white/60 text-sm">
                        Realizado em {new Date(order.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-2">
                        R$ {order.total_amount.toFixed(2)}
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        <span>Ver detalhes</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Status Progress */}
                  <div className="flex items-center space-x-4 mt-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="text-white/80 text-sm">
                        {formatStatus(order.status)}
                      </span>
                    </div>

                    {order.status === 'shipped' && order.tracking_code && (
                      <div className="flex-1">
                        <div className="bg-white/10 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-2/3"></div>
                        </div>
                        <div className="text-xs text-white/60 mt-1">Em trânsito</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📦</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Nenhum pedido ainda
              </h2>
              <p className="text-white/70 mb-8">
                Você ainda não fez nenhum pedido. Que tal explorar nosso marketplace?
              </p>
              <a
                href="/marketplace"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explorar Produtos
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
