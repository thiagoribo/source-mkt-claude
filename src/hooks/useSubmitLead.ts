import { useState } from 'react';
import { supabaseCRM, isCRMConfigured } from '@/lib/supabase-crm';
import type { Lead, FormSource, ServiceInterest } from '@/types/lead';

interface SubmitLeadResult {
  success: boolean;
  error?: string;
}

interface UseSubmitLeadReturn {
  submitLead: (data: Partial<Lead>) => Promise<SubmitLeadResult>;
  isLoading: boolean;
  error: string | null;
}

const SERVICE_LABELS: Record<FormSource, ServiceInterest> = {
  'consultoria-estrategica': 'Consultoria Estratégica',
  'branding-empresarial': 'Branding Empresarial',
  'branding-pessoal': 'Branding Pessoal',
  'identidade-visual': 'Identidade Visual',
  'naming': 'Naming Estratégico',
  'gestao-redes-sociais': 'Gestão de Redes Sociais',
};

export function useSubmitLead(formSource: FormSource): UseSubmitLeadReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (formData: Partial<Lead>): Promise<SubmitLeadResult> => {
    setIsLoading(true);
    setError(null);

    // Se CRM não está configurado, simular sucesso (ambiente de dev)
    if (!isCRMConfigured()) {
      console.warn('CRM não configurado. Dados do lead:', formData);
      setIsLoading(false);
      return { success: true };
    }

    try {
      const leadData: Partial<Lead> = {
        ...formData,
        source: 'Site SM Agency',
        service_interest: SERVICE_LABELS[formSource],
        form_source: formSource,
        pipeline: 'novo-site',
        stage: 'novo lead',
      };

      const { error: insertError } = await supabaseCRM
        .from('leads')
        .insert(leadData);

      if (insertError) {
        console.error('Erro ao enviar lead:', insertError);
        setError('Erro ao enviar formulário. Tente novamente.');
        setIsLoading(false);
        return { success: false, error: insertError.message };
      }

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro ao enviar lead:', err);
      setError('Erro ao enviar formulário. Tente novamente.');
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { submitLead, isLoading, error };
}
