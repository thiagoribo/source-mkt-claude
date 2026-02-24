import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="animate-pulse text-foreground/60">Carregando...</div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="max-w-md text-center p-8">
          <h1 className="text-2xl font-bold font-serif mb-4">Supabase Não Configurado</h1>
          <p className="text-foreground/60 mb-4">
            Configure as variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
            para habilitar o painel administrativo.
          </p>
          <code className="block bg-primary/10 p-4 text-sm text-left">
            VITE_SUPABASE_URL=https://...<br />
            VITE_SUPABASE_ANON_KEY=...
          </code>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
