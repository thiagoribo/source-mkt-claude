import type { MockupRatio, MockupTheme } from "@/components/shared/ServiceMockupCard";
import ana1 from "@/assets/ana-1.jpeg";
import ana2 from "@/assets/ana-2.jpeg";
import team1 from "@/assets/team-1.png";
import team2 from "@/assets/team-2.png";
import reference1 from "@/assets/reference-1.png";
import reference2 from "@/assets/reference-2.png";
import thiago1 from "@/assets/thiago-1.png";

export interface ServiceMockupItem {
  title: string;
  subtitle: string;
  tag: string;
  evidence: string;
  imageSrc: string;
  ratio: MockupRatio;
  theme: MockupTheme;
}

export interface SocialCycleItem {
  day: string;
  format: string;
  objective: string;
}

export interface KpiItem {
  label: string;
  value: string;
  progress: number;
}

export interface NamingScoreItem {
  label: string;
  value: string;
  progress: number;
}

export const brandingEmpresarialMockups: ServiceMockupItem[] = [
  {
    title: "Landing institucional premium",
    subtitle: "Estrutura editorial com narrativa de valor e prova de autoridade.",
    tag: "Website",
    evidence: "+41% tempo medio de leitura",
    imageSrc: reference1,
    ratio: "4/3",
    theme: "branding",
  },
  {
    title: "Sistema visual para redes",
    subtitle: "Templates com hierarquia clara para reconhecimento imediato da marca.",
    tag: "Social",
    evidence: "+63% consistencia visual no feed",
    imageSrc: ana2,
    ratio: "4/3",
    theme: "branding",
  },
  {
    title: "Apresentacao comercial executiva",
    subtitle: "Deck de vendas alinhado ao novo posicionamento da empresa.",
    tag: "Comercial",
    evidence: "+22% taxa de proposta aceita",
    imageSrc: team1,
    ratio: "4/3",
    theme: "branding",
  },
];

export const identidadeVisualMockups: ServiceMockupItem[] = [
  {
    title: "Interface institucional aplicada",
    subtitle: "Home com grade tipografica, paleta e iconografia coerentes.",
    tag: "Interface",
    evidence: "Consistencia cross-channel em 100%",
    imageSrc: reference2,
    ratio: "4/3",
    theme: "visual",
  },
  {
    title: "Kit institucional da marca",
    subtitle: "Cartao, assinatura e documento comercial com linguagem unificada.",
    tag: "Materiais",
    evidence: "Manual aplicado em 28 assets",
    imageSrc: team2,
    ratio: "4/3",
    theme: "visual",
  },
  {
    title: "Template social de campanha",
    subtitle: "Estrutura visual modular para conteudo recorrente.",
    tag: "Social",
    evidence: "+3.1x velocidade de producao",
    imageSrc: ana1,
    ratio: "4/3",
    theme: "visual",
  },
];

export const gestaoSocialCases: ServiceMockupItem[] = [
  {
    title: "Clinica Horizonte",
    subtitle: "Autoridade local e agenda qualificada via conteudo educativo semanal.",
    tag: "Saude",
    evidence: "+138% alcance qualificado em 90 dias",
    imageSrc: ana2,
    ratio: "16/10",
    theme: "social",
  },
  {
    title: "TechFlow B2B",
    subtitle: "Posicionamento no LinkedIn com pauta de decisor e funil de demanda.",
    tag: "B2B",
    evidence: "42 MQLs vindos de conteudo",
    imageSrc: thiago1,
    ratio: "16/10",
    theme: "social",
  },
  {
    title: "Atelie Sienna",
    subtitle: "Reposicionamento de valor com trilhas editoriais orientadas a premium.",
    tag: "Varejo",
    evidence: "+67% pedidos sem desconto",
    imageSrc: reference1,
    ratio: "16/10",
    theme: "social",
  },
];

export const socialEditorialCycle: SocialCycleItem[] = [
  { day: "Segunda", format: "Reel educativo", objective: "Atracao qualificada" },
  { day: "Quarta", format: "Case com prova social", objective: "Autoridade" },
  { day: "Sexta", format: "Oferta + CTA", objective: "Conversao" },
];

export const socialDashboardKpis: KpiItem[] = [
  { label: "Alcance qualificado", value: "+82%", progress: 82 },
  { label: "Engajamento estrategico", value: "+46%", progress: 46 },
  { label: "Leads por conteudo", value: "3.4x", progress: 74 },
];

export const namingCases: ServiceMockupItem[] = [
  {
    title: "VitaNexo",
    subtitle: "Antes: Sistema Medico SP",
    tag: "Healthtech",
    evidence: "Memorabilidade 9.2/10",
    imageSrc: reference2,
    ratio: "16/10",
    theme: "naming",
  },
  {
    title: "Pulso Lider",
    subtitle: "Antes: Curso de Lideranca Pro",
    tag: "Educacao",
    evidence: "Pronuncia 8.8/10",
    imageSrc: team1,
    ratio: "16/10",
    theme: "naming",
  },
  {
    title: "Casa Aurea",
    subtitle: "Antes: Moda Casa Online",
    tag: "E-commerce",
    evidence: "Diferenciacao 9.0/10",
    imageSrc: ana1,
    ratio: "16/10",
    theme: "naming",
  },
];

export const namingScorecard: NamingScoreItem[] = [
  { label: "Memorabilidade", value: "9.2/10", progress: 92 },
  { label: "Pronuncia", value: "8.7/10", progress: 87 },
  { label: "Diferenciacao", value: "9.0/10", progress: 90 },
  { label: "Aderencia estrategica", value: "8.9/10", progress: 89 },
  { label: "Disponibilidade digital", value: "8.4/10", progress: 84 },
];

export const brandingPessoalResults: ServiceMockupItem[] = [
  {
    title: "Consultora de Negocios",
    subtitle: "Narrativa e linha editorial reposicionadas para autoridade executiva.",
    tag: "Perfil especialista",
    evidence: "+210% convites para palestras",
    imageSrc: ana1,
    ratio: "3/4",
    theme: "personal",
  },
  {
    title: "Medico Especialista",
    subtitle: "Marca pessoal orientada a confianca e conversao de pacientes premium.",
    tag: "Perfil tecnico",
    evidence: "+74% leads organicos qualificados",
    imageSrc: team2,
    ratio: "3/4",
    theme: "personal",
  },
  {
    title: "Executiva C-Level",
    subtitle: "Posicionamento para conselho consultivo e oportunidades de alto nivel.",
    tag: "Perfil executivo",
    evidence: "3 propostas de advisory em 6 meses",
    imageSrc: thiago1,
    ratio: "3/4",
    theme: "personal",
  },
];
