import { useState } from 'react';
import { useCases, useCreateCase, useUpdateCase, useDeleteCase } from '@/hooks/queries/useCases';
import DataTable from '@/components/admin/tables/DataTable';
import ImageUploader from '@/components/admin/editors/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Case, InsertCase } from '@/types/database';

const initialFormState: InsertCase = {
  name: '',
  category: '',
  challenge: '',
  result: '',
  image_url: '',
  display_order: 0,
};

export default function CasesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InsertCase>(initialFormState);

  const { data: cases = [], isLoading } = useCases();
  const createMutation = useCreateCase();
  const updateMutation = useUpdateCase();
  const deleteMutation = useDeleteCase();

  const activeCases = cases.filter(c => c.is_active);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsOpen(true);
  };

  const handleEdit = (caseItem: Case) => {
    setEditingId(caseItem.id);
    setFormData({
      name: caseItem.name,
      category: caseItem.category || '',
      challenge: caseItem.challenge || '',
      result: caseItem.result || '',
      image_url: caseItem.image_url || '',
      display_order: caseItem.display_order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este case?')) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Case removido com sucesso');
    } catch {
      toast.error('Erro ao remover case');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success('Case atualizado com sucesso');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Case criado com sucesso');
      }
      setIsOpen(false);
      setFormData(initialFormState);
    } catch {
      toast.error('Erro ao salvar case');
    }
  };

  const columns = [
    {
      key: 'image',
      header: '',
      className: 'w-20',
      render: (item: Case) => (
        <div className="w-16 h-12 bg-secondary overflow-hidden">
          {item.image_url ? (
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground/30 text-xs">
              Sem imagem
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Cliente',
      render: (item: Case) => (
        <div>
          <p className="font-medium">{item.name}</p>
          {item.category && (
            <span className="text-xs px-2 py-0.5 bg-secondary text-foreground/60">
              {item.category}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'challenge',
      header: 'Desafio',
      render: (item: Case) => (
        <p className="text-sm text-foreground/70 line-clamp-2 max-w-xs">
          {item.challenge || '-'}
        </p>
      ),
    },
    {
      key: 'result',
      header: 'Resultado',
      render: (item: Case) => (
        <p className="text-sm font-medium text-primary">
          {item.result || '-'}
        </p>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-24',
      render: (item: Case) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
            className="p-2 hover:bg-secondary transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
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
          <h1 className="text-3xl font-bold font-serif mb-2">Cases</h1>
          <p className="text-foreground/60">Gerencie os cases do portfólio</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Case
        </Button>
      </div>

      {/* Table */}
      <div className="bg-background border-2 border-border">
        <DataTable
          columns={columns}
          data={activeCases}
          isLoading={isLoading}
          emptyMessage="Nenhum case cadastrado"
          getRowKey={(c) => c.id}
          onRowClick={handleEdit}
        />
      </div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingId ? 'Editar Case' : 'Novo Case'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Cliente *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Branding, Consultoria"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">Desafio</Label>
              <Textarea
                id="challenge"
                value={formData.challenge || ''}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                rows={3}
                placeholder="Qual era o desafio do cliente?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="result">Resultado</Label>
              <Input
                id="result"
                value={formData.result || ''}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                placeholder="Ex: +200% de crescimento"
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem</Label>
              <ImageUploader
                value={formData.image_url || ''}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                category="cases"
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
                {editingId ? 'Salvar Alterações' : 'Criar Case'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
