import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BlogPost, InsertBlogPost, BlogPostWithRelations } from '@/types/database';

export function useBlogPosts(options?: { status?: string; limit?: number }) {
  return useQuery({
    queryKey: ['blog-posts', options],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];

      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          author:team_members(*)
        `)
        .order('created_at', { ascending: false });

      if (options?.status) {
        query = query.eq('status', options.status);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as BlogPostWithRelations[];
    },
  });
}

export function useBlogPost(idOrSlug: string | undefined) {
  return useQuery({
    queryKey: ['blog-posts', idOrSlug],
    queryFn: async () => {
      if (!isSupabaseConfigured() || !idOrSlug) return null;

      // Try by ID first, then by slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*),
          author:team_members(*)
        `)
        .eq(isUuid ? 'id' : 'slug', idOrSlug)
        .single();

      if (error) throw error;
      return data as BlogPostWithRelations;
    },
    enabled: !!idOrSlug,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: InsertBlogPost) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function usePublishBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useIncrementPostViews() {
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.rpc('increment_post_views', { post_id: id });
      if (error) throw error;
    },
  });
}
