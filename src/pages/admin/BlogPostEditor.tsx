import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogPost, useCreateBlogPost, useUpdateBlogPost } from '@/hooks/queries/useBlogPosts';
import { useBlogCategories } from '@/hooks/queries/useBlogCategories';
import { useTeamMembers } from '@/hooks/queries/useTeamMembers';
import RichTextEditor from '@/components/admin/editors/RichTextEditor';
import ImageUploader from '@/components/admin/editors/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { InsertBlogPost } from '@/types/database';

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function BlogPostEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id && id !== 'new';

  const { data: post, isLoading: isLoadingPost } = useBlogPost(isEditing ? id : undefined);
  const { data: categories = [] } = useBlogCategories();
  const { data: teamMembers = [] } = useTeamMembers();

  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();

  const [formData, setFormData] = useState<InsertBlogPost>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    category_id: null,
    author_id: null,
    meta_title: '',
    meta_description: '',
    keywords: [],
    status: 'draft',
  });

  const [keywordsText, setKeywordsText] = useState('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        featured_image_url: post.featured_image_url || '',
        category_id: post.category_id,
        author_id: post.author_id,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        keywords: post.keywords || [],
        status: post.status,
      });
      setKeywordsText(post.keywords?.join(', ') || '');
    }
  }, [post]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleKeywordsChange = (text: string) => {
    setKeywordsText(text);
    setFormData((prev) => ({
      ...prev,
      keywords: text.split(',').map((k) => k.trim()).filter(Boolean),
    }));
  };

  const handleSave = async (publish = false) => {
    if (!formData.title || !formData.content) {
      toast.error('Título e conteúdo são obrigatórios');
      return;
    }

    try {
      const data = {
        ...formData,
        status: publish ? 'published' as const : formData.status,
        published_at: publish ? new Date().toISOString() : undefined,
      };

      if (isEditing) {
        await updateMutation.mutateAsync({ id, ...data });
        toast.success(publish ? 'Post publicado!' : 'Post salvo!');
      } else {
        const result = await createMutation.mutateAsync(data);
        toast.success(publish ? 'Post publicado!' : 'Post criado!');
        navigate(`/admin/blog/${result.id}`);
      }
    } catch {
      toast.error('Erro ao salvar post');
    }
  };

  if (isEditing && isLoadingPost) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const activeMembers = teamMembers.filter(m => m.is_active);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/blog')}
            className="p-2 hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-serif">
              {isEditing ? 'Editar Post' : 'Novo Post'}
            </h1>
            {formData.status === 'published' && (
              <p className="text-xs text-green-600">Publicado</p>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          {formData.status === 'published' && (
            <a
              href={`/blog/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Ver no Site
              </Button>
            </a>
          )}
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={createMutation.isPending || updateMutation.isPending}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Rascunho
          </Button>
          {formData.status !== 'published' && (
            <Button
              onClick={() => handleSave(true)}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Publicar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <div className="bg-background border-2 border-border p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Título do post"
                className="text-lg h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL (slug)</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/50">/blog/</span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                  placeholder="url-do-post"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve descrição do post (aparece nas listagens)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Conteúdo *</Label>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Escreva o conteúdo do post..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-background border-2 border-border p-6 space-y-4">
            <Label>Imagem Destacada</Label>
            <ImageUploader
              value={formData.featured_image_url || ''}
              onChange={(url) => setFormData({ ...formData, featured_image_url: url })}
              category="blog"
            />
          </div>

          {/* Metadata */}
          <div className="bg-background border-2 border-border p-6 space-y-4">
            <h3 className="font-bold">Metadados</h3>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category_id || ''}
                onValueChange={(value) => setFormData({ ...formData, category_id: value || null })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Select
                value={formData.author_id || ''}
                onValueChange={(value) => setFormData({ ...formData, author_id: value || null })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um autor" />
                </SelectTrigger>
                <SelectContent>
                  {activeMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-background border-2 border-border p-6 space-y-4">
            <h3 className="font-bold">SEO</h3>

            <div className="space-y-2">
              <Label htmlFor="meta_title">
                Meta Title
                <span className="text-xs text-foreground/50 ml-2">
                  ({formData.meta_title?.length || 0}/60)
                </span>
              </Label>
              <Input
                id="meta_title"
                value={formData.meta_title || ''}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Título para SEO"
                maxLength={60}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">
                Meta Description
                <span className="text-xs text-foreground/50 ml-2">
                  ({formData.meta_description?.length || 0}/160)
                </span>
              </Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description || ''}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Descrição para SEO"
                rows={3}
                maxLength={160}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Palavras-chave</Label>
              <Input
                id="keywords"
                value={keywordsText}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                placeholder="branding, marketing, estratégia"
              />
              <p className="text-xs text-foreground/50">Separe por vírgulas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
