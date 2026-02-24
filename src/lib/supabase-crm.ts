import { createClient } from '@supabase/supabase-js';

const CRM_SUPABASE_URL = import.meta.env.VITE_CRM_SUPABASE_URL;
const CRM_SUPABASE_ANON_KEY = import.meta.env.VITE_CRM_SUPABASE_ANON_KEY;

// Debug: verificar se variáveis estão carregadas
console.log('[CRM] URL configurada?', !!CRM_SUPABASE_URL);
console.log('[CRM] Key configurada?', !!CRM_SUPABASE_ANON_KEY);

export const supabaseCRM = createClient(
  CRM_SUPABASE_URL || '',
  CRM_SUPABASE_ANON_KEY || ''
);

export function isCRMConfigured(): boolean {
  return !!(CRM_SUPABASE_URL && CRM_SUPABASE_ANON_KEY);
}
