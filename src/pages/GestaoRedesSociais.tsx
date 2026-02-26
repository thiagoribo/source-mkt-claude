import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import {
  Check,
  X,
  Search,
  Calendar,
  PenTool,
  BarChart3,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ServiceMockupCard from "@/components/shared/ServiceMockupCard";
import ComparisonTable from "@/components/shared/ComparisonTable";
import { gestaoSocialCases, socialDashboardKpis, socialEditorialCycle } from "@/data/serviceMockups";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { useTestimonialsByService } from "@/hooks/queries/useTestimonials";

// Fotos dos clientes - Gestão de Redes Sociais (fallback images)
import monalisaOliveira from "@/assets/clientes/monalisa-oliveira.png";
import rebeccaSantos from "@/assets/clientes/rebecca-santos.png";
import glayceKerolin from "@/assets/clientes/glayce-kerolin.jpg";
import sabrinaKeller from "@/assets/clientes/sabrina-keller.jpeg";

// Map client names to their local images
const clientImageMap: Record<string, string> = {
  "Sabrina Keller": sabrinaKeller,
  "Monalisa Oliveira": monalisaOliveira,
  "Rebecca Santos": rebeccaSantos,
  "Glayce Kerolin": glayceKerolin,
};

// Fallback testimonials for when Supabase is unavailable
const fallbackTestimonials = [
  {
    id: 1,
    name: "Sabrina Keller",
    role: "Mentora de Mulheres e Palestrante",
    quote: "Atribuo minha posição atual ao apoio na gestão de redes sociais e orientação de posicionamento. Recebo mensagens diárias de interessadas.",
    result: "+150% faturamento, turmas sempre cheias",
    imageSrc: sabrinaKeller,
    thumbnailSrc: sabrinaKeller,
  },
  {
    id: 2,
    name: "Monalisa Oliveira",
    role: "Advogada (Portugal)",
    quote: "Trabalho incrível, personalizado e de altíssima qualidade.",
    result: "Materiais de conteúdo de excelência",
    imageSrc: monalisaOliveira,
    thumbnailSrc: monalisaOliveira,
  },
  {
    id: 3,
    name: "Rebecca Santos",
    role: "Advogada Tributária",
    quote: "Um trabalho incrível, personalizado e de alta qualidade.",
    result: "Conteúdo estratégico personalizado",
    imageSrc: rebeccaSantos,
    thumbnailSrc: rebeccaSantos,
  },
  {
    id: 4,
    name: "Glayce Kerolin",
    role: "Mentora e Psicanalista",
    quote: "Destaco o empenho da equipe em entregar soluções com profissionalismo.",
    result: "Soluções entregues com excelência",
    imageSrc: glayceKerolin,
    thumbnailSrc: glayceKerolin,
  },
];

/* ─── Hero ─── */
function Hero() {
  // Mini content grid decorative element
  const postTypes = [
    { type: "Carrossel", platform: "IG", color: "bg-accent/15 border-accent/25" },
    { type: "Reels", platform: "IG", color: "bg-primary/10 border-primary/20" },
    { type: "Artigo", platform: "LI", color: "bg-secondary border-border" },
    { type: "Story", platform: "IG", color: "bg-accent/15 border-accent/25" },
    { type: "Post", platform: "LI", color: "bg-secondary border-border" },
    { type: "Reels", platform: "IG", color: "bg-primary/10 border-primary/20" },
  ];

  return (
    <section className="section-spacing bg-background overflow-hidden relative">
      <div className="container-sm max-w-6xl">
        <RevealSection>
          <div className="relative lg:grid lg:grid-cols-[1fr_260px] lg:gap-16 lg:items-start">
            <div className="space-y-8">
              {/* Service label */}
              <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Gestão de Redes Sociais
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
                Presença digital{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  que gera
                </em>
                <br />
                <span className="text-primary">autoridade.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Transformamos sua presença digital em canal de posicionamento, autoridade e conversão com conteúdo estratégico alinhado à marca.
              </p>

              <p className="text-sm text-foreground/50">
                Focado em marcas com posicionamento já definido.{" "}
                <Link
                  to="/branding-empresarial"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Precisa de posicionamento primeiro? →
                </Link>
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Conversar Sobre Redes Sociais</a>
              </Button>
            </div>

            {/* Decorative mini content grid */}
            <div
              aria-hidden
              className="hidden lg:flex flex-col gap-2 mt-4 select-none pointer-events-none"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/25 mb-1">
                Calendário editorial
              </p>
              {postTypes.map((post, i) => (
                <div
                  key={i}
                  className={`border px-3 py-2.5 flex items-center justify-between gap-3 ${post.color}`}
                  style={{ opacity: 1 - i * 0.1 }}
                >
                  <span className="text-xs font-semibold text-foreground/60">{post.type}</span>
                  <span className="text-[10px] font-mono text-foreground/30 border border-border/40 px-1.5 py-0.5">
                    {post.platform}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois — tabela comparativa ─── */
const gestaoSocialRows = [
  { sem: "Posts sem estratégia ou calendário definido", com: "Calendário editorial estratégico e planejado" },
  { sem: "Conteúdo genérico e sem personalidade de marca", com: "Conteúdo que reflete o posicionamento" },
  { sem: "Baixo engajamento e alcance orgânico", com: "Crescimento orgânico consistente e mensurável" },
  { sem: "Sem clareza de métricas ou retorno", com: "Relatórios com métricas e análises claras" },
  { sem: "Comunicação desalinhada com a identidade", com: "Presença digital que gera autoridade e leads" },
];

function AntesDepois() {
  return (
    <ComparisonTable
      title="Antes e Depois"
      rows={gestaoSocialRows}
      beforeLabel="Sem Gestão Estratégica"
      afterLabel="Com Gestão SM Agency"
      className="bg-secondary"
    />
  );
}

/* ─── Processo — numerado, editorial ─── */
function Processo() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Análise e Diagnóstico",
      text: "Mapeamos a presença atual, analisamos concorrência e identificamos oportunidades de posicionamento nas redes.",
    },
    {
      num: "02",
      icon: Target,
      title: "Estratégia de Conteúdo",
      text: "Definimos pilares de conteúdo, formatos, tom de voz e objetivos para cada plataforma.",
    },
    {
      num: "03",
      icon: Calendar,
      title: "Planejamento Editorial",
      text: "Criamos calendário mensal com datas, formatos, temas e objetivos de negócio alinhados.",
    },
    {
      num: "04",
      icon: PenTool,
      title: "Criação e Publicação",
      text: "Produzimos conteúdo visual e textual, revisamos e publicamos nos horários ideais para cada rede.",
    },
    {
      num: "05",
      icon: BarChart3,
      title: "Análise e Otimização",
      text: "Monitoramos métricas, entregamos relatórios mensais e ajustamos a estratégia com base em dados reais.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Como Funciona</h2>
        </RevealSection>

        <div className="divide-y divide-border">
          {steps.map((s, i) => (
            <RevealSection key={s.title} delay={i * 80}>
              <div className="group flex gap-6 py-8 items-start cursor-default hover:bg-secondary/50 transition-colors -mx-6 px-6">
                <span
                  className="font-mono text-4xl font-bold leading-none flex-shrink-0 w-14 text-right pt-1"
                  style={{ color: "hsl(var(--foreground) / 0.08)" }}
                >
                  {s.num}
                </span>
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-lg leading-snug">{s.title}</h3>
                  <p className="text-foreground/55 text-sm leading-relaxed">{s.text}</p>
                </div>
                <s.icon className="h-5 w-5 text-foreground/15 group-hover:text-accent/60 transition-colors flex-shrink-0 mt-1.5" />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── O Que Inclui — lista com tracejados ─── */
function Entregaveis() {
  const items = [
    { icon: Calendar, title: "Calendário editorial mensal" },
    { icon: PenTool, title: "Criação de conteúdo visual e textual" },
    { icon: MessageSquare, title: "Gestão de comunidade e interações" },
    { icon: TrendingUp, title: "Relatórios de performance mensais" },
    { icon: Users, title: "Estratégia de crescimento orgânico" },
    { icon: Zap, title: "Otimização contínua baseada em dados" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">O Que Está Incluído</h2>
        </RevealSection>

        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 60}>
              <div className="flex items-center gap-4 py-5">
                <item.icon className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="font-semibold text-base">{item.title}</span>
                <div className="flex-1 border-t border-dashed border-border/50 mx-2" />
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Cases Simulados ─── */
function CasesSimulados() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Cases Simulados de Conteúdo</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Exemplos fictícios de como trabalhamos a produção e entrega de conteúdo para diferentes perfis de marca.
            </p>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {gestaoSocialCases.map((item, i) => (
            <RevealSection key={item.title} delay={i * 100}>
              <ServiceMockupCard
                title={item.title}
                subtitle={item.subtitle}
                tag={item.tag}
                evidence={item.evidence}
                imageSrc={item.imageSrc}
                ratio={item.ratio}
                theme={item.theme}
              />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Preview de Operação — calendário + KPIs ─── */
function PreviewOperacao() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-10 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Operação</p>
            <h2 className="text-3xl md:text-4xl font-bold">Preview da Operação</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Exemplo fictício de ciclo editorial semanal e painel de KPIs mensal.
            </p>
          </div>
        </RevealSection>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Calendário editorial */}
          <RevealSection>
            <div className="border border-border bg-background overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-secondary/40 flex items-center justify-between">
                <h3 className="font-semibold text-sm">Calendário Editorial — Semana Tipo</h3>
                <Calendar className="h-4 w-4 text-foreground/30" />
              </div>
              <div className="divide-y divide-border">
                {socialEditorialCycle.map((item, i) => (
                  <div key={item.day} className="px-5 py-4 flex items-start gap-4 hover:bg-secondary/30 transition-colors">
                    <span className="text-xs font-mono font-bold text-foreground/40 pt-0.5 w-10 flex-shrink-0">
                      {item.day}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{item.format}</span>
                        <span
                          className="text-[10px] font-mono px-1.5 py-0.5 border border-accent/30 text-accent/70"
                          style={{ backgroundColor: "hsl(var(--accent) / 0.08)" }}
                        >
                          {i % 2 === 0 ? "Instagram" : "LinkedIn"}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/45 mt-0.5">Objetivo: {item.objective}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* KPIs */}
          <RevealSection delay={100}>
            <div className="border border-border bg-background overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-secondary/40 flex items-center justify-between">
                <h3 className="font-semibold text-sm">Painel de KPIs — Mês Simulado</h3>
                <BarChart3 className="h-4 w-4 text-foreground/30" />
              </div>
              <div className="divide-y divide-border">
                {socialDashboardKpis.map((kpi) => (
                  <div key={kpi.label} className="px-5 py-4 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground/65">{kpi.label}</span>
                      <span className="font-bold text-primary font-mono text-sm">{kpi.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary/60 transition-all duration-700"
                        style={{ width: `${kpi.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Investimento — secão escura ─── */
function Investimento() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <span
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 font-bold font-serif leading-none select-none pointer-events-none hidden lg:block"
        style={{ opacity: 0.05, fontSize: "160px" }}
      >
        SM
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase opacity-50">Investimento</p>
              <p className="text-6xl md:text-7xl font-bold font-serif leading-none">
                R$1.597
                <span className="text-3xl font-normal opacity-60">/mês</span>
              </p>
              <p className="text-primary-foreground/50 text-sm">
                A partir de — Contrato mínimo: 6 meses
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none text-base px-8 h-12 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
              asChild
            >
              <a href="#formulario" className="flex items-center gap-2">
                Solicitar Proposta <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Formulário ─── */
function Formulario() {
  const [submitted, setSubmitted] = useState(false);
  const { submitLead, isLoading } = useSubmitLead('gestao-redes-sociais');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const result = await submitLead({
      full_name: formData.get('name') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('phone') as string,
      company: formData.get('company') as string,
      platforms: formData.get('platforms') as string,
      notes: formData.get('details') as string,
    });

    if (result.success) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="formulario" className="section-spacing bg-background">
        <div className="container-sm max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Solicitação Enviada!</h2>
          <p className="text-foreground/60">Entraremos em contato em até 48h úteis.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-spacing bg-background">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Orçamento</p>
            <h2 className="text-3xl md:text-4xl font-bold">Vamos Conversar Sobre Suas Redes?</h2>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 border border-border p-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input id="name" name="name" required placeholder="Seu nome" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="seu@empresa.com" className="rounded-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" name="phone" required placeholder="(11) 99999-9999" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa *</Label>
                <Input id="company" name="company" required placeholder="Sua empresa" className="rounded-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="platforms">Quais plataformas utiliza? *</Label>
              <Input
                id="platforms"
                name="platforms"
                required
                placeholder="Instagram, LinkedIn, Facebook..."
                className="rounded-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">O que espera da gestão de redes?</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Descreva seus objetivos e o que está faltando hoje..."
                rows={3}
                className="rounded-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-none text-base h-12" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Solicitar Proposta'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Ao enviar, você concorda com nossa Política de Privacidade.
            </p>
          </form>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */
/* ─── Depoimentos ─── */
function Depoimentos() {
  const { data: supabaseTestimonials } = useTestimonialsByService('gestao-redes-sociais');

  // Transform Supabase data to match TestimonialSlider format, or use fallback
  const testimonials = supabaseTestimonials && supabaseTestimonials.length > 0
    ? supabaseTestimonials.map((t, i) => ({
        id: i + 1,
        name: t.name,
        role: t.role || '',
        quote: t.quote,
        result: t.result || '',
        imageSrc: t.image_url || clientImageMap[t.name] || sabrinaKeller,
        thumbnailSrc: t.image_url || clientImageMap[t.name] || sabrinaKeller,
      }))
    : fallbackTestimonials;

  return (
    <TestimonialSlider
      reviews={testimonials}
      title="Resultados nas Redes Sociais"
      subtitle="Clientes que transformaram sua presença digital com gestão estratégica"
    />
  );
}

export default function GestaoRedesSociais() {
  return (
    <>
      <Hero />
      <AntesDepois />
      <Processo />
      <Entregaveis />
      <CasesSimulados />
      <PreviewOperacao />
      <Investimento />
      <Depoimentos />
      <Formulario />
    </>
  );
}
