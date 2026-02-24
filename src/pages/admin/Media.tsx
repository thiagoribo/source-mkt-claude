import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useMediaUpload, useDeleteMedia } from '@/hooks/useMediaUpload';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Trash2, Copy, Loader2, Search, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { Media } from '@/types/database';

export default function MediaPage() {
  const [search, setSearch] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const { data: media = [], isLoading, refetch } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];

      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Media[];
    },
  });

  const uploadMutation = useMediaUpload();
  const deleteMutation = useDeleteMedia();

  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        await uploadMutation.mutateAsync({ file, category: 'general' });
        toast.success(`${file.name} enviado com sucesso`);
      } catch {
        toast.error(`Erro ao enviar ${file.name}`);
      }
    }
    refetch();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    disabled: uploadMutation.isPending,
  });

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copiada para a área de transferência');
  };

  const handleDelete = async (media: Media) => {
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;

    try {
      await deleteMutation.mutateAsync(media.id);
      toast.success('Imagem excluída com sucesso');
      setSelectedMedia(null);
      refetch();
    } catch {
      toast.error('Erro ao excluir imagem');
    }
  };

  const filteredMedia = media.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.alt_text?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Biblioteca de Mídia</h1>
          <p className="text-foreground/60">Gerencie as imagens do site</p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed border-border p-8 mb-8 text-center cursor-pointer transition-colors',
          isDragActive && 'border-primary bg-primary/5',
          uploadMutation.isPending && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {uploadMutation.isPending ? (
            <Loader2 className="w-10 h-10 animate-spin text-foreground/40" />
          ) : (
            <div className="w-16 h-16 bg-secondary flex items-center justify-center">
              <Upload className="w-8 h-8 text-foreground/40" />
            </div>
          )}
          <div>
            <p className="font-medium">
              {isDragActive ? 'Solte as imagens aqui' : 'Arraste imagens ou clique para selecionar'}
            </p>
            <p className="text-sm text-foreground/50 mt-1">PNG, JPG, GIF ou WebP</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar imagens..."
          className="pl-10"
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-foreground/40" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-12 text-foreground/60">
          {search ? 'Nenhuma imagem encontrada' : 'Nenhuma imagem na biblioteca'}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className={cn(
                'aspect-square bg-secondary overflow-hidden cursor-pointer border-2 transition-all',
                selectedMedia?.id === item.id ? 'border-primary' : 'border-transparent hover:border-border'
              )}
            >
              <img
                src={item.public_url}
                alt={item.alt_text || ''}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Selected Media Panel */}
      {selectedMedia && (
        <div className="fixed inset-y-0 right-0 w-80 bg-background border-l-2 border-border p-6 shadow-lg overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold font-serif">Detalhes</h3>
            <button onClick={() => setSelectedMedia(null)} className="p-1 hover:bg-secondary">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="aspect-square bg-secondary overflow-hidden mb-6">
            <img
              src={selectedMedia.public_url}
              alt={selectedMedia.alt_text || ''}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-foreground/50 mb-1">Nome do arquivo</p>
              <p className="text-sm break-all">{selectedMedia.filename.split('/').pop()}</p>
            </div>

            <div>
              <p className="text-xs text-foreground/50 mb-1">Categoria</p>
              <p className="text-sm">{selectedMedia.category || 'Geral'}</p>
            </div>

            <div>
              <p className="text-xs text-foreground/50 mb-1">Data de upload</p>
              <p className="text-sm">
                {new Date(selectedMedia.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <div>
              <p className="text-xs text-foreground/50 mb-2">URL</p>
              <div className="flex gap-2">
                <Input
                  value={selectedMedia.public_url}
                  readOnly
                  className="text-xs"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyUrl(selectedMedia.public_url)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full mt-6"
              onClick={() => handleDelete(selectedMedia)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Imagem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
