import { useState } from 'react';
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '@/hooks/queries/useTestimonials';
import DataTable from '@/components/admin/tables/DataTable';
import ImageUploader from '@/components/admin/editors/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import type { Testimonial, InsertTestimonial } from '@/types/database';

const AVAILABLE_SERVICES = [
  { slug: 'branding-empresarial', label: 'Branding Empresarial' },
  { slug: 'branding-pessoal', label: 'Branding Pessoal' },
  { slug: 'identidade-visual', label: 'Identidade Visual' },
  { slug: 'gestao-redes-sociais', label: 'Gestão de Redes Sociais' },
] as const;

const initialFormState: InsertTestimonial = {
  name: '',
  role: '',
  company: '',
  quote: '',
  result: '',
  image_url: '',
  service_slugs: [],
  is_featured: false,
  display_order: 0,
};

export default function TestimonialsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InsertTestimonial>(initialFormState);

  const { data: testimonials = [], isLoading } = useTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const activeTestimonials = testimonials.filter(t => t.is_active);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role || '',
      company: testimonial.company || '',
      quote: testimonial.quote,
      result: testimonial.result || '',
      image_url: testimonial.image_url || '',
      service_slugs: testimonial.service_slugs || [],
      is_featured: testimonial.is_featured,
      display_order: testimonial.display_order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este depoimento?')) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Depoimento removido com sucesso');
    } catch {
      toast.error('Erro ao remover depoimento');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success('Depoimento atualizado com sucesso');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Depoimento criado com sucesso');
      }
      setIsOpen(false);
      setFormData(initialFormState);
    } catch {
      toast.error('Erro ao salvar depoimento');
    }
  };

  const columns = [
    {
      key: 'image',
      header: '',
      className: 'w-16',
      render: (item: Testimonial) => (
        <div className="w-10 h-10 bg-secondary overflow-hidden">
          {item.image_url ? (
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground/30 text-sm font-bold">
              {item.name.charAt(0)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Cliente',
      render: (item: Testimonial) => (
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{item.name}</p>
            {item.is_featured && <Star className="w-3 h-3 fill-accent text-accent" />}
          </div>
          <p className="text-xs text-foreground/50">
            {item.role}{item.company && ` · ${item.company}`}
          </p>
        </div>
      ),
    },
    {
      key: 'quote',
      header: 'Depoimento',
      render: (item: Testimonial) => (
        <p className="text-sm text-foreground/70 line-clamp-2 max-w-md">
          "{item.quote}"
        </p>
      ),
    },
    {
      key: 'result',
      header: 'Resultado',
      render: (item: Testimonial) => (
        <span className="text-xs text-foreground/60">
          {item.result || '-'}
        </span>
      ),
    },
    {
      key: 'services',
      header: 'Serviços',
      render: (item: Testimonial) => {
        const services = item.service_slugs || [];
        if (services.length === 0) return <span className="text-xs text-foreground/40">-</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {services.map((slug) => {
              const service = AVAILABLE_SERVICES.find(s => s.slug === slug);
              return (
                <span key={slug} className="text-xs bg-secondary px-2 py-0.5">
                  {service?.label.split(' ')[0] || slug}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      key: 'actions',
      header: '',
      className: 'w-24',
      render: (item: Testimonial) => (
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
          <h1 className="text-3xl font-bold font-serif mb-2">Depoimentos</h1>
          <p className="text-foreground/60">Gerencie os depoimentos de clientes</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Depoimento
        </Button>
      </div>

      {/* Table */}
      <div className="bg-background border-2 border-border">
        <DataTable
          columns={columns}
          data={activeTestimonials}
          isLoading={isLoading}
          emptyMessage="Nenhum depoimento cadastrado"
          getRowKey={(t) => t.id}
          onRowClick={handleEdit}
        />
      </div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingId ? 'Editar Depoimento' : 'Novo Depoimento'}
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
                <Label htmlFor="role">Cargo</Label>
                <Input
                  id="role"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="result">Resultado</Label>
                <Input
                  id="result"
                  value={formData.result || ''}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  placeholder="Ex: +150% de conversão"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote">Depoimento *</Label>
              <Textarea
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Foto</Label>
              <ImageUploader
                value={formData.image_url || ''}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                category="testimonials"
              />
            </div>

            <div className="space-y-3">
              <Label>Exibir nas páginas de serviço</Label>
              <div className="grid grid-cols-2 gap-3">
                {AVAILABLE_SERVICES.map((service) => {
                  const isChecked = formData.service_slugs?.includes(service.slug) || false;
                  return (
                    <div key={service.slug} className="flex items-center gap-2">
                      <Checkbox
                        id={`service-${service.slug}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const currentSlugs = formData.service_slugs || [];
                          const newSlugs = checked
                            ? [...currentSlugs, service.slug]
                            : currentSlugs.filter((s) => s !== service.slug);
                          setFormData({ ...formData, service_slugs: newSlugs });
                        }}
                      />
                      <Label htmlFor={`service-${service.slug}`} className="text-sm font-normal cursor-pointer">
                        {service.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-foreground/50">
                Selecione em quais páginas de serviço este depoimento deve aparecer
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Destacado</Label>
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
                {editingId ? 'Salvar Alterações' : 'Criar Depoimento'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
