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
}

export interface LeadConsultoria extends LeadBase {
  role?: string;
  revenue?: string;
  budget?: string;
  scope?: string[];
  modality?: string;
  timeline?: string;
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

export interface LeadNaming extends LeadBase {
  naming_type?: string;
}

export interface LeadGestaoRedes extends LeadBase {
  platforms?: string;
}

export type Lead =
  | LeadConsultoria
  | LeadBrandingEmpresarial
  | LeadBrandingPessoal
  | LeadIdentidadeVisual
  | LeadNaming
  | LeadGestaoRedes;

// Formulários disponíveis
export type FormSource =
  | 'consultoria-estrategica'
  | 'branding-empresarial'
  | 'branding-pessoal'
  | 'identidade-visual'
  | 'naming'
  | 'gestao-redes-sociais';

// Serviços disponíveis
export type ServiceInterest =
  | 'Consultoria Estratégica'
  | 'Branding Empresarial'
  | 'Branding Pessoal'
  | 'Identidade Visual'
  | 'Naming Estratégico'
  | 'Gestão de Redes Sociais';
