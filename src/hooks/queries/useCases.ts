import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Case, InsertCase } from '@/types/database';

export function useCases() {
  return useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];

      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      return data as Case[];
    },
  });
}

export function useCase(id: string | undefined) {
  return useQuery({
    queryKey: ['cases', id],
    queryFn: async () => {
      if (!isSupabaseConfigured() || !id) return null;

      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Case;
    },
    enabled: !!id,
  });
}

export function useCreateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (caseData: InsertCase) => {
      const { data, error } = await supabase
        .from('cases')
        .insert(caseData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
}

export function useUpdateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Case> & { id: string }) => {
      const { data, error } = await supabase
        .from('cases')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
}

export function useDeleteCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('cases')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
}
