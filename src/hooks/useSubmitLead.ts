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
  'candidatura-geral': 'Candidatura Geral',
  'branding-empresarial': 'Branding Empresarial',
  'branding-pessoal': 'Branding Pessoal',
  'identidade-visual': 'Identidade Visual',
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
      setIsLoading(false);
      return { success: true };
    }

    try {
      const resolvedService = formData.requested_service ?? formSource;
      const leadData: Partial<Lead> & { workspace_id: string } = {
        ...formData,
        workspace_id: 'f1d7cfc8-88a0-4b8a-8812-381f42b1e3aa',
        source: 'Site SM Agency',
        service_interest: SERVICE_LABELS[resolvedService],
        form_source: formSource,
        pipeline: 'new_lead',
        stage: 'New Lead',
      };

      let { error: insertError } = await supabaseCRM
        .from('leads')
        .insert(leadData);

      // Compatibilidade durante a implantação da migration do CRM: preserva
      // todas as respostas no campo notes até as colunas estruturadas existirem.
      if (insertError && /qualification_data|requested_service/i.test(insertError.message)) {
        const { qualification_data, requested_service, ...legacyLeadData } = leadData;
        const qualificationNotes = qualification_data
          ? `\n\n[Candidatura]\n${Object.entries(qualification_data)
              .map(([key, value]) => `${key}: ${String(value)}`)
              .join('\n')}`
          : '';

        const fallback = await supabaseCRM.from('leads').insert({
          ...legacyLeadData,
          notes: `${legacyLeadData.notes ?? ''}${qualificationNotes}`.trim(),
        });
        insertError = fallback.error;
      }

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
