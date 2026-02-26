import type { MockupRatio, MockupTheme } from "@/components/shared/ServiceMockupCard";
import ana1 from "@/assets/ana-foto.jpeg";
import team2 from "@/assets/team-2.png";
import thiago1 from "@/assets/thiago-1.png";

// Real case images
import likeBrandP18 from "@/assets/cases/branding/like-brand-p18.png";
import likeBrandP20 from "@/assets/cases/branding/like-brand-p20.png";
import clinicaPetraImg from "@/assets/cases/naming/clinica-petra.png";
import bpCase2 from "@/assets/cases/branding-pessoal/case-2.png";
import bpCase3 from "@/assets/cases/branding-pessoal/case-3.png";
import bpCase4 from "@/assets/cases/branding-pessoal/case-4.png";
import bpCase5 from "@/assets/cases/branding-pessoal/case-5.png";
import ivDrAnaPaula from "@/assets/cases/identidade-visual/dr-ana-paula.png";
import ivPasseiPonto from "@/assets/cases/identidade-visual/passei-ponto.png";
import ivPaesAdao from "@/assets/cases/identidade-visual/paes-adao.png";
import gestaoLike from "@/assets/cases/gestao-redes/like.png";
import gestaoJaqueline from "@/assets/cases/gestao-redes/jaqueline-vieira.png";
import gestaoLisia from "@/assets/cases/gestao-redes/lisia-heinen.png";

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
    title: "LIKE. BRAND",
    subtitle: "Branding institucional completo — identidade, posicionamento e sistema visual.",
    tag: "Moda & Lifestyle",
    evidence: "",
    imageSrc: likeBrandP18,
    ratio: "4/3",
    theme: "branding",
  },
  {
    title: "LIKE. BRAND",
    subtitle: "Sistema visual aplicado em redes sociais e materiais comerciais.",
    tag: "Social & Comercial",
    evidence: "",
    imageSrc: likeBrandP20,
    ratio: "4/3",
    theme: "branding",
  },
  {
    title: "Clínica Petra",
    subtitle: "Branding estratégico para clínica de saúde e estética.",
    tag: "Saúde & Estética",
    evidence: "",
    imageSrc: clinicaPetraImg,
    ratio: "4/3",
    theme: "branding",
  },
];

export const identidadeVisualMockups: ServiceMockupItem[] = [
  {
    title: "Dr. Ana Paula",
    subtitle: "Identidade visual estratégica para profissional de saúde.",
    tag: "Saúde",
    evidence: "",
    imageSrc: ivDrAnaPaula,
    ratio: "4/3",
    theme: "visual",
  },
  {
    title: "Passei e Ponto",
    subtitle: "Sistema visual aplicado para autoescola com posicionamento de resultado.",
    tag: "Educação",
    evidence: "",
    imageSrc: ivPasseiPonto,
    ratio: "4/3",
    theme: "visual",
  },
  {
    title: "Pães do Adão",
    subtitle: "Branding visual para negócio gastronômico artesanal.",
    tag: "Gastronomia",
    evidence: "",
    imageSrc: ivPaesAdao,
    ratio: "4/3",
    theme: "visual",
  },
];

export const gestaoSocialCases: ServiceMockupItem[] = [
  {
    title: "Like. Brand",
    subtitle: "Criação de 20 conteúdos estratégicos para marca de moda e lifestyle.",
    tag: "Moda & Lifestyle",
    evidence: "",
    imageSrc: gestaoLike,
    ratio: "16/10",
    theme: "social",
  },
  {
    title: "Jaqueline Vieira",
    subtitle: "Gestão e produção de conteúdo para profissional da advocacia.",
    tag: "Advocacia",
    evidence: "",
    imageSrc: gestaoJaqueline,
    ratio: "16/10",
    theme: "social",
  },
  {
    title: "Lísia Heinen",
    subtitle: "Estratégia e preview de feed para marca pessoal.",
    tag: "Marca Pessoal",
    evidence: "",
    imageSrc: gestaoLisia,
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
    imageSrc: ana1,
    ratio: "16/10",
    theme: "naming",
  },
  {
    title: "Pulso Lider",
    subtitle: "Antes: Curso de Lideranca Pro",
    tag: "Educacao",
    evidence: "Pronuncia 8.8/10",
    imageSrc: thiago1,
    ratio: "16/10",
    theme: "naming",
  },
  {
    title: "Casa Aurea",
    subtitle: "Antes: Moda Casa Online",
    tag: "E-commerce",
    evidence: "Diferenciacao 9.0/10",
    imageSrc: team2,
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
    title: "Case de Branding Pessoal",
    subtitle: "Construção de identidade e posicionamento estratégico.",
    tag: "Marca Pessoal",
    evidence: "",
    imageSrc: bpCase2,
    ratio: "3/4",
    theme: "personal",
  },
  {
    title: "Case de Branding Pessoal",
    subtitle: "Narrativa, linha editorial e manual de marca entregues.",
    tag: "Marca Pessoal",
    evidence: "",
    imageSrc: bpCase3,
    ratio: "3/4",
    theme: "personal",
  },
  {
    title: "Case de Branding Pessoal",
    subtitle: "Posicionamento e sistema visual para presença digital.",
    tag: "Marca Pessoal",
    evidence: "",
    imageSrc: bpCase4,
    ratio: "3/4",
    theme: "personal",
  },
  {
    title: "Case de Branding Pessoal",
    subtitle: "Construção de autoridade e presença digital estratégica.",
    tag: "Marca Pessoal",
    evidence: "",
    imageSrc: bpCase5,
    ratio: "3/4",
    theme: "personal",
  },
];
