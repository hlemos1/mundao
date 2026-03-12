import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { useCart } from '@/react-app/contexts/CartContext';
import { 
  Menu, 
  X, 
  LogOut, 
  ShoppingCart, 
  Sparkles 
} from 'lucide-react';

export default function Navigation() {
  const { user, logout, redirectToLogin } = useAuth();
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: '/marketplace', label: 'Marketplace', auth: false },
    { to: '/wallet', label: 'Carteira', auth: true },
    { to: '/orders', label: 'Pedidos', auth: true },
    { to: '/profile', label: 'Perfil', auth: true },
  ];

  const cartItemCount = getTotalItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              MUNDÃO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.auth && !user) return null;
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-white/80 hover:text-white transition-colors duration-200 relative ${
                    isActivePath(link.to) ? 'text-white' : ''
                  }`}
                >
                  {link.label}
                  {isActivePath(link.to) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            {user && (
              <Link
                to="/marketplace"
                className="relative p-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 text-white/80">
                  <img
                    src={user.google_user_data.picture || ''}
                    alt={user.google_user_data.name || user.email}
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                  />
                  <span className="text-sm">
                    {user.google_user_data.given_name || user.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-white/80 hover:text-white transition-colors duration-200"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={redirectToLogin}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Entrar
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                if (link.auth && !user) return null;
                
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-white/80 hover:text-white transition-colors duration-200 py-2 ${
                      isActivePath(link.to) ? 'text-white font-semibold' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {user && (
                <div className="pt-3 border-t border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={user.google_user_data.picture || ''}
                      alt={user.google_user_data.name || user.email}
                      className="w-10 h-10 rounded-full border-2 border-white/20"
                    />
                    <div>
                      <div className="text-white font-semibold">
                        {user.google_user_data.name || user.email.split('@')[0]}
                      </div>
                      <div className="text-white/60 text-sm">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-white/80 hover:text-white transition-colors duration-200 py-2 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
