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
  Target,
  MessageSquare,
  BookOpen,
  Award,
  Compass,
  Palette,
  Volume2,
  FileText,
  ArrowRight,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ServiceMockupCard from "@/components/shared/ServiceMockupCard";
import ComparisonTable from "@/components/shared/ComparisonTable";
import { brandingEmpresarialMockups } from "@/data/serviceMockups";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { useTestimonialsByService } from "@/hooks/queries/useTestimonials";

// Fotos dos clientes - Branding Empresarial (fallback images)
import beatrizGarcia from "@/assets/clientes/beatriz-garcia.jpeg";
import daianeFurlanetto from "@/assets/clientes/daiane-furlanetto.jpeg";
import jaquelineVieira from "@/assets/clientes/jaqueline-vieira.jpg";
import renataImaoka from "@/assets/clientes/renata-imaoka.jpeg";
import marinaRosso from "@/assets/clientes/marina-rosso.png";
import lumaSchmitti from "@/assets/clientes/luma-schmitti.png";

// Map client names to their local images
const clientImageMap: Record<string, string> = {
  "Beatriz Garcia": beatrizGarcia,
  "Daiane Furlanetto": daianeFurlanetto,
  "Jaqueline Vieira": jaquelineVieira,
  "Renata Imaoka": renataImaoka,
  "Marina Rosso": marinaRosso,
  "Luma Schmitti": lumaSchmitti,
};

// Fallback testimonials for when Supabase is unavailable
const fallbackTestimonials = [
  {
    id: 1,
    name: "Beatriz Garcia",
    role: "Advogada",
    quote: "O resultado superou todas as expectativas e combinou perfeitamente com minha identidade. Agora sinto que posso dominar o mundo!",
    result: "Time cresceu 200%",
    imageSrc: beatrizGarcia,
    thumbnailSrc: beatrizGarcia,
  },
  {
    id: 2,
    name: "Daiane Furlanetto",
    role: "Advogada e Sócia de Escritório",
    quote: "Extremamente competente. Recebi um tratamento único que acertou desde o tom de voz até a identidade visual. Recomendo com total confiança.",
    result: "Posicionamento estratégico consistente",
    imageSrc: daianeFurlanetto,
    thumbnailSrc: daianeFurlanetto,
  },
  {
    id: 3,
    name: "Jaqueline Vieira",
    role: "Proprietária de Franquia",
    quote: "A SM. Agency acerta em cheio onde grandes players do mercado erram. Pontualidade e cumprimento do calendário são diferenciais reais.",
    result: "Marca pessoal insubstituível",
    imageSrc: jaquelineVieira,
    thumbnailSrc: jaquelineVieira,
  },
  {
    id: 4,
    name: "Renata Imaoka",
    role: "CEO da HM Tour & ELO8 Assessoria",
    quote: "Cliente há 4 anos. Me emocionei com a leitura perfeita da minha identidade transformada em marca. Ana enxerga além da superfície.",
    result: "Negócio expandido",
    imageSrc: renataImaoka,
    thumbnailSrc: renataImaoka,
  },
  {
    id: 5,
    name: "Marina Rosso",
    role: "Loja Like. Brand",
    quote: "O reposicionamento da empresa hoje colhe resultados positivos e consistentes.",
    result: "Reposicionamento bem-sucedido",
    imageSrc: marinaRosso,
    thumbnailSrc: marinaRosso,
  },
  {
    id: 6,
    name: "Luma Schmitti",
    role: "Professora e Mestre em Língua Portuguesa",
    quote: "Fiquei impressionada com o detalhamento do projeto. Aprendi que construir uma marca exige base, não apenas logo e posts.",
    result: "Projeto 'Passei e Ponto' criado",
    imageSrc: lumaSchmitti,
    thumbnailSrc: lumaSchmitti,
  },
];

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="section-spacing bg-background overflow-hidden relative">
      <div className="container-sm max-w-6xl">
        <RevealSection>
          <div className="relative">
            <span
              aria-hidden
              className="absolute -top-8 right-0 text-[180px] leading-none font-bold font-serif select-none pointer-events-none hidden lg:block"
              style={{ opacity: 0.035, letterSpacing: "-0.04em" }}
            >
              BE
            </span>

            <div className="relative max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Branding Empresarial
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
                A marca que justifica{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  preços premium
                </em>
                <br />
                <span className="text-primary">começa aqui.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Construímos a base estratégica que transforma empresas em marcas com significado, diferenciação e valor percebido no mercado.
              </p>

              <p className="text-sm text-foreground/50 max-w-lg leading-relaxed">
                Branding empresarial é o DNA da sua marca — propósito, posicionamento, valores e narrativa que guiam cada decisão de comunicação e negócio.
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Conversar Sobre Minha Marca</a>
              </Button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── O Que É — layout editorial em duas colunas ─── */
function OQueE() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-16 items-start">
            {/* Pull quote */}
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">O que é</p>
              <blockquote className="text-2xl md:text-3xl font-bold font-serif leading-snug text-foreground/80">
                "Não fazemos marca bonita. Fazemos marcas com alma e estratégia."
              </blockquote>
              <div className="h-px w-12 bg-accent mt-6" />
            </div>

            {/* Body text */}
            <div className="space-y-5 text-foreground/70 leading-relaxed text-sm md:text-base">
              <p>
                Branding empresarial é o processo de construir o DNA estratégico da sua marca — não apenas o que você vende, mas o que você representa no mercado. É aqui que nascem o propósito, a visão e a narrativa que sustentam sua presença.
              </p>
              <p>
                Na SM Agency, definimos os pilares que atraem o público certo, criam diferenciação real e transformam negócios em marcas com significado, autoridade e valor percebido.
              </p>
              <p className="text-foreground/50 text-sm border-l-2 border-border pl-4">
                Este não é um projeto cosmético de redesign. É trabalho estratégico profundo que redefine como sua empresa se posiciona, comunica e compete.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois — tabela comparativa ─── */
const brandingRows = [
  { sem: "Comunicação desconectada e sem personalidade", com: "Tom de voz único e alinhado com valores" },
  { sem: "Marca sem diferenciação clara no mercado", com: "Posicionamento claro que destaca seu negócio" },
  { sem: "Dificuldade de conectar com o público certo", com: "Narrativa que inspira, conecta e engaja" },
  { sem: "Ausência de clareza sobre missão, visão e valores", com: "Pilares estratégicos bem definidos e aplicáveis" },
  { sem: "Marca que vende, mas não se posiciona", com: "Marca com propósito, cultura e conexão verdadeira" },
  { sem: "Competição apenas por preço ou conveniência", com: "Justificativa sólida para preços premium" },
];

function AntesDepois() {
  return (
    <ComparisonTable
      title="Antes e Depois do Branding Estratégico"
      rows={brandingRows}
    />
  );
}

/* ─── Processo — numerado com duração ─── */
function Processo() {
  const steps = [
    { num: "01", icon: Search, title: "Diagnóstico e Imersão", text: "Entendemos o mercado, o negócio e oportunidades de posicionamento", duration: "2 semanas" },
    { num: "02", icon: Layers, title: "Estruturação Estratégica", text: "Propósito, missão, visão, valores, arquétipo e atributos de marca", duration: "3 semanas" },
    { num: "03", icon: Target, title: "Posicionamento e Diferenciação", text: "Proposta de valor, narrativa e promessa da marca no mercado", duration: "2 semanas" },
    { num: "04", icon: MessageSquare, title: "Tom de Voz e Personalidade", text: "Como a marca fala, se expressa e se relaciona com o público", duration: "1 semana" },
    { num: "05", icon: BookOpen, title: "Manual de Marca", text: "Documento completo e aplicável com toda a base estratégica", duration: "Entrega final" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Nosso Processo de Branding</h2>
        </RevealSection>

        <div className="divide-y divide-border">
          {steps.map((s, i) => (
            <RevealSection key={s.title} delay={i * 80}>
              <div className="group flex gap-6 py-8 items-start cursor-default hover:bg-background/60 transition-colors -mx-6 px-6">
                <span
                  className="font-mono text-4xl font-bold leading-none flex-shrink-0 w-14 text-right pt-1"
                  style={{ color: "hsl(var(--foreground) / 0.08)" }}
                >
                  {s.num}
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-lg leading-snug">{s.title}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/35 border border-border/50 px-2 py-0.5">
                      {s.duration}
                    </span>
                  </div>
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
    { icon: Award, title: "Plataforma de Marca Completa" },
    { icon: Compass, title: "Propósito, Missão, Visão e Valores" },
    { icon: Target, title: "Arquétipo e Personalidade de Marca" },
    { icon: Layers, title: "Posicionamento e Proposta de Valor" },
    { icon: Volume2, title: "Tom de Voz e Territórios de Comunicação" },
    { icon: FileText, title: "Manual de Marca (60-80 páginas)" },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">O Que Você Recebe</h2>
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

/* ─── Showcase Visual ─── */
function ShowcaseVisual() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Preview Visual do Projeto</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Composições fictícias para visualizar como o branding estratégico aparece em website, social e materiais comerciais.
            </p>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {brandingEmpresarialMockups.map((item, i) => (
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

/* ─── Investimento — seção escura ─── */
function InvestimentoBranding() {
  const factors = [
    "Complexidade do mercado e da competição",
    "Necessidade de pesquisa primária com stakeholders",
    "Arquitetura de marca (única vs. portfólio)",
    "Inclusão de identidade visual integrada",
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <span
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 font-bold font-serif leading-none select-none pointer-events-none hidden lg:block"
        style={{ opacity: 0.05, fontSize: "160px" }}
      >
        25k
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-end">
            <div className="space-y-6">
              <p className="text-xs font-mono tracking-widest uppercase opacity-50">Investimento</p>
              <p className="text-6xl md:text-7xl font-bold font-serif leading-none">R$25.000</p>
              <p className="text-primary-foreground/50 text-sm">A partir de — Duração: 6–8 semanas</p>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-mono uppercase tracking-widest opacity-50">O que influencia o valor</p>
                <div className="divide-y divide-primary-foreground/10">
                  {factors.map((f) => (
                    <div key={f} className="flex items-start gap-3 py-3">
                      <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                      <span className="text-sm text-primary-foreground/70">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="rounded-none text-base px-8 h-12 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors self-end"
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

/* ─── Comparação — callout editorial ─── */
function Comparacao() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="pl-6 border-l-2 border-accent space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">Qual serviço escolher?</p>
            <h3 className="text-xl font-bold">Branding Empresarial ou Consultoria Estratégica?</h3>
            <div className="space-y-3 text-sm text-foreground/65 leading-relaxed">
              <p>
                <strong className="text-foreground">Branding Empresarial</strong> foca na construção da plataforma de marca e posicionamento estratégico — ideal para definir ou redefinir sua identidade.
              </p>
              <p>
                <strong className="text-foreground">Consultoria Estratégica</strong> é mais abrangente: inclui branding, mas adiciona performance, arquitetura de funil e acompanhamento de implementação — para quem precisa de um roadmap completo de crescimento.
              </p>
            </div>
            <Link
              to="/consultoria-estrategica"
              className="text-primary text-sm font-medium hover:underline inline-block"
            >
              Comparar os serviços →
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Formulário ─── */
function FormularioBranding() {
  const [submitted, setSubmitted] = useState(false);
  const { submitLead, isLoading } = useSubmitLead('branding-empresarial');
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
      website: formData.get('website') as string,
      notes: formData.get('challenge') as string,
      has_identity_visual: formData.get('has-vi') as string,
      budget: formData.get('budget') as string,
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
    <section id="formulario" className="section-spacing bg-secondary">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Orçamento</p>
            <h2 className="text-3xl md:text-4xl font-bold">Vamos Construir uma Marca Inesquecível?</h2>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 bg-background border border-border p-8"
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
              <Label htmlFor="website">Site da empresa</Label>
              <Input id="website" name="website" placeholder="www.suaempresa.com" className="rounded-none" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">Seu maior desafio com a marca atual *</Label>
              <Textarea id="challenge" name="challenge" required placeholder="Descreva brevemente..." rows={3} className="rounded-none" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="has-vi">Você já tem identidade visual?</Label>
                <select
                  id="has-vi"
                  name="has-vi"
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Faixa de investimento</Label>
                <select
                  id="budget"
                  name="budget"
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="R$25.000 - R$35.000">R$25.000 - R$35.000</option>
                  <option value="R$35.000 - R$50.000">R$35.000 - R$50.000</option>
                  <option value="Acima de R$50.000">Acima de R$50.000</option>
                  <option value="Flexível">Flexível</option>
                </select>
              </div>
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

/* ─── Depoimentos ─── */
function Depoimentos() {
  const { data: supabaseTestimonials } = useTestimonialsByService('branding-empresarial');

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
      title="Empresas que Transformaram suas Marcas"
      subtitle="Negócios que investiram em branding estratégico e alcançaram novos patamares"
    />
  );
}

/* ─── Page ─── */
export default function BrandingEmpresarial() {
  return (
    <>
      <Hero />
      <OQueE />
      <AntesDepois />
      <Processo />
      <Entregaveis />
      <ShowcaseVisual />
      <InvestimentoBranding />
      <Comparacao />
      <Depoimentos />
      <FormularioBranding />
    </>
  );
}
