import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { ArrowRight, Sparkles, Zap, Globe, Shield } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';

export default function Home() {
  const { user, redirectToLogin } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20 backdrop-blur-3xl"></div>
        <div className={`relative container mx-auto px-6 pt-32 pb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-yellow-400 mr-4" />
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                MUNDÃO
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Ecossistema neural de marketplace e serviços integrados
            </p>
            
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              Uma plataforma revolucionária que conecta todas as verticais do seu dia a dia: 
              Food, Fitness, Pet, Casa, Kids e Mobilidade em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link 
                  to="/marketplace"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Explorar Marketplace
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <button 
                  onClick={redirectToLogin}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
              
              <Link 
                to="/marketplace"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 hover:border-white/50 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
              >
                Ver Produtos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tecnologia Neural Integrada
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Cada compra, cada interação, cada experiência conectada através de inteligência artificial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">IA Contextual</h3>
              <p className="text-white/70">
                Recomendações personalizadas baseadas em seu comportamento, localização e preferências
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ecossistema Integrado</h3>
              <p className="text-white/70">
                Todas as verticais conectadas: compre comida, agende fitness, cuide do pet, tudo em um app
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Carteira Neural</h3>
              <p className="text-white/70">
                Pagamentos integrados, cashback automático e recompensas que evoluem com seu uso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Suas Verticais Favoritas
            </h2>
            <p className="text-xl text-white/70">
              Descubra produtos e serviços em cada área da sua vida
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Food', icon: '🍽️', color: 'from-red-500 to-orange-500' },
              { name: 'Fitness', icon: '💪', color: 'from-green-500 to-teal-500' },
              { name: 'Pet', icon: '🐾', color: 'from-blue-500 to-indigo-500' },
              { name: 'Casa', icon: '🏠', color: 'from-purple-500 to-pink-500' },
              { name: 'Kids', icon: '🧸', color: 'from-yellow-500 to-orange-500' },
              { name: 'Mobilidade', icon: '🚗', color: 'from-cyan-500 to-blue-500' },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/marketplace/${category.name.toLowerCase()}`}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para o Futuro?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Junte-se ao ecossistema MUNDÃO e experimente uma nova forma de viver, comprar e se conectar.
          </p>
          
          {!user && (
            <button 
              onClick={redirectToLogin}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
