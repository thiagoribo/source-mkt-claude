import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Users, MessageSquareQuote, Briefcase, FileText, Eye, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description?: string;
}

function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <div className="bg-background border-2 border-border p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-secondary flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      <p className="text-3xl font-bold font-serif mb-1">{value}</p>
      <p className="text-sm text-foreground/60">{title}</p>
      {description && (
        <p className="text-xs text-foreground/40 mt-2">{description}</p>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const isConfigured = isSupabaseConfigured();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      if (!isConfigured) {
        return {
          teamMembers: 0,
          testimonials: 0,
          cases: 0,
          blogPosts: 0,
          publishedPosts: 0,
          totalViews: 0,
        };
      }

      const [teamRes, testimonialsRes, casesRes, postsRes] = await Promise.all([
        supabase.from('team_members').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('cases').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('blog_posts').select('id, status, views'),
      ]);

      const posts = postsRes.data || [];
      const publishedPosts = posts.filter(p => p.status === 'published').length;
      const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

      return {
        teamMembers: teamRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        cases: casesRes.count || 0,
        blogPosts: posts.length,
        publishedPosts,
        totalViews,
      };
    },
    enabled: isConfigured,
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif mb-2">Dashboard</h1>
        <p className="text-foreground/60">Visão geral do conteúdo do site</p>
      </div>

      {!isConfigured && (
        <div className="bg-accent/10 border-2 border-accent/30 p-6 mb-8">
          <h2 className="font-bold mb-2">Modo Demonstração</h2>
          <p className="text-sm text-foreground/70">
            O Supabase não está configurado. Configure as variáveis de ambiente para habilitar todas as funcionalidades.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Membros da Equipe"
          value={isLoading ? '...' : stats?.teamMembers || 0}
          icon={Users}
          description="Ativos no site"
        />
        <StatCard
          title="Depoimentos"
          value={isLoading ? '...' : stats?.testimonials || 0}
          icon={MessageSquareQuote}
          description="De clientes satisfeitos"
        />
        <StatCard
          title="Cases"
          value={isLoading ? '...' : stats?.cases || 0}
          icon={Briefcase}
          description="No portfólio"
        />
        <StatCard
          title="Posts do Blog"
          value={isLoading ? '...' : stats?.blogPosts || 0}
          icon={FileText}
          description={`${stats?.publishedPosts || 0} publicados`}
        />
        <StatCard
          title="Visualizações"
          value={isLoading ? '...' : stats?.totalViews?.toLocaleString() || 0}
          icon={Eye}
          description="Total no blog"
        />
        <StatCard
          title="Taxa de Publicação"
          value={isLoading ? '...' : stats?.blogPosts ? `${Math.round((stats.publishedPosts / stats.blogPosts) * 100)}%` : '0%'}
          icon={TrendingUp}
          description="Posts publicados"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold font-serif mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/blog/new"
            className="p-4 bg-primary text-primary-foreground text-center hover:bg-primary/90 transition-colors"
          >
            <FileText className="w-5 h-5 mx-auto mb-2" />
            <span className="text-sm font-medium">Novo Post</span>
          </a>
          <a
            href="/admin/team"
            className="p-4 bg-background border-2 border-border text-center hover:border-primary transition-colors"
          >
            <Users className="w-5 h-5 mx-auto mb-2" />
            <span className="text-sm font-medium">Gerenciar Equipe</span>
          </a>
          <a
            href="/admin/testimonials"
            className="p-4 bg-background border-2 border-border text-center hover:border-primary transition-colors"
          >
            <MessageSquareQuote className="w-5 h-5 mx-auto mb-2" />
            <span className="text-sm font-medium">Depoimentos</span>
          </a>
          <a
            href="/admin/media"
            className="p-4 bg-background border-2 border-border text-center hover:border-primary transition-colors"
          >
            <Briefcase className="w-5 h-5 mx-auto mb-2" />
            <span className="text-sm font-medium">Biblioteca de Mídia</span>
          </a>
        </div>
      </div>
    </div>
  );
}
