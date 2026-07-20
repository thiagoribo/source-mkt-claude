import { Helmet } from "react-helmet-async";
import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUtmParams } from "@/hooks/useUtmParams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import { trackLead, trackFormStart } from "@/lib/analytics";
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
import useEmblaCarousel from "embla-carousel-react";
import RevealSection from "@/components/shared/RevealSection";
import QualificationForm from "@/components/shared/QualificationForm";
import { socialDashboardKpis, socialEditorialCycle } from "@/data/serviceMockups";
// Imagens de depoimentos (o que falam de nós)
import dep1 from "@/assets/cases/gestao-redes/depoimentos/dep-1.webp";
import dep2 from "@/assets/cases/gestao-redes/depoimentos/dep-2.webp";
import dep3 from "@/assets/cases/gestao-redes/depoimentos/dep-3.webp";
import dep5 from "@/assets/cases/gestao-redes/depoimentos/dep-5.webp";
import dep8 from "@/assets/cases/gestao-redes/depoimentos/dep-8.webp";
import dep9 from "@/assets/cases/gestao-redes/depoimentos/dep-9.webp";


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

              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight">
                Sua marca reconhecida{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  em cada post,
                </em>
                <br />
                <span className="text-primary">sem começar do zero toda semana.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Aplicamos a marca nos canais digitais com direção editorial, calendário estratégico e consistência visual — para que cada conteúdo reforce o mesmo posicionamento.
              </p>

              <p className="text-sm text-foreground/50">
                Disponível para clientes de branding da Source ou marcas com estratégia, posicionamento e diretrizes utilizáveis.{" "}
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

/* ─── Pré-requisito — callout impossível de ignorar ─── */
function PreRequisito() {
  return (
    <section className="bg-primary text-primary-foreground py-10 md:py-12">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
            {/* Label */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 border border-accent/40 flex items-center justify-center">
                <span className="text-accent font-mono font-bold text-sm">!</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-bold mb-2">
                Este serviço exige uma base de marca documentada.
              </h3>
              <p className="text-primary-foreground/65 text-sm leading-relaxed max-w-2xl">
                Gestão de redes não substitui branding. Aplicamos a marca nos canais digitais — não a criamos. Para marcas sem estratégia, posicionamento e identidade definidos, o primeiro passo obrigatório é o Branding.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <Link
                  to="/branding-empresarial"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  Branding Empresarial <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-primary-foreground/20 hidden sm:inline">·</span>
                <Link
                  to="/branding-pessoal"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
                >
                  Branding Pessoal <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
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

/* ─── O Que Falam de Nós — carrossel de depoimentos ─── */
const depoimentoImagens = [dep1, dep2, dep3, dep5, dep8, dep9];

function OQueFalamDeNos() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-10 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Depoimentos</p>
            <h2 className="text-3xl md:text-4xl font-bold">O Que Falam de Nós</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Mensagens reais de clientes que vivenciaram a nossa gestão de redes sociais.
            </p>
          </div>
        </RevealSection>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-3 md:-ml-5">
              {depoimentoImagens.map((src, i) => (
                <div
                  key={i}
                  className="pl-3 md:pl-5 min-w-0 shrink-0 grow-0 basis-4/5 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="border border-border bg-secondary/30 overflow-hidden aspect-[4/5]">
                    <img
                      src={src}
                      alt={`Depoimento ${i + 1}`}
                      width={400}
                      height={500}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 md:mt-6">
            <span className="text-xs font-mono text-foreground/40">
              {String(selectedIndex + 1).padStart(2, "0")} / {String(depoimentoImagens.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="w-10 h-10 border border-border hover:border-primary/40 flex items-center justify-center disabled:opacity-25 transition-colors"
                aria-label="Depoimento anterior"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                className="w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center disabled:opacity-25 transition-colors"
                aria-label="Próximo depoimento"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
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

/* ─── Formulário ─── */
function Formulario() {
  return (
    <section id="formulario" className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Candidatura</p>
            <h2 className="text-3xl md:text-4xl font-bold">Sua marca está pronta para ser aplicada?</h2>
            <p className="text-foreground/60 max-w-2xl">Gestão de redes não substitui branding. Se a marca ainda não possui estratégia e diretrizes utilizáveis, o primeiro passo será um projeto de Branding.</p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="border border-border p-6 md:p-8"><QualificationForm service="gestao-redes-sociais" /></div>
        </RevealSection>
      </div>
    </section>
  );
}

export default function GestaoRedesSociais() {
  return (
    <>
      <Helmet>
        <title>Gestão de Redes Sociais para Marcas Estruturadas | Source</title>
        <meta name="description" content="Gestão profissional de redes sociais com calendário editorial, criação de conteúdo, gestão de comunidade e relatórios de performance mensais." />
        <link rel="canonical" href="https://sourcemkt.com.br/gestao-redes-sociais" />
        <meta property="og:title" content="Gestão de Redes Sociais para Marcas Estruturadas | Source" />
        <meta property="og:description" content="Gestão profissional de redes sociais com calendário editorial, criação de conteúdo e relatórios de performance mensais." />
        <meta property="og:url" content="https://sourcemkt.com.br/gestao-redes-sociais" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Gestão de Redes Sociais Estratégica",
          "description": "Gestão profissional de redes sociais com calendário editorial, criação de conteúdo, gestão de comunidade e relatórios de performance mensais.",
          "url": "https://sourcemkt.com.br/gestao-redes-sociais",
          "provider": { "@type": "Organization", "name": "Source", "url": "https://sourcemkt.com.br" },
          "areaServed": { "@type": "Country", "name": "Brazil" },
          "serviceType": "Gestão de Redes Sociais"
        })}</script>
      </Helmet>
      <Hero />
      <PreRequisito />
      <Processo />
      <OQueFalamDeNos />
      <PreviewOperacao />
      <Formulario />
    </>
  );
}
