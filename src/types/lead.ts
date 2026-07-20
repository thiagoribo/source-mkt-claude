// Tipos para integração com CRM

export interface LeadBase {
  full_name: string;
  email: string;
  whatsapp: string;
  company?: string;
  website?: string;
  notes?: string;
  source: string;
  service_interest: string;
  form_source: string;
  pipeline: string;
  stage: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  qualification_data?: Record<string, FormDataEntryValue>;
  requested_service?: FormSource;
}

export interface LeadBrandingEmpresarial extends LeadBase {
  has_identity_visual?: string;
  budget?: string;
}

export interface LeadBrandingPessoal extends LeadBase {
  area?: string;
  digital_presence?: string;
  budget?: string;
}

export interface LeadIdentidadeVisual extends LeadBase {
  has_strategy?: string;
}

export interface LeadGestaoRedes extends LeadBase {
  platforms?: string;
}

export type Lead =
  | LeadBrandingEmpresarial
  | LeadBrandingPessoal
  | LeadIdentidadeVisual
  | LeadGestaoRedes
  | LeadPosicionamento
  | LeadBase;

export interface LeadPosicionamento extends LeadBase {
  tipo_posicionamento?: string;
  tempo_mercado?: string;
  faturamento_range?: string;
  principal_dor?: string;
}

// Formulários disponíveis
export type FormSource =
  | 'candidatura-geral'
  | 'branding-empresarial'
  | 'branding-pessoal'
  | 'identidade-visual'
  | 'gestao-redes-sociais';

// Serviços disponíveis
export type ServiceInterest =
  | 'Candidatura Geral'
  | 'Branding Empresarial'
  | 'Branding Pessoal'
  | 'Identidade Visual'
  | 'Gestão de Redes Sociais';
