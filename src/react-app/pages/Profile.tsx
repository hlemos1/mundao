import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import Navigation from '@/react-app/components/Navigation';
import { Trophy, Star } from 'lucide-react';
import type { UserWithProfile } from '@/shared/types';

export default function Profile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/users/me');
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Acesso restrito</h2>
            <p className="text-white/70">Faça login para acessar seu perfil</p>
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
            <p className="text-white/70">Carregando perfil...</p>
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
            Meu Perfil
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* User Info Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <img
                  src={user.google_user_data.picture || ''}
                  alt={user.google_user_data.name || user.email}
                  className="w-24 h-24 rounded-full border-4 border-white/20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-white">
                  {user.google_user_data.name || user.email.split('@')[0]}
                </h2>
                <p className="text-white/70">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/70">Membro desde</span>
                  <span className="text-white">
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/70">Último login</span>
                  <span className="text-white">
                    {new Date(user.last_signed_in_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {userProfile?.profile.phone && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Telefone</span>
                    <span className="text-white">{userProfile.profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Gamification Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Gamificação Neural</h3>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">
                    Nível {userProfile?.profile.gamification_level || 1}
                  </div>
                  <p className="text-white/70">Neural Explorer</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Pontos</span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-semibold">
                        {userProfile?.profile.gamification_points || 0}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(100, ((userProfile?.profile.gamification_points || 0) % 1000) / 10)}%` 
                      }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-white/60 text-center">
                    {1000 - ((userProfile?.profile.gamification_points || 0) % 1000)} pontos para o próximo nível
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Conquistas</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🎯</div>
                      <div className="text-xs text-white/70">Primeira Compra</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center opacity-50">
                      <div className="text-2xl mb-1">🔥</div>
                      <div className="text-xs text-white/70">Streak 7 dias</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center opacity-50">
                      <div className="text-2xl mb-1">💎</div>
                      <div className="text-xs text-white/70">VIP Neural</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Carteira Neural</h3>
              <div className="text-4xl font-bold text-green-400 mb-2">
                R$ {(userProfile?.profile.wallet_balance || 0).toFixed(2)}
              </div>
              <p className="text-white/70 mb-6">Saldo disponível</p>
              
              <div className="flex justify-center space-x-4">
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                  Adicionar Saldo
                </button>
                <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-colors">
                  Ver Extrato
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
