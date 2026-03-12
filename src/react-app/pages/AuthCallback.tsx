import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { exchangeCodeForSessionToken } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        navigate('/marketplace');
      } catch (error) {
        console.error('Auth callback failed:', error);
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [exchangeCodeForSessionToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-center">
        <div className="animate-spin mb-4">
          <Loader2 className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">Finalizando login...</h2>
        <p className="text-white/70">Você será redirecionado em instantes</p>
      </div>
    </div>
  );
}
