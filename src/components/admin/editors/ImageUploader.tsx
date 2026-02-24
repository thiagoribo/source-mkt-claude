import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMediaUpload } from '@/hooks/useMediaUpload';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  category?: string;
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  category = 'general',
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const uploadMutation = useMediaUpload();

  // Sync preview with value prop when it changes (e.g., when editing dialog opens)
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Show preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      try {
        const result = await uploadMutation.mutateAsync({
          file,
          category,
        });
        onChange(result.publicUrl);
        setPreview(result.publicUrl);
      } catch {
        setPreview(value || null);
      }
    },
    [category, onChange, uploadMutation, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    disabled: uploadMutation.isPending,
  });

  const handleRemove = () => {
    setPreview(null);
    onChange('');
  };

  return (
    <div className={cn('relative', className)}>
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover border-2 border-border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
          {uploadMutation.isPending && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed border-border p-8 text-center cursor-pointer transition-colors',
            isDragActive && 'border-primary bg-primary/5',
            uploadMutation.isPending && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {uploadMutation.isPending ? (
              <Loader2 className="w-8 h-8 animate-spin text-foreground/40" />
            ) : (
              <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                {isDragActive ? (
                  <Upload className="w-6 h-6 text-primary" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-foreground/40" />
                )}
              </div>
            )}
            <p className="text-sm text-foreground/60">
              {isDragActive
                ? 'Solte a imagem aqui'
                : 'Arraste uma imagem ou clique para selecionar'}
            </p>
            <p className="text-xs text-foreground/40">PNG, JPG, GIF ou WebP</p>
          </div>
        </div>
      )}

      {uploadMutation.isError && (
        <p className="text-sm text-destructive mt-2">
          Erro ao fazer upload. Tente novamente.
        </p>
      )}
    </div>
  );
}
