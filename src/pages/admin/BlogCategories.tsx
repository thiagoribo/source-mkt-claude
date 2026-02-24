import { useState } from 'react';
import { useBlogCategories, useCreateBlogCategory, useUpdateBlogCategory, useDeleteBlogCategory } from '@/hooks/queries/useBlogCategories';
import DataTable from '@/components/admin/tables/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, X, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';
import type { BlogCategory, InsertBlogCategory } from '@/types/database';

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const initialFormState: InsertBlogCategory = {
  name: '',
  slug: '',
  description: '',
  display_order: 0,
};

export default function BlogCategoriesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InsertBlogCategory>(initialFormState);

  const { data: categories = [], isLoading } = useBlogCategories();
  const createMutation = useCreateBlogCategory();
  const updateMutation = useUpdateBlogCategory();
  const deleteMutation = useDeleteBlogCategory();

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsOpen(true);
  };

  const handleEdit = (category: BlogCategory) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      display_order: category.display_order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria? Posts associados ficarão sem categoria.')) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Categoria excluída com sucesso');
    } catch {
      toast.error('Erro ao excluir categoria');
    }
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success('Categoria atualizada com sucesso');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Categoria criada com sucesso');
      }
      setIsOpen(false);
      setFormData(initialFormState);
    } catch {
      toast.error('Erro ao salvar categoria');
    }
  };

  const columns = [
    {
      key: 'icon',
      header: '',
      className: 'w-12',
      render: () => (
        <div className="w-8 h-8 bg-secondary flex items-center justify-center">
          <FolderOpen className="w-4 h-4 text-foreground/40" />
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Nome',
      render: (cat: BlogCategory) => (
        <div>
          <p className="font-medium">{cat.name}</p>
          <p className="text-xs text-foreground/50">/{cat.slug}</p>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Descrição',
      render: (cat: BlogCategory) => (
        <p className="text-sm text-foreground/70 line-clamp-2 max-w-md">
          {cat.description || '-'}
        </p>
      ),
    },
    {
      key: 'display_order',
      header: 'Ordem',
      className: 'w-20',
    },
    {
      key: 'actions',
      header: '',
      className: 'w-24',
      render: (cat: BlogCategory) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(cat); }}
            className="p-2 hover:bg-secondary transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(cat.id); }}
            className="p-2 hover:bg-destructive/10 text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Categorias do Blog</h1>
          <p className="text-foreground/60">Organize seus posts em categorias</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Categoria
        </Button>
      </div>

      {/* Table */}
      <div className="bg-background border-2 border-border">
        <DataTable
          columns={columns}
          data={categories}
          isLoading={isLoading}
          emptyMessage="Nenhuma categoria cadastrada"
          getRowKey={(c) => c.id}
          onRowClick={handleEdit}
        />
      </div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingId ? 'Editar Categoria' : 'Nova Categoria'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Ordem de exibição</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="w-32"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingId ? 'Salvar Alterações' : 'Criar Categoria'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
