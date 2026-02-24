import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface UploadOptions {
  file: File;
  category?: string;
  altText?: string;
}

export function useMediaUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, category = 'general', altText }: UploadOptions) => {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      // Generate unique filename
      const ext = file.name.split('.').pop();
      const filename = `${category}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('site-media')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-media')
        .getPublicUrl(uploadData.path);

      // Save to media table
      const { data: mediaData, error: mediaError } = await supabase
        .from('media')
        .insert({
          filename: uploadData.path,
          public_url: publicUrl,
          alt_text: altText || file.name,
          category,
        })
        .select()
        .single();

      if (mediaError) throw mediaError;

      return {
        ...mediaData,
        publicUrl,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}

export function useMedia(category?: string) {
  return useMutation({
    mutationFn: async () => {
      if (!isSupabaseConfigured()) return [];

      let query = supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      // Get media info first
      const { data: media, error: fetchError } = await supabase
        .from('media')
        .select('filename')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('site-media')
        .remove([media.filename]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}
