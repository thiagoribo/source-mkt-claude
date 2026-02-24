import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Testimonial, InsertTestimonial } from '@/types/database';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

export function useTestimonialsByService(serviceSlug: string) {
  return useQuery({
    queryKey: ['testimonials', 'service', serviceSlug],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .contains('service_slugs', [serviceSlug])
        .order('display_order');

      if (error) throw error;
      return data as Testimonial[];
    },
    enabled: !!serviceSlug,
  });
}

export function useTestimonial(id: string | undefined) {
  return useQuery({
    queryKey: ['testimonials', id],
    queryFn: async () => {
      if (!isSupabaseConfigured() || !id) return null;

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Testimonial;
    },
    enabled: !!id,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonial: InsertTestimonial) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Testimonial> & { id: string }) => {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
}
