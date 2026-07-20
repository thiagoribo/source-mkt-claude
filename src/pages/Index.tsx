import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Sparkles, Paintbrush2, Megaphone, Check, ArrowRight } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import QualificationForm from "@/components/shared/QualificationForm";
import ResponsiveImage from "@/components/shared/ResponsiveImage";
import ResultadosCarousel from "@/components/shared/ResultadosCarousel";
import anaHero from "@/assets/optimized/ana-header-760.webp";
import ana1 from "@/assets/optimized/ana-nova-430.webp";
import ana1Large from "@/assets/optimized/ana-nova-700.webp";
import thiago1 from "@/assets/optimized/thiago-1-520.webp";
import thiago1Large from "@/assets/optimized/thiago-1-760.webp";

const TestimonialV2 = lazy(() => import("@/components/ui/testimonial-v2"));

function LazyTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={ref} className={!shouldLoad ? "min-h-[520px] bg-secondary" : undefined}>
      {shouldLoad ? (
        <Suspense fallback={<div className="min-h-[520px] bg-secondary" />}>
          <TestimonialV2 />
        </Suspense>
      ) : null}
    </div>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative section-spacing bg-background overflow-hidden">
      <div className="container-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <RevealSection duration={800}>
            <div className="space-y-8 lg:space-y-10 lg:pr-12">
              <div className="accent-border pt-6">
                {/* lp-hero-copy: headline com outcome + subhead com especificidade */}
                <h1 className="text-[1.75rem] sm:text-fluid-4xl lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.15] sm:leading-[1.1] font-bold tracking-tight">
                  <span className="sm:hidden">
                    A marca que{" "}
                    <span className="text-primary italic font-normal">vende pelo valor,</span> não pelo preço.
                  </span>
                  <span className="hidden sm:inline">
                    A marca que{" "}
                    <span className="text-primary italic font-serif">vende pelo valor,</span> não pelo preço.
                  </span>
                </h1>
              </div>
              <p className="text-fluid-lg text-foreground/75 leading-[1.6] max-w-xl font-light">
                A Source constrói a base estratégica e visual que faz empresas e especialistas serem escolhidos pelo que representam — não pelo desconto que oferecem. Projetos completos em dois meses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-none text-base px-8 bg-primary hover:shadow-lg transition-shadow min-h-[52px]">
                  <a href="#candidatura">Candidatar meu projeto</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-none text-base px-8 border-2 border-primary hover:bg-primary/5 min-h-[52px]">
                  <a href="#cases">Ver Transformações</a>
                </Button>
              </div>
              {/* Social proof micro-copy */}
              <p className="text-xs text-foreground/40 font-mono tracking-wide">
                Projetos completos em dois meses · Candidaturas analisadas em 48h
              </p>
            </div>
          </RevealSection>
          <RevealSection variant="scale" delay={200} duration={800}>
            <div className="hidden lg:block relative -mr-12 xl:-mr-24 2xl:-mr-32">
              <div className="relative scale-[1.15] xl:scale-[1.35] 2xl:scale-[1.45] origin-center">
                <ResponsiveImage
                  src={anaHero}
                  alt="Ana Santos - Co-fundadora Source"
                  className="w-full object-contain aspect-[662/697] drop-shadow-2xl"
                  sizes="(min-width: 1024px) 50vw, 0vw"
                  width={760}
                  height={801}
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-4 w-40 h-40 bg-accent/8 -z-10 rounded-full blur-2xl" />
              <div className="absolute top-1/4 -right-8 w-3 h-32 bg-accent/40 -z-10" />
              <div className="absolute -bottom-8 right-1/4 w-24 h-24 border border-accent/20 -z-10 rotate-12" />
            </div>
          </RevealSection>
        </div>
      </div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl -z-10" />
    </section>
  );
}

/* ─── O que fazemos — arquitetura de serviços com outcome ─── */
function ArchitectureSection() {
  const phases = [
    {
      num: "01",
      phase: "Construção",
      outcome: "Definimos o que sua marca representa e para quem.",
      description: "Estratégia, posicionamento e narrativa que orientam todas as decisões de comunicação e vendas.",
      services: ["Branding Empresarial", "Branding Pessoal"],
    },
    {
      num: "02",
      phase: "Expressão",
      outcome: "Traduzimos a estratégia em sistema visual aplicável.",
      description: "Logotipo, paleta, tipografia e manual — a marca vira uma linguagem coerente em todos os pontos de contato.",
      services: ["Identidade Visual"],
    },
    {
      num: "03",
      phase: "Aplicação",
      outcome: "Colocamos a marca em movimento com consistência.",
      description: "Presença contínua nos canais digitais, orientada pelas diretrizes construídas nas fases anteriores.",
      services: ["Gestão de Redes Sociais"],
    },
  ];

  return (
    <section className="bg-primary text-primary-foreground section-spacing">
      <div className="container-sm">
        {/* Header — o que fazemos, direto */}
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-14 items-end mb-16 lg:mb-20">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-5">
                O que fazemos
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight">
                Construímos a base<br />
                <span className="text-accent italic font-serif">e colocamos em movimento.</span>
              </h2>
            </div>
            <p className="text-primary-foreground/60 text-sm md:text-base leading-relaxed md:pb-3">
              A Source atua em três fases sequenciais. Branding é a porta de entrada — Identidade e Redes só entram quando já existe estratégia suficiente para orientar cada decisão.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {phases.map((phase, i) => (
            <RevealSection key={phase.num} delay={i * 120}>
              <div className={`py-10 lg:py-0 ${
                i > 0 ? "border-t border-primary-foreground/10 lg:border-t-0 lg:border-l lg:border-primary-foreground/10 lg:pl-10" : ""
              } ${i < phases.length - 1 ? "lg:pr-10" : ""}`}>
                {/* Ghost number */}
                <span
                  className="block font-mono font-bold leading-none text-primary-foreground/[0.06] select-none mb-6"
                  style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
                >
                  {phase.num}
                </span>

                {/* Phase name */}
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
                  {phase.phase}
                </p>

                {/* Outcome — what we deliver */}
                <h3 className="text-lg md:text-xl font-bold tracking-tight mb-4 leading-snug text-primary-foreground">
                  {phase.outcome}
                </h3>

                {/* Description */}
                <p className="text-primary-foreground/55 text-sm leading-relaxed mb-7">
                  {phase.description}
                </p>

                {/* Service tags */}
                <div className="flex flex-col gap-1.5 pt-5 border-t border-primary-foreground/10">
                  {phase.services.map((s) => (
                    <span key={s} className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-foreground/40">
                      → {s}
                    </span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection>
          <div className="mt-14 pt-10 border-t border-primary-foreground/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-primary-foreground/45 max-w-lg leading-relaxed">
              Projeto completo em dois meses · Candidatura analisada em até 48h úteis
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 flex-shrink-0 min-h-[44px]"
            >
              <a href="#candidatura" className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
                Candidatar meu projeto <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Liderança — dois retratos, editorial ─── */
function LeadershipSection() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-6xl">
        {/* Header */}
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-14 mb-14 items-end">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">
                Quem conduz
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight">
                Dois fundadores.<br />
                <span className="text-primary italic font-serif">Uma metodologia.</span>
              </h2>
            </div>
            <p className="text-foreground/65 leading-relaxed md:pb-3">
              Cada projeto é conduzido por quem o concebeu — sem intermediários de execução. Estratégia, identidade e aplicação da marca em oito semanas com presença dos fundadores em cada etapa.
            </p>
          </div>
        </RevealSection>

        {/* Grid de dois retratos */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-6 lg:gap-10 mb-14">
          {/* Ana */}
          <RevealSection delay={0}>
            <div className="group flex flex-col">
              <div className="relative overflow-hidden bg-secondary aspect-[4/5] mb-6">
                <img
                  src={ana1}
                  srcSet={`${ana1} 430w, ${ana1Large} 700w`}
                  sizes="(max-width: 767px) 90vw, 45vw"
                  alt="Ana Santos — co-fundadora Source"
                  width={430}
                  height={573}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Corner label */}
                <div className="absolute top-4 left-4 bg-background px-3 py-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent inline-block" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/60">
                    Co-fundadora 01
                  </span>
                </div>
                {/* Metric overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent p-5 pt-14">
                  <p className="text-primary-foreground/60 text-[10px] font-mono uppercase tracking-widest">
                    10+ anos · Estratégia e Identidade
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Ana Santos</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-primary">
                  Posicionamento · Estratégia · Identidade
                </p>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Lidera a construção de marca em cada projeto — do diagnóstico ao sistema visual final, com profundidade conceitual que vai além do estético.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Thiago */}
          <RevealSection delay={150}>
            <div className="group flex flex-col">
              <div className="relative overflow-hidden bg-secondary aspect-[4/5] mb-6">
                <img
                  src={thiago1}
                  srcSet={`${thiago1} 520w, ${thiago1Large} 760w`}
                  sizes="(max-width: 767px) 90vw, 45vw"
                  alt="Thiago Castro — co-fundador Source"
                  width={520}
                  height={694}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Corner label */}
                <div className="absolute top-4 left-4 bg-background px-3 py-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent inline-block" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/60">
                    Co-fundador 02
                  </span>
                </div>
                {/* Metric overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent p-5 pt-14">
                  <p className="text-primary-foreground/60 text-[10px] font-mono uppercase tracking-widest">
                    15+ anos · Estratégia e Aplicação
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Thiago Castro</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-primary">
                  Estratégia · Aplicação · Coerência
                </p>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Conecta o posicionamento à aplicação da marca — traduz diretrizes estratégicas em decisões coerentes de comunicação e conteúdo.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Footer editorial */}
        <RevealSection>
          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <blockquote className="pl-5 border-l-2 border-accent max-w-2xl">
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed italic font-serif">
                "O processo é intencional por design: imersão, decisão e entrega em oito semanas — com presença dos fundadores em cada etapa."
              </p>
            </blockquote>
            <Link
              to="/quem-somos"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline flex-shrink-0"
            >
              Conhecer a equipe completa <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Services Section — grid simétrico paralelo ─── */
function ServicesSection() {
  const brandingServices = [
    {
      num: "01",
      icon: Building2,
      title: "Branding Empresarial",
      subtitle: "Para empresas em operação ou pré-lançamento",
      text: "Estratégia, posicionamento, identidade visual e manual — sistema completo em dois meses para empresas que precisam alinhar o que entregam ao que o mercado percebe.",
      highlights: ["Estratégia", "Identidade Visual", "Manual de Marca"],
      href: "/branding-empresarial",
    },
    {
      num: "02",
      icon: Sparkles,
      title: "Branding Pessoal",
      subtitle: "Para fundadores, executivos e especialistas",
      text: "Posicionamento, narrativa e identidade visual em dois meses — para transformar reputação profissional em uma marca coerente e reconhecível.",
      highlights: ["Posicionamento", "Identidade Visual", "Manual de Marca"],
      href: "/branding-pessoal",
    },
  ];

  const specializedServices = [
    {
      icon: Paintbrush2,
      title: "Identidade Visual",
      text: "Expressão visual para marcas com estratégia completa ou parcialmente definida.",
      href: "/identidade-visual",
    },
    {
      icon: Megaphone,
      title: "Gestão de Redes",
      text: "Aplicação contínua para marcas que já possuem estratégia e diretrizes utilizáveis.",
      href: "/gestao-redes-sociais",
    },
  ];

  return (
    <section className="bg-secondary overflow-hidden">
      <div className="section-spacing">
        <div className="container-sm">
          {/* Header */}
          <RevealSection>
            <div className="relative mb-16 lg:mb-20">
              <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-16 items-end">
                <div className="space-y-4">
                  <p className="text-xs font-mono tracking-[0.3em] uppercase text-primary">
                    Construção · Porta de entrada
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight">
                    Duas formas de construir<br />
                    <span className="text-primary italic font-serif">uma marca com base.</span>
                  </h2>
                </div>
                <p className="text-foreground/55 text-sm leading-relaxed lg:pb-2">
                  Ambos os projetos duram dois meses, exigem participação dos decisores e entregam estratégia, identidade e manual de marca.
                </p>
              </div>
              <div className="absolute -bottom-8 left-0 w-full h-px bg-gradient-to-r from-border via-border/40 to-transparent" />
            </div>
          </RevealSection>

          {/* Grid simétrico 50/50 */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {brandingServices.map((service, i) => {
              const ServiceIcon = service.icon;
              const isEmp = i === 0;

              return (
                <RevealSection key={service.title} delay={i * 120}>
                  <Link
                    to={service.href}
                    className={`
                      group relative flex flex-col h-full p-8 md:p-10 lg:p-12
                      transition-all duration-500
                      ${isEmp
                        ? "bg-primary text-primary-foreground hover:shadow-[10px_10px_0_0_rgba(220,180,100,0.2)]"
                        : "bg-background border-2 border-primary hover:shadow-[10px_10px_0_0_rgba(33,46,63,0.08)]"
                      }
                    `}
                  >
                    {/* Ghost number */}
                    <span
                      className={`
                        absolute top-4 right-5 md:top-8 md:right-8
                        font-serif font-bold leading-none select-none pointer-events-none
                        ${isEmp ? "text-primary-foreground/[0.08]" : "text-foreground/[0.05]"}
                      `}
                      style={{ fontSize: "clamp(5rem, 10vw, 9rem)" }}
                    >
                      {service.num}
                    </span>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div
                        className={`
                          w-14 h-14 flex items-center justify-center mb-7
                          transition-all duration-300
                          ${isEmp
                            ? "border-2 border-primary-foreground/20 group-hover:border-accent"
                            : "bg-secondary group-hover:bg-primary group-hover:text-primary-foreground"
                          }
                        `}
                      >
                        <ServiceIcon className="w-7 h-7" strokeWidth={1.25} />
                      </div>

                      {/* Subtitle label */}
                      <p className={`
                        text-[10px] font-mono tracking-widest uppercase mb-3
                        ${isEmp ? "text-primary-foreground/50" : "text-foreground/40"}
                      `}>
                        {service.subtitle}
                      </p>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight">
                        {service.title}
                      </h3>

                      {/* Body */}
                      <p className={`
                        text-sm leading-relaxed mb-7 flex-1
                        ${isEmp ? "text-primary-foreground/70" : "text-foreground/60"}
                      `}>
                        {service.text}
                      </p>

                      {/* Highlights as inline pipe-separated list */}
                      <div className={`
                        flex flex-wrap items-center gap-x-3 gap-y-1 mb-7 text-[10px] font-mono uppercase tracking-widest
                        ${isEmp ? "text-primary-foreground/50" : "text-foreground/40"}
                      `}>
                        {service.highlights.map((h, idx) => (
                          <span key={h} className="flex items-center gap-3">
                            {h}
                            {idx < service.highlights.length - 1 && (
                              <span className={isEmp ? "text-primary-foreground/25" : "text-foreground/20"}>·</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className={`
                        flex items-center justify-between pt-6 border-t
                        ${isEmp ? "border-primary-foreground/10" : "border-border/50"}
                      `}>
                        <span className="text-sm font-medium flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                          Ver detalhes
                          <span className={`
                            w-8 h-px transition-all duration-300 group-hover:w-12
                            ${isEmp ? "bg-primary-foreground" : "bg-primary"}
                          `} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </div>

      {/* Specialized Services Strip */}
      <div className="border-t border-border/50 bg-background/50">
        <div className="container-sm py-12 md:py-16">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-20">
              <div className="md:w-64 flex-shrink-0">
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-2">Expressão · Aplicação</p>
                <h3 className="text-lg font-bold">Depois da estratégia</h3>
                <p className="text-foreground/50 text-xs mt-2 leading-relaxed">
                  Serviços avaliados conforme a maturidade da marca.
                </p>
              </div>
              <div className="hidden md:block w-px h-20 bg-border/60" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {specializedServices.map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <RevealSection key={item.title} delay={i * 100}>
                      <Link
                        to={item.href}
                        className="group flex items-start gap-4 p-5 bg-background border border-border/40 hover:border-primary/50 hover:bg-primary/[0.02] transition-all duration-300"
                      >
                        <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <ItemIcon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors duration-200">
                            {item.title}
                          </h4>
                          <p className="text-foreground/50 text-xs leading-relaxed line-clamp-2">
                            {item.text}
                          </p>
                        </div>
                      </Link>
                    </RevealSection>
                  );
                })}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Cases — carrossel visual de resultados ─── */
function CasesSection() {
  return (
    <section id="cases" className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-14 items-end mb-10 md:mb-14">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-3">
                Cases · Resultados
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight">
                Transformações<br />
                <span className="text-primary italic font-serif">reais em imagens.</span>
              </h2>
            </div>
            <p className="text-foreground/60 text-sm md:text-base leading-relaxed md:pb-2">
              Cada slide é um recorte de projeto entregue — do posicionamento à execução visual. A prova concreta do que muda quando marca e estratégia caminham juntas.
            </p>
          </div>
        </RevealSection>

        <RevealSection>
          <ResultadosCarousel />
        </RevealSection>

        <RevealSection>
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-foreground/50 max-w-md leading-relaxed">
              Sua marca pode ser o próximo case. Candidaturas analisadas em 48h úteis.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-shrink-0 min-h-[44px]"
            >
              <a href="#candidatura" className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
                Candidatar meu projeto <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Aderência — editorial sem boxes ─── */
function FitSection() {
  const fits = [
    "Especialistas com atuação, oferta e clientes reais",
    "Empresas em operação que precisam alinhar marca e percepção",
    "Negócios em pré-lançamento com público, oferta e decisão definidos",
    "Lideranças disponíveis para participar, decidir e implementar",
  ];
  const notNow = [
    "Influenciadores buscando audiência ou produção de conteúdo",
    "Projetos que ainda não definiram o que vendem ou para quem",
    "Ideias exploratórias sem decisão, prazo ou verba prevista",
    "Demandas pontuais desconectadas de uma estratégia de marca",
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-14">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-3">Aderência</p>
            <h2 className="text-3xl md:text-4xl font-bold max-w-xl leading-tight">
              Para quem está preparado para construir
            </h2>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-0 md:gap-12 lg:gap-20">
          {/* Faz sentido */}
          <RevealSection>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-6 pb-4 border-b border-border/50">
                Faz sentido conversar se você
              </h3>
              <div className="divide-y divide-border/30">
                {fits.map((item, i) => (
                  <div key={item} className="flex items-start gap-4 py-4">
                    <span className="font-mono text-xs text-foreground/20 flex-shrink-0 pt-0.5 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                    <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Talvez não */}
          <RevealSection delay={100}>
            <div className="mt-10 md:mt-0">
              <h3 className="text-xs font-mono uppercase tracking-widest text-foreground/35 mb-6 pb-4 border-b border-border/30">
                Talvez não seja o momento se você busca
              </h3>
              <div className="divide-y divide-border/20">
                {notNow.map((item, i) => (
                  <div key={item} className="flex items-start gap-4 py-4">
                    <span className="font-mono text-xs text-foreground/15 flex-shrink-0 pt-0.5 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-foreground/40 leading-relaxed line-through decoration-foreground/20">
                      {item}
                    </span>
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

/* ─── Candidatura Final ─── */
function CTASection() {
  return (
    <section id="candidatura" className="section-spacing bg-background scroll-mt-24">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-14 items-start">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">Candidatura</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                Conte em que momento sua marca está.
              </h2>
              <p className="text-foreground/60 leading-relaxed text-sm">
                O formulário nos ajuda a avaliar maturidade, escopo e disponibilidade. Enviar uma candidatura não agenda uma reunião automaticamente.
              </p>
              <p className="text-foreground/40 text-xs mt-4 font-mono">
                Analisamos e respondemos em até 48h úteis.
              </p>
            </div>
            <div className="bg-secondary border border-border p-6 md:p-8">
              <QualificationForm service="candidatura-geral" />
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Index() {
  return (
    <>
      <Helmet>
        <title>Agência de Branding e Posicionamento de Marca | Source</title>
        <meta name="description" content="Branding e posicionamento de marca para empresas e especialistas: estratégia, identidade visual e aplicação em dois meses. Marcas que vendem pelo valor, não pelo preço." />
        <link rel="canonical" href="https://sourcemkt.com.br/" />
        <meta property="og:title" content="Agência de Branding e Posicionamento de Marca | Source" />
        <meta property="og:description" content="Branding, posicionamento estratégico, identidade visual e aplicação para marcas que querem ser escolhidas pelo valor que entregam." />
        <meta property="og:url" content="https://sourcemkt.com.br/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Source",
          "url": "https://sourcemkt.com.br",
          "logo": "https://sourcemkt.com.br/og-image.png",
          "description": "Agência de branding pessoal e empresarial, identidade visual e gestão de redes sociais para marcas com direção.",
          "sameAs": ["https://www.instagram.com/sourcemarketing"]
        })}</script>
      </Helmet>
      <HeroSection />
      <ArchitectureSection />
      <LeadershipSection />
      <ServicesSection />
      <CasesSection />
      <LazyTestimonials />
      <FitSection />
      <CTASection />
    </>
  );
}
