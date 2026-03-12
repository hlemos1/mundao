import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { useCart } from '@/react-app/contexts/CartContext';
import Navigation from '@/react-app/components/Navigation';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import type { Product } from '@/shared/types';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        navigate('/marketplace');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity}x ${product.name} adicionado ao carrinho!`);
    }
  };

  const getCategoryColor = (slug: string) => {
    const colors: { [key: string]: string } = {
      'food': 'from-red-500 to-orange-500',
      'fitness': 'from-green-500 to-teal-500',
      'pet': 'from-blue-500 to-indigo-500',
      'casa': 'from-purple-500 to-pink-500',
      'kids': 'from-yellow-500 to-orange-500',
      'mobilidade': 'from-cyan-500 to-blue-500',
    };
    return colors[slug] || 'from-gray-500 to-gray-600';
  };

  const categoryIcons: { [key: string]: string } = {
    'food': '🍽️',
    'fitness': '💪',
    'pet': '🐾',
    'casa': '🏠',
    'kids': '🧸',
    'mobilidade': '🚗',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-white/70">Carregando produto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Produto não encontrado</h2>
            <button
              onClick={() => navigate('/marketplace')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold"
            >
              Voltar ao Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Product Image */}
            <div className="aspect-square bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getCategoryColor(product.category_slug || '')} flex items-center justify-center text-6xl`}>
                {categoryIcons[product.category_slug || ''] || '📦'}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 text-white/80 rounded-full text-sm">
                    {product.category_name}
                  </span>
                  <span className="text-green-400 text-sm">
                    {product.stock_quantity} em estoque
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                
                {product.description && (
                  <p className="text-xl text-white/70 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="text-4xl font-bold text-white">
                R$ {product.price.toFixed(2)}
              </div>

              {user && (
                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-semibold">Quantidade:</span>
                    <div className="flex items-center bg-white/10 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-white hover:bg-white/10 transition-colors rounded-l-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-3 text-white font-semibold min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                        className="p-3 text-white hover:bg-white/10 transition-colors rounded-r-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Adicionar ao Carrinho</span>
                    <span className="text-white/80">
                      (R$ {(product.price * quantity).toFixed(2)})
                    </span>
                  </button>
                </div>
              )}

              {!user && (
                <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                  <p className="text-white/70 text-center">
                    Faça login para adicionar produtos ao carrinho
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
