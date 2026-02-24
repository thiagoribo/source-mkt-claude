import { Link, useNavigate } from 'react-router-dom';
import { useBlogPosts, useDeleteBlogPost, usePublishBlogPost } from '@/hooks/queries/useBlogPosts';
import DataTable from '@/components/admin/tables/DataTable';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { BlogPostWithRelations } from '@/types/database';

export default function BlogPostsPage() {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useBlogPosts();
  const deleteMutation = useDeleteBlogPost();
  const publishMutation = usePublishBlogPost();

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Post excluído com sucesso');
    } catch {
      toast.error('Erro ao excluir post');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishMutation.mutateAsync(id);
      toast.success('Post publicado com sucesso');
    } catch {
      toast.error('Erro ao publicar post');
    }
  };

  const columns = [
    {
      key: 'image',
      header: '',
      className: 'w-20',
      render: (post: BlogPostWithRelations) => (
        <div className="w-16 h-12 bg-secondary overflow-hidden">
          {post.featured_image_url ? (
            <img src={post.featured_image_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground/30 text-xs">
              Sem imagem
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Título',
      render: (post: BlogPostWithRelations) => (
        <div>
          <p className="font-medium line-clamp-1">{post.title}</p>
          <p className="text-xs text-foreground/50">/{post.slug}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Categoria',
      render: (post: BlogPostWithRelations) => (
        <span className="text-xs px-2 py-1 bg-secondary">
          {post.category?.name || 'Sem categoria'}
        </span>
      ),
    },
    {
      key: 'author',
      header: 'Autor',
      render: (post: BlogPostWithRelations) => (
        <span className="text-sm text-foreground/70">
          {post.author?.name || '-'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (post: BlogPostWithRelations) => (
        <span
          className={cn(
            'text-xs px-2 py-1 font-medium',
            post.status === 'published' && 'bg-green-100 text-green-800',
            post.status === 'draft' && 'bg-yellow-100 text-yellow-800',
            post.status === 'scheduled' && 'bg-blue-100 text-blue-800'
          )}
        >
          {post.status === 'published' && 'Publicado'}
          {post.status === 'draft' && 'Rascunho'}
          {post.status === 'scheduled' && 'Agendado'}
        </span>
      ),
    },
    {
      key: 'views',
      header: 'Views',
      render: (post: BlogPostWithRelations) => (
        <span className="text-sm text-foreground/60">
          {post.views.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Data',
      render: (post: BlogPostWithRelations) => (
        <span className="text-xs text-foreground/50">
          {new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-32',
      render: (post: BlogPostWithRelations) => (
        <div className="flex gap-1">
          {post.status === 'draft' && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePublish(post.id); }}
              className="p-2 hover:bg-green-50 text-green-600 transition-colors"
              title="Publicar"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
          {post.status === 'published' && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-secondary transition-colors"
              title="Ver no site"
            >
              <Eye className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/blog/${post.id}`); }}
            className="p-2 hover:bg-secondary transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(post.id); }}
            className="p-2 hover:bg-destructive/10 text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const draftCount = posts.filter(p => p.status === 'draft').length;
  const publishedCount = posts.filter(p => p.status === 'published').length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Posts do Blog</h1>
          <p className="text-foreground/60">
            {publishedCount} publicados · {draftCount} rascunhos
          </p>
        </div>
        <Link to="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Post
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-background border-2 border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{publishedCount}</p>
              <p className="text-xs text-foreground/50">Publicados</p>
            </div>
          </div>
        </div>
        <div className="bg-background border-2 border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center">
              <Pencil className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{draftCount}</p>
              <p className="text-xs text-foreground/50">Rascunhos</p>
            </div>
          </div>
        </div>
        <div className="bg-background border-2 border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
              <p className="text-xs text-foreground/50">Visualizações</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-background border-2 border-border">
        <DataTable
          columns={columns}
          data={posts}
          isLoading={isLoading}
          emptyMessage="Nenhum post cadastrado"
          getRowKey={(p) => p.id}
          onRowClick={(p) => navigate(`/admin/blog/${p.id}`)}
        />
      </div>
    </div>
  );
}
