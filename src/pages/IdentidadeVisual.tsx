import { Helmet } from "react-helmet-async";
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
  Layers,
  PenTool,
  Grid3X3,
  BookOpen,
  Palette,
  Type,
  Shapes,
  Image,
  FileText,
  ArrowRight,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ComparisonTable from "@/components/shared/ComparisonTable";
import CasesCarousel from "@/components/shared/CasesCarousel";
import { identidadeVisualMockups } from "@/data/serviceMockups";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { useTestimonialsByService } from "@/hooks/queries/useTestimonials";

// Fotos dos clientes - Identidade Visual (fallback images)
import beatrizGarcia from "@/assets/clientes/beatriz-garcia.webp";
import guilhermeMoeller from "@/assets/clientes/guilherme-moeller.webp";
import jessicaFrasson from "@/assets/clientes/jessica-frasson.webp";
import milenaPandolfi from "@/assets/clientes/milena-pandolfi.webp";

// Map client names to their local images
const clientImageMap: Record<string, string> = {
  "Beatriz Garcia": beatrizGarcia,
  "Guilherme Moeller": guilhermeMoeller,
  "Jéssica Frasson": jessicaFrasson,
  "Dra. Milena Pandolfi": milenaPandolfi,
};

// Fallback testimonials for when Supabase is unavailable
const fallbackTestimonials = [
  {
    id: 1,
    name: "Beatriz Garcia",
    role: "Advogada",
    quote: "O resultado superou todas as expectativas e combinou perfeitamente com minha identidade. Agora sinto que posso dominar o mundo!",
    result: "Marca do escritório alavancada",
    imageSrc: beatrizGarcia,
    thumbnailSrc: beatrizGarcia,
  },
  {
    id: 2,
    name: "Guilherme Moeller",
    role: "Treinador e Palestrante — Furu",
    quote: "Atendimento com muita atenção e soluções que atenderam perfeitamente os sócios.",
    result: "Soluções adequadas para todos",
    imageSrc: guilhermeMoeller,
    thumbnailSrc: guilhermeMoeller,
  },
  {
    id: 3,
    name: "Jéssica Frasson",
    role: "Fisioterapeuta",
    quote: "Agenda sempre lotada e aumento significativo no ticket dos meus serviços.",
    result: "Espaço próprio inaugurado",
    imageSrc: jessicaFrasson,
    thumbnailSrc: jessicaFrasson,
  },
  {
    id: 4,
    name: "Dra. Milena Pandolfi",
    role: "Médica Alergista e Imunologista",
    quote: "Uma palavra resume o trabalho: clareza e direcionamento.",
    result: "Agenda de pacientes preenchida",
    imageSrc: milenaPandolfi,
    thumbnailSrc: milenaPandolfi,
  },
];

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="section-spacing bg-background overflow-hidden relative">
      <div className="container-sm max-w-6xl">
        <RevealSection>
          <div className="relative">
            {/* Ghosted decorative monogram */}
            <span
              aria-hidden
              className="absolute -top-8 right-0 text-[180px] leading-none font-bold font-serif select-none pointer-events-none hidden lg:block"
              style={{ opacity: 0.035, letterSpacing: "-0.04em", color: "currentColor" }}
            >
              SM
            </span>

            <div className="relative max-w-3xl space-y-8">
              {/* Service label */}
              <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Identidade Visual
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
                Sistemas visuais{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  que comunicam
                </em>
                <br />
                <span className="text-primary">estratégia.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Transformamos plataformas de marca em identidades memoráveis, coerentes e aplicáveis em todos os pontos de contato.
              </p>

              <p className="text-sm text-foreground/50">
                Serviço para empresas com estratégia de marca já definida.{" "}
                <Link
                  to="/branding-empresarial"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Ainda não tem? Comece pelo Branding →
                </Link>
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Solicitar Orçamento</a>
              </Button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois — tabela comparativa ─── */
const identidadeVisualRows = [
  { sem: "Logo solto sem aplicação coerente", com: "Identidade consistente em todos os pontos de contato" },
  { sem: "Marca visualmente genérica", com: "Visual marcante, diferenciado e memorável" },
  { sem: "Comunicação desalinhada com a estratégia", com: "Expressão visual clara do posicionamento" },
  { sem: "Dificuldade em se destacar da concorrência", com: "Reconhecimento e valorização da marca" },
  { sem: "Sem manual de diretrizes de uso", com: "Manual completo e fácil de aplicar" },
  { sem: "Dúvidas constantes na hora de aplicar", com: "Clareza, coesão e profissionalismo em tudo" },
];

function AntesDepois() {
  return (
    <ComparisonTable
      title="Antes e Depois"
      rows={identidadeVisualRows}
      beforeLabel="Sem Sistema Profissional"
      afterLabel="Com Sistema SM"
      className="bg-secondary"
    />
  );
}

/* ─── Processo — lista numerada editorial ─── */
function Processo() {
  const steps = [
    { num: "01", icon: Search, title: "Imersão na Marca", text: "Entendemos estratégia, propósito, diferenciais e público-alvo antes de criar qualquer elemento visual." },
    { num: "02", icon: Layers, title: "Estratégia Visual", text: "Traduzimos a estratégia de marca em conceitos visuais, moodboards e referências estéticas." },
    { num: "03", icon: PenTool, title: "Criação do Logotipo", text: "Desenvolvemos símbolo, wordmark, paleta de cores, tipografia e variações do logo." },
    { num: "04", icon: Grid3X3, title: "Sistema de Identidade", text: "Criamos aplicações, texturas, ícones e elementos gráficos complementares do sistema." },
    { num: "05", icon: BookOpen, title: "Manual de Identidade", text: "Entregamos guia completo com regras de uso para aplicação consistente da marca." },
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
                  className="font-mono text-4xl font-bold leading-none flex-shrink-0 w-14 text-right pt-1 transition-colors"
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

/* ─── Entregáveis — lista com tracejados ─── */
function Entregaveis() {
  const items = [
    { icon: PenTool, title: "Logotipo principal + variações" },
    { icon: Palette, title: "Paleta de cores completa" },
    { icon: Type, title: "Tipografia primária e secundária" },
    { icon: Shapes, title: "Padrões e elementos gráficos" },
    { icon: Image, title: "Aplicações em mockups realistas" },
    { icon: FileText, title: "Manual de identidade visual (PDF)" },
    { icon: Layers, title: "Projeção de 20 conteúdos personalizados para o seu perfil e nicho, e pontos de contato" },
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

/* ─── Galeria Mockups ─── */
function GaleriaMockups() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Sistema Visual Aplicado</h2>
            <p className="text-foreground/55 max-w-xl text-sm">
              A mesma linguagem gráfica aplicada em interface digital, materiais institucionais e social media.
            </p>
          </div>
        </RevealSection>

        <CasesCarousel items={identidadeVisualMockups} />
      </div>
    </section>
  );
}

/* ─── Investimento — secão escura de contraste ─── */
function Investimento() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative large text */}
      <span
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 text-[160px] font-bold font-serif leading-none select-none pointer-events-none hidden lg:block"
        style={{ opacity: 0.05 }}
      >
        R$
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase opacity-50">Investimento</p>
              <p className="text-6xl md:text-7xl font-bold font-serif leading-none">
                R$8.000
              </p>
              <p className="text-primary-foreground/50 text-sm">
                A partir de — Prazo: 4 a 6 semanas
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:items-end">
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
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Formulário ─── */
function Formulario() {
  const [submitted, setSubmitted] = useState(false);
  const { submitLead, isLoading } = useSubmitLead('identidade-visual');
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
      has_strategy: formData.get('has-strategy') as string,
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
            <h2 className="text-3xl md:text-4xl font-bold">Solicitar Orçamento</h2>
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
              <Label htmlFor="has-strategy">Você já tem estratégia de marca definida? *</Label>
              <select
                id="has-strategy"
                name="has-strategy"
                required
                className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Selecione</option>
                <option value="Sim, já tenho">Sim, já tenho</option>
                <option value="Parcialmente">Parcialmente</option>
                <option value="Não, preciso construir">Não, preciso construir</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Detalhes do projeto</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Descreva brevemente o que precisa..."
                rows={3}
                className="rounded-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-none text-base h-12" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Solicitar Orçamento'}
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
  const { data: supabaseTestimonials } = useTestimonialsByService('identidade-visual');

  // Transform Supabase data to match TestimonialSlider format, or use fallback
  const testimonials = supabaseTestimonials && supabaseTestimonials.length > 0
    ? supabaseTestimonials.map((t, i) => ({
        id: i + 1,
        name: t.name,
        role: t.role || '',
        quote: t.quote,
        result: t.result || '',
        imageSrc: t.image_url || clientImageMap[t.name] || beatrizGarcia,
        thumbnailSrc: t.image_url || clientImageMap[t.name] || beatrizGarcia,
      }))
    : fallbackTestimonials;

  return (
    <TestimonialSlider
      reviews={testimonials}
      title="Identidades que Marcam"
      subtitle="Clientes que transformaram a percepção de suas marcas com design estratégico"
    />
  );
}

export default function IdentidadeVisual() {
  return (
    <>
      <Helmet>
        <title>Identidade Visual Profissional para Empresas | SM Agency</title>
        <meta name="description" content="Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico alinhado ao posicionamento do seu negócio." />
        <link rel="canonical" href="https://sourcemkt.com.br/identidade-visual" />
        <meta property="og:title" content="Identidade Visual Profissional para Empresas | SM Agency" />
        <meta property="og:description" content="Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico." />
        <meta property="og:url" content="https://sourcemkt.com.br/identidade-visual" />
      </Helmet>
      <Hero />
      <AntesDepois />
      <Processo />
      <Entregaveis />
      <GaleriaMockups />
      {/* <Investimento /> — preço oculto, backup em src/_pricing-backup/investimento-identidade-visual.tsx */}
      <Depoimentos />
      <Formulario />
    </>
  );
}
