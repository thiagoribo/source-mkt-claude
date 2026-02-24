import { useState } from 'react';
import { useTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember } from '@/hooks/queries/useTeamMembers';
import DataTable from '@/components/admin/tables/DataTable';
import ImageUploader from '@/components/admin/editors/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import type { TeamMember, InsertTeamMember } from '@/types/database';

const initialFormState: InsertTeamMember = {
  name: '',
  role: '',
  bio: '',
  image_url: '',
  is_founder: false,
  display_order: 0,
};

export default function TeamMembersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InsertTeamMember>(initialFormState);

  const { data: members = [], isLoading } = useTeamMembers();
  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();
  const deleteMutation = useDeleteTeamMember();

  const activeMembers = members.filter(m => m.is_active);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      image_url: member.image_url || '',
      is_founder: member.is_founder,
      display_order: member.display_order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este membro?')) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Membro removido com sucesso');
    } catch {
      toast.error('Erro ao remover membro');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success('Membro atualizado com sucesso');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Membro criado com sucesso');
      }
      setIsOpen(false);
      setFormData(initialFormState);
    } catch {
      toast.error('Erro ao salvar membro');
    }
  };

  const columns = [
    {
      key: 'image',
      header: '',
      className: 'w-16',
      render: (member: TeamMember) => (
        <div className="w-10 h-10 bg-secondary overflow-hidden">
          {member.image_url ? (
            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground/30 text-sm font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Nome',
      render: (member: TeamMember) => (
        <div>
          <p className="font-medium">{member.name}</p>
          <p className="text-xs text-foreground/50">{member.role}</p>
        </div>
      ),
    },
    {
      key: 'is_founder',
      header: 'Fundador',
      render: (member: TeamMember) => (
        <span className={`text-xs px-2 py-1 ${member.is_founder ? 'bg-accent/20 text-accent-foreground' : 'bg-secondary text-foreground/50'}`}>
          {member.is_founder ? 'Sim' : 'Não'}
        </span>
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
      render: (member: TeamMember) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(member); }}
            className="p-2 hover:bg-secondary transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(member.id); }}
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
          <h1 className="text-3xl font-bold font-serif mb-2">Equipe</h1>
          <p className="text-foreground/60">Gerencie os membros da equipe exibidos no site</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Membro
        </Button>
      </div>

      {/* Table */}
      <div className="bg-background border-2 border-border">
        <DataTable
          columns={columns}
          data={activeMembers}
          isLoading={isLoading}
          emptyMessage="Nenhum membro cadastrado"
          getRowKey={(m) => m.id}
          onRowClick={handleEdit}
        />
      </div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingId ? 'Editar Membro' : 'Novo Membro'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Cargo *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Foto</Label>
              <ImageUploader
                value={formData.image_url || ''}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                category="team"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Switch
                  id="is_founder"
                  checked={formData.is_founder}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_founder: checked })}
                />
                <Label htmlFor="is_founder">Fundador</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Ordem de exibição</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingId ? 'Salvar Alterações' : 'Criar Membro'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
