import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { useCart } from '@/react-app/contexts/CartContext';
import Navigation from '@/react-app/components/Navigation';
import { Plus, Search } from 'lucide-react';
import type { Category, Product } from '@/shared/types';

export default function Marketplace() {
  const { category } = useParams<{ category: string }>();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory 
        ? `/api/products?category=${selectedCategory}`
        : '/api/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Show a simple notification (you could use a toast library here)
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const categoryIcons: { [key: string]: string } = {
    'food': '🍽️',
    'fitness': '💪',
    'pet': '🐾',
    'casa': '🏠',
    'kids': '🧸',
    'mobilidade': '🚗',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Marketplace Neural
            </h1>
            <p className="text-xl text-white/70">
              Descubra produtos incríveis em todas as verticais da sua vida
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === ''
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === cat.slug
                    ? `bg-gradient-to-r ${getCategoryColor(cat.slug)} text-white`
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                <span className="text-lg">{categoryIcons[cat.slug] || '📦'}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
              <p className="text-white/70">Carregando produtos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/5 rounded-xl mb-4 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(product.category_slug || '')} flex items-center justify-center text-2xl`}>
                      {categoryIcons[product.category_slug || ''] || '📦'}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-white text-lg leading-tight group-hover:text-yellow-300 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                        {product.category_name}
                      </span>
                    </div>

                    {product.description && (
                      <p className="text-white/70 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-white">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <div className="text-xs text-white/60">
                          {product.stock_quantity} em estoque
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link
                          to={`/product/${product.id}`}
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                        >
                          Ver
                        </Link>
                        
                        {user && (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 text-sm font-medium flex items-center space-x-1"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Carrinho</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-white/70">
                {searchTerm 
                  ? `Não encontramos produtos para "${searchTerm}"`
                  : 'Não há produtos nesta categoria no momento'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
