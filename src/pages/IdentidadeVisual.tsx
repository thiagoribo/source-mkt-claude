import { Helmet } from "react-helmet-async";
import { useRef } from "react";
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
import QualificationForm from "@/components/shared/QualificationForm";
import CasesCarousel from "@/components/shared/CasesCarousel";
import { identidadeVisualMockups } from "@/data/serviceMockups";

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

              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight">
                Uma identidade visual que{" "}
                <em className="not-italic text-foreground/40 font-normal">se aplica sozinha —</em>
                <br />
                <span className="text-primary">sem depender do gosto.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Sistema visual completo com logotipo, paleta, tipografia e manual — traduzindo sua estratégia em uma linguagem gráfica coerente e aplicável em todos os pontos de contato.
              </p>

              <p className="text-sm text-foreground/50">
                Serviço para marcas com estratégia completa ou parcialmente definida. Avaliamos a base antes de iniciar a criação.{" "}
                <Link
                  to="/branding-empresarial"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Ainda não tem? Comece pelo Branding →
                </Link>
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Quero Minha Identidade Visual</a>
              </Button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Logo ≠ Identidade — escala progressiva ─── */
function LogoVsIdentidade() {
  const columns = [
    {
      num: "01",
      label: "Logo isolado",
      subtitle: "Um símbolo sem sistema",
      items: [
        "Sem paleta definida",
        "Sem tipografia de marca",
        "Sem aplicações ou diretrizes",
        "Depende da intuição em cada uso",
      ],
      tone: "faded",
    },
    {
      num: "02",
      label: "Identidade parcial",
      subtitle: "Visual definido, estratégia vaga",
      items: [
        "Inconsistência entre canais",
        "Aplicação depende de bom senso",
        "Difícil de escalar ou delegar",
        "Não sustenta preços premium",
      ],
      tone: "medium",
    },
    {
      num: "03",
      label: "Sistema Source",
      subtitle: "Identidade completa e aplicável",
      items: [
        "Estratégia visual documentada",
        "Aplicações em todos os pontos de contato",
        "Manual de uso claro e prático",
        "Consistência escalável",
      ],
      tone: "focus",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-6xl">
        <RevealSection>
          {/* Statement principal */}
          <div className="mb-16 max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/35 mb-4">O equívoco mais comum</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
              Um logo resolve visibilidade.<br />
              <span className="text-primary italic font-serif">Uma identidade resolve posicionamento.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {columns.map((col) => {
              const isFocus = col.tone === "focus";
              const isMedium = col.tone === "medium";

              return (
                <div
                  key={col.num}
                  className={`
                    relative p-7 md:p-8 flex flex-col
                    ${isFocus
                      ? "bg-primary text-primary-foreground md:-mt-4 md:pb-12 shadow-[8px_8px_0_0_rgba(220,180,100,0.15)]"
                      : "bg-secondary/50 border border-border/30"}
                  `}
                >
                  {/* Number */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className={`font-mono font-bold text-2xl leading-none ${
                      isFocus ? "text-accent" : isMedium ? "text-foreground/25" : "text-foreground/15"
                    }`}>
                      {col.num}
                    </span>
                    <div className={`h-px flex-1 ${
                      isFocus ? "bg-accent/40" : "bg-border/50"
                    }`} />
                  </div>

                  <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${
                    isFocus ? "text-primary-foreground/50" : "text-foreground/30"
                  }`}>
                    {col.label}
                  </p>
                  <h3 className={`text-lg md:text-xl font-bold mb-6 leading-snug ${
                    isFocus ? "text-primary-foreground" : "text-foreground/70"
                  }`}>
                    {col.subtitle}
                  </h3>

                  <ul className="space-y-2.5 flex-1">
                    {col.items.map((item, j) => (
                      <li
                        key={j}
                        className={`text-sm leading-relaxed flex gap-2 items-start ${
                          isFocus
                            ? "text-primary-foreground/85"
                            : isMedium
                              ? "text-foreground/50"
                              : "text-foreground/40"
                        }`}
                      >
                        <span className={`select-none flex-shrink-0 ${
                          isFocus ? "text-accent" : "text-foreground/25"
                        }`}>
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {isFocus && (
                    <div className="mt-6 pt-5 border-t border-primary-foreground/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                        O que entregamos ↓
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </RevealSection>
      </div>
    </section>
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

/* ─── Formulário ─── */
function Formulario() {
  return (
    <section id="formulario" className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Candidatura</p>
            <h2 className="text-3xl md:text-4xl font-bold">Sua marca já tem base para uma identidade?</h2>
            <p className="text-foreground/60 max-w-2xl">Vamos avaliar a estratégia existente e as lacunas do projeto. Se a base ainda não for suficiente, indicaremos Branding como primeiro passo.</p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="border border-border p-6 md:p-8"><QualificationForm service="identidade-visual" /></div>
        </RevealSection>
      </div>
    </section>
  );
}

export default function IdentidadeVisual() {
  return (
    <>
      <Helmet>
        <title>Identidade Visual Estratégica para Marcas | Source</title>
        <meta name="description" content="Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico alinhado ao posicionamento do seu negócio." />
        <link rel="canonical" href="https://sourcemkt.com.br/identidade-visual" />
        <meta property="og:title" content="Identidade Visual Estratégica para Marcas | Source" />
        <meta property="og:description" content="Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico." />
        <meta property="og:url" content="https://sourcemkt.com.br/identidade-visual" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Identidade Visual Profissional para Empresas",
          "description": "Sistema de identidade visual completo: logotipo, paleta de cores, tipografia e manual de marca. Design estratégico alinhado ao posicionamento do seu negócio.",
          "url": "https://sourcemkt.com.br/identidade-visual",
          "provider": { "@type": "Organization", "name": "Source", "url": "https://sourcemkt.com.br" },
          "areaServed": { "@type": "Country", "name": "Brazil" },
          "serviceType": "Identidade Visual"
        })}</script>
      </Helmet>
      <Hero />
      <LogoVsIdentidade />
      <Processo />
      <Entregaveis />
      <GaleriaMockups />
      <Formulario />
    </>
  );
}
