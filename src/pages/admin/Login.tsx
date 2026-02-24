import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn, user, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';

  // Already logged in
  if (user) {
    return <Navigate to={from} replace />;
  }

  // Not configured
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="max-w-md text-center p-8 bg-background border-2 border-border">
          <h1 className="text-2xl font-bold font-serif mb-4">Configuração Necessária</h1>
          <p className="text-foreground/60 mb-6">
            Para usar o painel administrativo, configure as variáveis de ambiente do Supabase.
          </p>
          <div className="bg-primary/5 p-4 text-left mb-6">
            <p className="text-xs font-mono text-foreground/80 mb-2">1. Crie um projeto em supabase.com</p>
            <p className="text-xs font-mono text-foreground/80 mb-2">2. Copie a URL e anon key</p>
            <p className="text-xs font-mono text-foreground/80">3. Crie um arquivo .env.local:</p>
            <code className="block mt-2 text-xs bg-primary/10 p-3">
              VITE_SUPABASE_URL=https://...<br />
              VITE_SUPABASE_ANON_KEY=...
            </code>
          </div>
          <a href="/" className="text-sm text-primary hover:underline">
            Voltar ao site
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="w-full max-w-md p-8 bg-background border-2 border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2">SM Admin</h1>
          <p className="text-foreground/60 text-sm">Faça login para acessar o painel</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-destructive/10 text-destructive text-sm border border-destructive/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <a href="/" className="text-sm text-foreground/60 hover:text-primary transition-colors">
            Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
