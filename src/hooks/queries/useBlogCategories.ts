import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BlogCategory, InsertBlogCategory } from '@/types/database';

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];

      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('display_order');

      if (error) throw error;
      return data as BlogCategory[];
    },
  });
}

export function useBlogCategory(id: string | undefined) {
  return useQuery({
    queryKey: ['blog-categories', id],
    queryFn: async () => {
      if (!isSupabaseConfigured() || !id) return null;

      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as BlogCategory;
    },
    enabled: !!id,
  });
}

export function useCreateBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: InsertBlogCategory) => {
      const { data, error } = await supabase
        .from('blog_categories')
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
    },
  });
}

export function useUpdateBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogCategory> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
    },
  });
}

export function useDeleteBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-categories'] });
    },
  });
}
