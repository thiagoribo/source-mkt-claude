import { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useUtmParams } from "@/hooks/useUtmParams";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import RevealSection from "@/components/shared/RevealSection";
import logoHeader from "@/assets/logo-header.svg";
import anaFoto from "@/assets/ana-nova.webp";
import thiagoCastro from "@/assets/thiago-1.webp";
import logoCelmi from "@/assets/clientes/Logo/celmi.png";
import logoCelsoMissias from "@/assets/clientes/Logo/celso-missias.png";
import logoCodigoVarejista from "@/assets/clientes/Logo/codigo-varejista.png";
import logoStart from "@/assets/clientes/Logo/start-imobilirio.png";
import {
  ArrowRight, Phone, Check, X, ChevronDown,
  Building2, User, TrendingUp, Target, Layers,
  MessageSquare, Clock, BarChart2, Award, Zap,
} from "lucide-react";

// ─── GTM / dataLayer ────────────────────────────────────────────────
declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}
function gtmPush(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...data });
  }
}

// ─── Message-match variants (param ?g=) ─────────────────────────────
const HERO_VARIANTS: Record<string, { h1: string; sub: string; cta: string; micro: string }> = {
  default: {
    h1: "Sua empresa cresceu. Sua marca ficou para trás.",
    sub: "Consultoria de posicionamento para empresas e especialistas que já são bons — mas ainda não parecem. Mais de 100 marcas posicionadas.",
    cta: "Agendar meu diagnóstico de marca",
    micro: "45 minutos · Análise da sua marca antes da reunião · Sem compromisso",
  },
  posicionamento: {
    h1: "Se o cliente compara você por preço, o problema é posicionamento.",
    sub: "Diagnóstico que mostra onde sua comunicação perde valor — marca, narrativa, oferta e canais. Mais de 100 marcas posicionadas.",
    cta: "Solicitar meu diagnóstico",
    micro: "45 minutos · Devolutiva com prioridades claras · Sem compromisso",
  },
  rebranding: {
    h1: "Rebranding é mais que um logo novo.",
    sub: "Reposicionamos narrativa, identidade e comunicação — sem perder a essência que seus clientes já reconhecem. Estratégia antes do design.",
    cta: "Começar pelo diagnóstico",
    micro: "Análise prévia da sua marca · Retorno em até 1 dia útil",
  },
};

// ─── Reusable Option component for radio steps ──────────────────────
function RadioOption({
  name, value, label, checked, onChange,
}: {
  name: string; value: string; label: string; checked: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block cursor-pointer mb-3">
      <input
        type="radio" name={name} value={value}
        checked={checked} onChange={() => onChange(value)}
        className="sr-only"
      />
      <div className={`flex items-center gap-3 p-4 border transition-all ${
        checked
          ? "border-accent bg-accent/5 font-semibold"
          : "border-border bg-background hover:border-foreground/30"
      }`}>
        <span className={`flex-none w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          checked ? "border-accent" : "border-foreground/30"
        }`}>
          {checked && <span className="w-2 h-2 rounded-full bg-accent block" />}
        </span>
        <span className="text-sm leading-snug">{label}</span>
      </div>
    </label>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 1 · MINIMAL HEADER
// ═══════════════════════════════════════════════════════════════════
function LPHeader({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <header className="bg-primary sticky top-0 z-40 border-b border-white/10">
      <div className="container-sm max-w-5xl flex items-center justify-between py-4">
        <a href="/posicionamento-de-marca" aria-label="SM Agency">
          <img src={logoHeader} alt="SM Agency" className="h-7 w-auto" />
        </a>
        <div className="flex items-center gap-4">
          <a
            href="tel:+5511937292921"
            className="hidden sm:flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-xs font-mono tracking-wide transition-colors"
          >
            <Phone className="h-3 w-3" />
            (11) 93729-2921
          </a>
          <button
            onClick={onCtaClick}
            className="bg-accent text-primary font-bold text-sm px-5 py-2 hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            Agendar diagnóstico <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 2 · HERO
// ═══════════════════════════════════════════════════════════════════
function Hero({ variant, onCtaClick }: {
  variant: typeof HERO_VARIANTS[string];
  onCtaClick: () => void;
}) {
  return (
    <section className="bg-primary text-primary-foreground overflow-hidden relative">
      {/* noise texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* gold radial glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: "radial-gradient(700px 350px at 90% -10%, rgba(220,180,100,0.18), transparent 60%)",
        }}
      />

      <div className="container-sm max-w-5xl relative py-16 md:py-24">
        {/* badge */}
        <div className="inline-flex items-center gap-2 border border-accent/40 px-4 py-2 mb-8 bg-accent/8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-mono tracking-widest uppercase">
            Consultoria de posicionamento de marca
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight max-w-[16ch] mb-6">
          {variant.h1}
        </h1>

        <p className="text-primary-foreground/65 text-base md:text-lg max-w-[52ch] leading-relaxed mb-8">
          {variant.sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <button
            onClick={onCtaClick}
            className="bg-accent text-primary font-bold text-base px-8 py-4 hover:bg-accent/90 active:scale-[0.98] transition-all flex items-center gap-3"
          >
            {variant.cta}
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-primary-foreground/45 text-xs font-mono tracking-wide self-center">
            {variant.micro}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3 · AUTHORITY BAR
// ═══════════════════════════════════════════════════════════════════
function AuthorityBar() {
  const stats = [
    { n: "100+", label: "marcas posicionadas" },
    { n: "10+", label: "anos de mercado dos sócios" },
    { n: "15+", label: "segmentos atendidos" },
  ];

  const logos = [
    { src: logoCelmi, alt: "Celmi" },
    { src: logoCelsoMissias, alt: "Celso Missias" },
    { src: logoCodigoVarejista, alt: "Código Varejista" },
    { src: logoStart, alt: "Start Imobiliário" },
  ];

  return (
    <div className="bg-primary/95 border-t border-white/10 py-6">
      <div className="container-sm max-w-5xl">
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6">
          {stats.map((s) => (
            <div key={s.n} className="flex items-baseline gap-2">
              <span className="font-bold text-accent text-xl font-display">{s.n}</span>
              <span className="text-primary-foreground/60 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-5 flex flex-wrap items-center gap-8">
          <span className="text-primary-foreground/35 text-xs font-mono tracking-widest uppercase w-full sm:w-auto">
            Marcas que confiaram na SM
          </span>
          {logos.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className="h-6 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 4 · REFRAME — iceberg + contrast cards
// ═══════════════════════════════════════════════════════════════════
function Reframe() {
  const belowItems = [
    { n: "01", title: "Posicionamento", desc: "O território que a sua marca ocupa na mente do cliente — antes de qualquer post existir." },
    { n: "02", title: "Narrativa e mensagem", desc: "O que você diz que nenhum concorrente pode dizer — e como isso se repete em todos os canais." },
    { n: "03", title: "Cliente ideal e oferta", desc: "Para quem a marca fala, com qual promessa, e por que essa pessoa paga mais por você." },
    { n: "04", title: "Ponte até o comercial", desc: "Como a percepção construída vira conversa, proposta e receita — onde o branding finalmente se paga." },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-4">
            01 · O erro mais caro do mercado
          </p>
          <h2 className="text-3xl md:text-4xl font-bold max-w-[22ch] mb-5">
            Identidade visual é a parte visível. Posicionamento é o que faz ela vender.
          </h2>
        </RevealSection>

        <RevealSection delay={80}>
          <p className="text-foreground/55 text-sm max-w-[62ch] mb-4 leading-relaxed">
            A maioria das empresas contrata "branding" e recebe um logo, uma paleta de cores e um manual de marca. Três meses depois, o problema continua o mesmo: o cliente ainda não entende por que deveria escolher você — e a conversa ainda termina em preço.
          </p>
          <p className="text-foreground/55 text-sm max-w-[62ch] leading-relaxed">
            Isso acontece porque a identidade visual é a última camada da marca, não a primeira. É a ponta do iceberg — e nenhuma ponta flutua sem a massa que está embaixo da água.
          </p>
        </RevealSection>

        {/* Iceberg visual */}
        <RevealSection delay={160}>
          <div className="mt-10 border border-border overflow-hidden" role="img" aria-label="Diagrama: identidade visual é a ponta visível; posicionamento, narrativa, cliente ideal e ponte comercial sustentam a marca.">
            {/* ABOVE WATERLINE */}
            <div className="bg-secondary/60 px-6 md:px-10 pt-8 pb-6">
              <p className="text-xs font-mono tracking-widest uppercase text-foreground/35 mb-5">
                O que o mercado vê
              </p>
              <div className="flex items-start gap-5">
                {/* iceberg tip visual */}
                <div className="hidden sm:flex flex-col items-center gap-1 flex-none">
                  <div
                    className="w-20 h-16 bg-background border border-border/60"
                    style={{ clipPath: "polygon(40% 0, 70% 0, 90% 100%, 10% 100%)" }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Identidade visual</h3>
                  <p className="text-foreground/55 text-sm leading-relaxed">
                    Logo, cores, tipografia, manual de marca. É onde a maioria dos projetos de "branding" começa — e termina.
                  </p>
                  <span className="inline-block mt-3 text-xs font-mono text-foreground/40 bg-foreground/6 px-3 py-1">
                    ≈ 10% da marca
                  </span>
                </div>
              </div>
            </div>

            {/* waterline divider */}
            <div className="relative border-t-2 border-dashed border-foreground/25 bg-background">
              <span className="absolute right-4 -top-3.5 text-xs font-mono bg-background text-foreground/40 px-3 py-0.5 border border-border/40">
                linha d'água
              </span>
            </div>

            {/* BELOW WATERLINE */}
            <div className="bg-primary text-primary-foreground px-6 md:px-10 pt-6 pb-8">
              <p className="text-xs font-mono tracking-widest uppercase text-accent mb-5">
                O que sustenta a venda
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {belowItems.map((item) => (
                  <div key={item.n} className="border border-white/10 p-4 bg-white/[0.04]">
                    <span className="text-xs font-mono text-accent mb-2 block">{item.n}</span>
                    <h4 className="font-bold text-base mb-1">{item.title}</h4>
                    <p className="text-primary-foreground/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-primary-foreground/40 text-xs font-mono mt-5 text-center">
                Um logo novo mexe na ponta. Posicionamento constrói o que está embaixo da água.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Contrast cards */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <RevealSection delay={80}>
            <div className="border border-border p-7 bg-secondary/40 h-full">
              <h3 className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-5">
                Agência de identidade visual
              </h3>
              <ul className="space-y-3">
                {[
                  "Entrega o logo e o manual — e o projeto acaba",
                  "Começa pela estética",
                  "Você fica sozinho para transformar marca em venda",
                  "Proposta de prateleira, igual para todo mundo",
                ].map((t) => (
                  <li key={t} className="flex gap-3 items-start text-sm text-foreground/60">
                    <X className="h-4 w-4 text-foreground/30 flex-none mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          <RevealSection delay={160}>
            <div className="border border-accent/40 p-7 bg-primary text-primary-foreground h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
              <h3 className="text-xs font-mono tracking-widest uppercase text-accent mb-5">
                Consultoria de posicionamento — SM
              </h3>
              <ul className="space-y-3">
                {[
                  { t: "Entrega estratégia, identidade e a ponte até o comercial", b: true },
                  { t: "Começa pelo diagnóstico do negócio" },
                  { t: "Acompanha até o posicionamento virar receita" },
                  { t: "Escopo modelado por cliente — nunca proposta pronta" },
                ].map((item) => (
                  <li key={item.t} className="flex gap-3 items-start text-sm text-primary-foreground/80">
                    <Check className="h-4 w-4 text-accent flex-none mt-0.5" />
                    {item.b ? <strong>{item.t}</strong> : item.t}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 5 · FIT — para quem é / não é
// ═══════════════════════════════════════════════════════════════════
function Fit() {
  return (
    <section className="section-spacing bg-secondary/50 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-4">
            02 · Antes de continuar
          </p>
          <h2 className="text-3xl md:text-4xl font-bold max-w-[22ch] mb-3">
            Este diagnóstico não é para todo mundo.
          </h2>
          <p className="text-foreground/55 text-sm max-w-xl mb-10">
            Trabalhamos em profundidade com poucos clientes por vez. Por isso, o diagnóstico é reservado para quem está no momento certo.
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-5">
          <RevealSection delay={60}>
            <div className="border border-border bg-background p-7 h-full">
              <h3 className="text-xs font-mono tracking-widest uppercase text-green-600 mb-5">
                É para você se
              </h3>
              <ul className="space-y-4">
                {[
                  "Você tem uma empresa estabelecida — com operação, clientes e faturamento consistente (a partir de R$20–30 mil/mês)",
                  "Ou é um especialista com anos de mercado, reconhecido pela entrega, que quer transformar essa reputação em marca",
                  "Você sente que é melhor do que parece — e está cansado de competir por preço com concorrentes piores",
                  "Já tentou resolver com agências, posts ou identidade visual, e o problema voltou",
                ].map((t) => (
                  <li key={t} className="flex gap-3 items-start text-sm">
                    <Check className="h-4 w-4 text-green-600 flex-none mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          <RevealSection delay={120}>
            <div className="border border-dashed border-foreground/20 bg-transparent p-7 h-full">
              <h3 className="text-xs font-mono tracking-widest uppercase text-red-500 mb-5">
                Não é para você se
              </h3>
              <ul className="space-y-4">
                {[
                  "Você está começando do zero, sem histórico e sem clientes",
                  "Busca crescer como influenciador ou criador de conteúdo",
                  "Procura só um logo novo ou gestão de redes sociais",
                  "Quer resultado sem participar do processo — posicionamento se constrói junto",
                ].map((t) => (
                  <li key={t} className="flex gap-3 items-start text-sm text-foreground/60">
                    <X className="h-4 w-4 text-red-400 flex-none mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 6 · METHOD — 3 pilares
// ═══════════════════════════════════════════════════════════════════
function Method({ onCtaClick }: { onCtaClick: () => void }) {
  const pillars = [
    {
      n: "01",
      icon: Target,
      title: "Estratégia de marca",
      text: "Sua marca para de ser genérica. Mapeamos onde você está, como os concorrentes se posicionam e qual território está livre para você ocupar — com público, narrativa e oferta definidos. É a fundação que as agências pulam.",
    },
    {
      n: "02",
      icon: Layers,
      title: "Identidade que traduz a estratégia",
      text: "Sua marca passa a parecer o que ela é. Identidade visual, tom de voz e narrativa construídos em cima do posicionamento — não no lugar dele. O visual deixa de ser decoração e vira argumento.",
    },
    {
      n: "03",
      icon: TrendingUp,
      title: "A ponte até o comercial",
      text: "O posicionamento vira receita. Sistema de conteúdo com funil, direcionamento comercial e plano de ação — para a marca conduzir o cliente da primeira impressão ao fechamento. É aqui que o projeto da maioria das agências termina. O nosso continua.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-4">
            03 · Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold max-w-[26ch] mb-10">
            Um método que une três coisas que raramente andam juntas.
          </h2>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <RevealSection key={p.n} delay={i * 80}>
              <div className="border border-border p-6 h-full relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 bg-background">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
                <span className="absolute top-4 right-4 font-mono text-xs text-accent">
                  {p.n}
                </span>
                <p.icon className="h-5 w-5 text-accent mb-4" />
                <h3 className="font-bold text-lg mb-3 leading-tight max-w-[14ch]">{p.title}</h3>
                <p className="text-foreground/55 text-sm leading-relaxed">{p.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={80}>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="border-l-2 border-accent pl-4 text-foreground/60 text-sm italic flex-1">
              Cada projeto tem escopo modelado para o momento do cliente. Nunca proposta de prateleira.
            </p>
            <button
              onClick={onCtaClick}
              className="bg-accent text-primary font-bold px-7 py-3 text-sm hover:bg-accent/90 transition-colors flex items-center gap-2 flex-none"
            >
              Agendar diagnóstico <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 7 · DIAGNOSTIC PROCESS
// ═══════════════════════════════════════════════════════════════════
function DiagnosticProcess() {
  const steps = [
    {
      n: "01",
      icon: MessageSquare,
      title: "Você preenche o formulário",
      text: "Quatro perguntas rápidas sobre o seu momento — leva 2 minutos. Retornamos em até 1 dia útil com os horários disponíveis.",
    },
    {
      n: "02",
      icon: BarChart2,
      title: "Analisamos sua marca antes da conversa",
      text: `Não chegamos na reunião para "conhecer você". Chegamos com a leitura do seu posicionamento atual: como sua marca aparece hoje e onde está o gap entre o que você entrega e o que o mercado percebe.`,
    },
    {
      n: "03",
      icon: Clock,
      title: "45 minutos de diagnóstico ao vivo",
      text: "Conduzido pelos sócios da SM — não por um vendedor. Você sai com clareza sobre o problema real da sua marca e o caminho para resolvê-lo. Mesmo que a gente não trabalhe junto.",
    },
  ];

  return (
    <section className="section-spacing bg-primary text-primary-foreground relative overflow-hidden">
      <span aria-hidden className="absolute right-0 top-1/2 -translate-y-1/2 font-bold font-display text-[200px] leading-none pointer-events-none select-none" style={{ opacity: 0.035 }}>
        SM
      </span>
      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <p className="text-xs font-mono tracking-widest uppercase text-accent mb-4">
            04 · A reunião
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground max-w-[26ch] mb-10">
            O que você recebe no diagnóstico — antes de decidir qualquer coisa.
          </h2>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {steps.map((s, i) => (
            <RevealSection key={s.n} delay={i * 80}>
              <div className="border border-white/10 p-6 bg-white/[0.04] h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-full border border-accent/50 text-accent font-mono text-sm flex items-center justify-center flex-none">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-3">{s.title}</h3>
                <p className="text-primary-foreground/55 text-sm leading-relaxed">{s.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={80}>
          <div className="border-l-2 border-accent pl-5 py-3 text-sm text-primary-foreground/65 leading-relaxed">
            A reunião não é uma apresentação de vendas disfarçada. Se percebermos que não somos a solução certa para o seu momento, dizemos isso na hora — e indicamos o caminho.
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 8 · PROOF — cases
// ═══════════════════════════════════════════════════════════════════
function Proof({ onCtaClick }: { onCtaClick: () => void }) {
  const cases = [
    {
      who: "Tati Xavier · Consórcio",
      before: "Sem presença estratégica no mercado, sem equipe de marketing ou comercial.",
      project: "Posicionamento, narrativa e identidade — o branding pessoal completo.",
      result: "3º lugar nacional da franquia e R$4 milhões em consórcio no primeiro trimestre. Sozinha — competindo com franquias que tinham estruturas inteiras.",
    },
    {
      who: "Lorena · Treinamentos Corporativos",
      before: "35 anos de carreira e milhares de profissionais treinados — mas dependia de grandes instituições que ficavam com 80% da margem.",
      project: "Branding pessoal completo com arquitetura de ecossistema de serviços.",
      result: "Fechou contrato corporativo antes mesmo do site entrar no ar. O posicionamento gerou oportunidade antes do produto estar pronto.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-4">
            05 · Resultados
          </p>
          <h2 className="text-3xl md:text-4xl font-bold max-w-[22ch] mb-10">
            O que acontece quando a fundação está no lugar.
          </h2>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <RevealSection key={c.who} delay={i * 80}>
              <div className="border border-border p-7 h-full relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />
                <p className="text-xs font-mono tracking-widest uppercase text-accent mb-5">{c.who}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-foreground/30 mb-1">Antes</p>
                <p className="text-sm text-foreground/60 mb-4 leading-relaxed">{c.before}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-foreground/30 mb-1">Projeto</p>
                <p className="text-sm text-foreground/60 mb-4 leading-relaxed">{c.project}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-foreground/30 mb-2">Resultado</p>
                <p className="font-bold text-base leading-snug">{c.result}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={80}>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <p className="border-l-2 border-accent pl-4 text-foreground/60 text-sm italic flex-1">
              Nosso primeiro case somos nós. Aplicamos em cada cliente o mesmo posicionamento que transformou a própria SM.
            </p>
            <button
              onClick={onCtaClick}
              className="bg-accent text-primary font-bold px-7 py-3 text-sm hover:bg-accent/90 transition-colors flex items-center gap-2 flex-none"
            >
              Agendar diagnóstico <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 9 · FOUNDERS
// ═══════════════════════════════════════════════════════════════════
function Founders() {
  const founders = [
    {
      name: "Ana Santos",
      role: "Co-fundadora · Estrategista de Posicionamento de Marca & Negócios",
      stats: [
        { v: "10+", l: "anos de mercado" },
        { v: "100+", l: "marcas lideradas" },
        { v: "15+", l: "segmentos" },
      ],
      bio: "Ana lidera o posicionamento e a construção de marca em cada projeto. Sua metodologia, desenvolvida ao longo de 10 anos, transforma empresas estabelecidas em referências de mercado — com profundidade conceitual que vai além do visual.",
      img: anaFoto,
      imgAlt: "Ana Santos, co-fundadora da SM Agency",
    },
    {
      name: "Thiago Castro",
      role: "Co-fundador · Performance e Crescimento",
      stats: [
        { v: "10+", l: "anos de mercado" },
        { v: "6+", l: "países de atuação" },
        { v: "30+", l: "projetos aprovados" },
      ],
      bio: "Thiago conecta posicionamento de marca com resultados concretos de negócio. Responsável pela dimensão de performance, conversão e arquitetura de funil — garantindo que cada estratégia se traduza em crescimento mensurável.",
      img: thiagoCastro,
      imgAlt: "Thiago Castro, co-fundador da SM Agency",
    },
  ];

  return (
    <section className="section-spacing bg-secondary/50 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-4">
            06 · Quem conduz o seu projeto
          </p>
          <h2 className="text-3xl md:text-4xl font-bold max-w-[24ch] mb-3">
            Quem faz o diagnóstico é quem conduz o projeto.
          </h2>
          <p className="text-foreground/55 text-sm max-w-xl mb-10">
            Na SM não existe repasse para equipe júnior. Do diagnóstico à entrega, você trabalha diretamente com os sócios.
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <RevealSection key={f.name} delay={i * 100}>
              <div className="bg-background border border-border overflow-hidden group hover:-translate-y-1 transition-transform duration-300 h-full">
                {/* photo */}
                <div className="relative overflow-hidden aspect-[4/5] bg-primary">
                  <img
                    src={f.img} alt={f.imgAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                </div>
                {/* content */}
                <div className="p-7">
                  <h3 className="font-bold text-2xl mb-1">{f.name}</h3>
                  <p className="text-xs font-mono text-accent tracking-wide mb-5 leading-relaxed">{f.role}</p>
                  {/* stats */}
                  <div className="flex border border-border mb-5">
                    {f.stats.map((s, si) => (
                      <div key={s.l} className={`flex-1 py-3 px-2 text-center ${si > 0 ? "border-l border-border" : ""}`}>
                        <span className="font-bold font-display text-2xl block leading-none">{s.v}</span>
                        <span className="text-xs font-mono text-foreground/40 uppercase tracking-wide leading-snug mt-1 block">{s.l}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">{f.bio}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={80}>
          <p className="text-center text-foreground/55 text-sm italic mt-8">
            Marca e performance no mesmo time — por isso o posicionamento não para no papel.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 10 · FAQ
// ═══════════════════════════════════════════════════════════════════
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      q: "Quanto custa um projeto com a SM?",
      a: "Projetos de consultoria partem de R$3 mil mensais, com escopo modelado para o momento de cada cliente — por isso o diagnóstico vem antes de qualquer proposta. Você só recebe números depois que entendemos exatamente o que a sua marca precisa (e o que não precisa).",
    },
    {
      q: "Já tenho identidade visual. Esse trabalho serve para mim?",
      a: "Provavelmente sim — e talvez seja exatamente o seu caso. A maioria dos nossos clientes chega com logo e manual prontos, mas sem a estratégia por trás deles. Quando a fundação é construída, muitas vezes a identidade atual é aproveitada e realinhada, não jogada fora.",
    },
    {
      q: "Quanto tempo dura um projeto?",
      a: "Depende do escopo, mas projetos de posicionamento normalmente rodam por alguns meses — porque marca não se constrói em uma entrega, se constrói em um processo. O prazo exato faz parte da proposta desenhada após o diagnóstico.",
    },
    {
      q: "A reunião de diagnóstico é uma venda disfarçada?",
      a: "Não. É uma sessão de trabalho: chegamos com a análise da sua marca feita e você sai com clareza sobre o problema real — feche ou não com a gente. Se não formos a solução certa, dizemos na reunião.",
    },
    {
      q: "Funciona para marca pessoal ou só para empresas?",
      a: "Para os dois. Trabalhamos com empresas estabelecidas e com especialistas que já têm anos de mercado e reputação construída — e querem transformar isso em posicionamento de autoridade. O que não fazemos: projetos para influenciadores ou para quem está começando do zero.",
    },
    {
      q: "Vocês fazem gestão de redes sociais ou tráfego pago?",
      a: "Não como serviço isolado. Entregamos a fundação que faz esses investimentos funcionarem: estratégia, narrativa, sistema de conteúdo e direcionamento comercial. Posts e anúncios sem posicionamento cumprem tabela — com posicionamento, viram receita.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-4">
            07 · Perguntas frequentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold max-w-[22ch] mb-8">
            Perguntas que você provavelmente está se fazendo.
          </h2>
        </RevealSection>

        <div className="border-t border-border">
          {items.map((item, i) => (
            <div key={i} className="border-b border-border">
              <button
                className="w-full flex justify-between items-center gap-4 py-5 text-left hover:text-accent transition-colors"
                onClick={() => {
                  setOpen(open === i ? null : i);
                  gtmPush("faq_click", { question: item.q });
                }}
                aria-expanded={open === i}
              >
                <span className="font-bold text-base">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-accent flex-none transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "400px" : "0px" }}
              >
                <p className="pb-5 text-sm text-foreground/60 leading-relaxed max-w-3xl">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 11 · MULTI-STEP FORM
// ═══════════════════════════════════════════════════════════════════
function MultiStepForm() {
  const navigate = useNavigate();
  const utmParams = useUtmParams();
  const { submitLead, isLoading } = useSubmitLead("posicionamento-de-marca");

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<number, string | null>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const [qual, setQual] = useState({ tipo: "", tempo: "", faturamento: "", dor: "" });
  const [contact, setContact] = useState({ full_name: "", whatsapp: "", email: "" });

  const totalSteps = 4;
  const progress = Math.round((step / totalSteps) * 100);

  // Track page view when form mounts
  useEffect(() => {
    gtmPush("lp_posicionamento_view", {
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_term: utmParams.utm_term,
    });
  }, []);

  function validateStep(s: number): boolean {
    if (s === 1) {
      if (!qual.tipo) {
        setStepErrors((e) => ({ ...e, 1: "Escolha uma opção para continuar." }));
        return false;
      }
      if (qual.tipo === "marca_pessoal" && !qual.tempo) {
        setStepErrors((e) => ({ ...e, 1: "Informe há quanto tempo você atua no mercado." }));
        return false;
      }
    }
    if (s === 2 && !qual.faturamento) {
      setStepErrors((e) => ({ ...e, 2: "Escolha uma opção para continuar." }));
      return false;
    }
    if (s === 3 && !qual.dor) {
      setStepErrors((e) => ({ ...e, 3: "Escolha uma opção para continuar." }));
      return false;
    }
    setStepErrors((e) => ({ ...e, [s]: null }));
    return true;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    const next = step + 1;
    setStep(next);
    gtmPush("form_step", { step: next, service: "posicionamento-de-marca" });
  }

  function prevStep() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    let d = e.target.value.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length > 10 ? 7 : 6)}-${d.slice(d.length > 10 ? 7 : 6)}`;
    setContact((c) => ({ ...c, whatsapp: out }));
  }

  function validateContact(): boolean {
    const errs: Record<string, boolean> = {};
    if (!contact.full_name.trim() || contact.full_name.trim().length < 2) errs.full_name = true;
    if (contact.whatsapp.replace(/\D/g, "").length < 10) errs.whatsapp = true;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email.trim())) errs.email = true;
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateContact()) return;

    const isDisqualified =
      qual.faturamento === "ate_20k" ||
      (qual.tipo === "marca_pessoal" && qual.tempo === "menos_2");

    const qualTag = isDisqualified ? "lead-desqualificado" : "lead-qualificado";

    const tipoLabel: Record<string, string> = {
      empresa: "Empresa",
      marca_pessoal: "Marca Pessoal",
    };
    const tempoLabel: Record<string, string> = {
      menos_2: "Menos de 2 anos",
      "2_5": "2 a 5 anos",
      "5_10": "5 a 10 anos",
      "10_mais": "Mais de 10 anos",
    };
    const fatLabel: Record<string, string> = {
      ate_20k: "Até R$20k",
      "20_50k": "R$20k a R$50k",
      "50_100k": "R$50k a R$100k",
      "100k_mais": "Acima de R$100k",
    };
    const dorLabel: Record<string, string> = {
      marca_nao_traduz: "Marca não traduz o valor entregue",
      discurso_desalinhado: "Discurso desalinhado entre a equipe",
      identidade_nao_vende: "Identidade visual que não gera vendas",
      competindo_preco: "Competindo por preço com concorrentes piores",
    };

    const notes = [
      `LP Posicionamento de Marca`,
      `Tipo: ${tipoLabel[qual.tipo] || qual.tipo}`,
      qual.tempo ? `Tempo no mercado: ${tempoLabel[qual.tempo] || qual.tempo}` : null,
      `Faturamento: ${fatLabel[qual.faturamento] || qual.faturamento}`,
      `Principal dor: ${dorLabel[qual.dor] || qual.dor}`,
      `Qualificação: ${isDisqualified ? "DESQUALIFICADO" : "QUALIFICADO"}`,
    ]
      .filter(Boolean)
      .join(" | ");

    gtmPush("form_submit", {
      service: "posicionamento-de-marca",
      qualified: !isDisqualified,
      tipo: qual.tipo,
      faturamento: qual.faturamento,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_term: utmParams.utm_term,
    });

    const result = await submitLead({
      full_name: contact.full_name.trim(),
      email: contact.email.trim(),
      whatsapp: contact.whatsapp,
      notes,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_term: utmParams.utm_term,
      source: "LP Posicionamento de Marca",
      service_interest: "Posicionamento de Marca",
      form_source: "posicionamento-de-marca",
      pipeline: "new_lead",
      stage: qualTag === "lead-qualificado" ? "New Lead" : "Desqualificado",
    });

    if (result.success) {
      setSubmitted(true);
      // Navigate to /obrigado for conversion tracking pixel
      navigate(`/obrigado?service=posicionamento-de-marca&q=${qualTag}`);
    }
  }

  return (
    <section
      id="diagnostico"
      className="section-spacing bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(700px 400px at 0% 0%, rgba(220,180,100,0.12), transparent 60%)",
        }}
      />
      <div className="container-sm max-w-5xl relative">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT — copy */}
          <div>
            <RevealSection>
              <p className="text-xs font-mono tracking-widest uppercase text-accent mb-4">
                08 · Diagnóstico de marca
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground max-w-[22ch] mb-5">
                Pronto para descobrir onde sua marca perde valor?
              </h2>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-8">
                Preencha em 2 minutos. Retornamos em até 1 dia útil pelo WhatsApp com os próximos passos.
              </p>
            </RevealSection>

            {/* trust signals */}
            <div className="space-y-3">
              {[
                { icon: Clock, text: "45 minutos de diagnóstico ao vivo com os sócios" },
                { icon: Award, text: "Análise da sua marca feita antes da reunião" },
                { icon: Zap, text: "Retorno em até 1 dia útil — sem compromisso" },
              ].map((s) => (
                <div key={s.text} className="flex items-center gap-3">
                  <s.icon className="h-4 w-4 text-accent flex-none" />
                  <span className="text-sm text-primary-foreground/65">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <RevealSection delay={100}>
            <div className="bg-background text-foreground overflow-hidden">
              {/* form header */}
              <div className="bg-primary/90 px-6 py-4 flex items-center justify-between border-b border-white/10">
                <span className="font-bold text-primary-foreground text-sm">
                  Diagnóstico de posicionamento
                </span>
                <span className="text-xs font-mono text-accent/80 tracking-widest uppercase">
                  sm. agency
                </span>
              </div>

              <div className="p-6 md:p-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* progress bar */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-1 h-1.5 bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-foreground/40 whitespace-nowrap">
                        Etapa {step} de {totalSteps}
                      </span>
                    </div>

                    {/* STEP 1 */}
                    {step === 1 && (
                      <div>
                        <p className="font-bold text-lg mb-5">O que você quer posicionar?</p>
                        <RadioOption
                          name="tipo" value="empresa" label="Minha empresa"
                          checked={qual.tipo === "empresa"}
                          onChange={(v) => { setQual((q) => ({ ...q, tipo: v })); setStepErrors((e) => ({ ...e, 1: null })); }}
                        />
                        <RadioOption
                          name="tipo" value="marca_pessoal" label="Minha marca pessoal como especialista"
                          checked={qual.tipo === "marca_pessoal"}
                          onChange={(v) => { setQual((q) => ({ ...q, tipo: v })); setStepErrors((e) => ({ ...e, 1: null })); }}
                        />
                        {qual.tipo === "marca_pessoal" && (
                          <div className="mt-5">
                            <p className="font-bold text-base mb-4">Há quanto tempo você atua no seu mercado?</p>
                            {[
                              { v: "menos_2", l: "Menos de 2 anos" },
                              { v: "2_5", l: "2 a 5 anos" },
                              { v: "5_10", l: "5 a 10 anos" },
                              { v: "10_mais", l: "Mais de 10 anos" },
                            ].map((o) => (
                              <RadioOption
                                key={o.v} name="tempo" value={o.v} label={o.l}
                                checked={qual.tempo === o.v}
                                onChange={(v) => { setQual((q) => ({ ...q, tempo: v })); setStepErrors((e) => ({ ...e, 1: null })); }}
                              />
                            ))}
                          </div>
                        )}
                        {stepErrors[1] && (
                          <p className="text-red-500 text-xs font-semibold mt-2">{stepErrors[1]}</p>
                        )}
                        <div className="mt-6">
                          <button type="button" onClick={nextStep}
                            className="w-full bg-accent text-primary font-bold py-3.5 hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
                            Continuar <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div>
                        <p className="font-bold text-lg mb-5">Qual o faturamento mensal médio do negócio?</p>
                        {[
                          { v: "ate_20k", l: "Até R$20 mil" },
                          { v: "20_50k", l: "R$20 mil a R$50 mil" },
                          { v: "50_100k", l: "R$50 mil a R$100 mil" },
                          { v: "100k_mais", l: "Acima de R$100 mil" },
                        ].map((o) => (
                          <RadioOption
                            key={o.v} name="faturamento" value={o.v} label={o.l}
                            checked={qual.faturamento === o.v}
                            onChange={(v) => { setQual((q) => ({ ...q, faturamento: v })); setStepErrors((e) => ({ ...e, 2: null })); }}
                          />
                        ))}
                        {stepErrors[2] && (
                          <p className="text-red-500 text-xs font-semibold mt-2">{stepErrors[2]}</p>
                        )}
                        <div className="mt-6 flex gap-3">
                          <button type="button" onClick={prevStep}
                            className="border border-border px-5 py-3.5 text-sm font-medium text-foreground/60 hover:border-foreground/40 transition-colors">
                            Voltar
                          </button>
                          <button type="button" onClick={nextStep}
                            className="flex-1 bg-accent text-primary font-bold py-3.5 hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
                            Continuar <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div>
                        <p className="font-bold text-lg mb-5">O que mais descreve o seu momento?</p>
                        {[
                          { v: "marca_nao_traduz", l: "Minha marca não traduz o valor do que eu entrego" },
                          { v: "discurso_desalinhado", l: "Cada pessoa da empresa explica o negócio de um jeito" },
                          { v: "identidade_nao_vende", l: "Tenho identidade visual, mas ela não gera vendas" },
                          { v: "competindo_preco", l: "Estou competindo por preço com concorrentes piores" },
                        ].map((o) => (
                          <RadioOption
                            key={o.v} name="dor" value={o.v} label={o.l}
                            checked={qual.dor === o.v}
                            onChange={(v) => { setQual((q) => ({ ...q, dor: v })); setStepErrors((e) => ({ ...e, 3: null })); }}
                          />
                        ))}
                        {stepErrors[3] && (
                          <p className="text-red-500 text-xs font-semibold mt-2">{stepErrors[3]}</p>
                        )}
                        <div className="mt-6 flex gap-3">
                          <button type="button" onClick={prevStep}
                            className="border border-border px-5 py-3.5 text-sm font-medium text-foreground/60 hover:border-foreground/40 transition-colors">
                            Voltar
                          </button>
                          <button type="button" onClick={nextStep}
                            className="flex-1 bg-accent text-primary font-bold py-3.5 hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
                            Continuar <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4 — contact */}
                    {step === 4 && (
                      <div>
                        <p className="font-bold text-lg mb-5">Para onde enviamos os horários do seu diagnóstico?</p>
                        <div className="space-y-4">
                          {/* Name */}
                          <div>
                            <label htmlFor="lp-name" className="block text-xs font-mono tracking-widest uppercase mb-2 text-foreground/60">
                              Nome
                            </label>
                            <input
                              id="lp-name" type="text" autoComplete="name" required
                              value={contact.full_name}
                              onChange={(e) => { setContact((c) => ({ ...c, full_name: e.target.value })); setFieldErrors((fe) => ({ ...fe, full_name: false })); }}
                              className={`w-full border px-4 py-3 text-sm bg-background focus:outline-none transition-colors ${fieldErrors.full_name ? "border-red-400 focus:border-red-400" : "border-border focus:border-accent"}`}
                            />
                            {fieldErrors.full_name && <p className="text-red-500 text-xs mt-1">Digite seu nome.</p>}
                          </div>

                          {/* WhatsApp */}
                          <div>
                            <label htmlFor="lp-phone" className="block text-xs font-mono tracking-widest uppercase mb-2 text-foreground/60">
                              WhatsApp
                            </label>
                            <input
                              id="lp-phone" type="tel" inputMode="tel" autoComplete="tel"
                              placeholder="(11) 90000-0000" required
                              value={contact.whatsapp}
                              onChange={(e) => { handlePhone(e); setFieldErrors((fe) => ({ ...fe, whatsapp: false })); }}
                              className={`w-full border px-4 py-3 text-sm bg-background focus:outline-none transition-colors ${fieldErrors.whatsapp ? "border-red-400 focus:border-red-400" : "border-border focus:border-accent"}`}
                            />
                            {fieldErrors.whatsapp && <p className="text-red-500 text-xs mt-1">Digite um WhatsApp válido com DDD.</p>}
                          </div>

                          {/* Email */}
                          <div>
                            <label htmlFor="lp-email" className="block text-xs font-mono tracking-widest uppercase mb-2 text-foreground/60">
                              E-mail
                            </label>
                            <input
                              id="lp-email" type="email" inputMode="email" autoComplete="email" required
                              value={contact.email}
                              onChange={(e) => { setContact((c) => ({ ...c, email: e.target.value })); setFieldErrors((fe) => ({ ...fe, email: false })); }}
                              className={`w-full border px-4 py-3 text-sm bg-background focus:outline-none transition-colors ${fieldErrors.email ? "border-red-400 focus:border-red-400" : "border-border focus:border-accent"}`}
                            />
                            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">Digite um e-mail válido.</p>}
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <button type="button" onClick={prevStep}
                            className="border border-border px-5 py-3.5 text-sm font-medium text-foreground/60 hover:border-foreground/40 transition-colors">
                            Voltar
                          </button>
                          <button
                            type="submit" disabled={isLoading}
                            className="flex-1 bg-accent text-primary font-bold py-3.5 hover:bg-accent/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                            {isLoading ? "Enviando…" : "Agendar meu diagnóstico"}
                            {!isLoading && <ArrowRight className="h-4 w-4" />}
                          </button>
                        </div>

                        <p className="text-foreground/35 text-xs font-mono mt-4 leading-relaxed">
                          Retornamos em até 1 dia útil. Seus dados não são compartilhados com terceiros.
                        </p>
                      </div>
                    )}
                  </form>
                ) : (
                  /* confirmation (shown briefly before navigate) */
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-2xl mb-3">Recebido!</h3>
                    <p className="text-foreground/60 text-sm">Redirecionando…</p>
                  </div>
                )}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 12 · MINIMAL FOOTER
// ═══════════════════════════════════════════════════════════════════
function LPFooter() {
  return (
    <footer className="bg-primary/95 text-primary-foreground/40 py-8">
      <div className="container-sm max-w-5xl flex flex-col sm:flex-row gap-3 justify-between text-xs font-mono">
        <span>© 2026 SM Agency · CNPJ: 49.800.040/0001-07 · Atendimento em todo o Brasil</span>
        <a
          href="/politica-de-privacidade"
          className="hover:text-primary-foreground/70 transition-colors"
          target="_blank" rel="noopener"
        >
          Política de privacidade
        </a>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 13 · STICKY MOBILE CTA
// ═══════════════════════════════════════════════════════════════════
function StickyCTA({ onCtaClick }: { onCtaClick: () => void }) {
  const [show, setShow] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show sticky after scrolling 400px
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"} sm:hidden`}
      style={{ background: "rgba(20,29,40,0.92)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(220,180,100,0.3)" }}
    >
      <button
        onClick={onCtaClick}
        className="w-full bg-accent text-primary font-bold py-4 flex items-center justify-center gap-2 text-sm"
      >
        Agendar diagnóstico de marca <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DEFAULT EXPORT — main LP page
// ═══════════════════════════════════════════════════════════════════
export default function PosicionamentoDeMarca() {
  const formSectionRef = useRef<HTMLElement>(null);

  // Message-match variant from ?g= param
  const [variant, setVariant] = useState(HERO_VARIANTS.default);
  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get("g") || "default";
    setVariant(HERO_VARIANTS[g] ?? HERO_VARIANTS.default);
  }, []);

  function scrollToForm() {
    const el = document.getElementById("diagnostico");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      gtmPush("cta_click", { location: "header_or_section" });
    }
  }

  return (
    <>
      <Helmet>
        <title>Posicionamento de Marca | Diagnóstico com a SM · Consultoria de Branding</title>
        <meta name="description" content="Consultoria de posicionamento de marca para empresas e especialistas. Mais de 100 marcas posicionadas. Comece por um diagnóstico de 45 minutos." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://sourcemkt.com.br/posicionamento-de-marca" />
        <meta property="og:title" content="Posicionamento de Marca | SM Agency" />
        <meta property="og:description" content="Sua empresa cresceu. Sua marca ficou para trás. Diagnóstico de posicionamento com a SM Agency." />
        <meta property="og:url" content="https://sourcemkt.com.br/posicionamento-de-marca" />
        <meta property="og:type" content="website" />
      </Helmet>

      <LPHeader onCtaClick={scrollToForm} />
      <main>
        <Hero variant={variant} onCtaClick={scrollToForm} />
        <AuthorityBar />
        <Reframe />
        <Fit />
        <Method onCtaClick={scrollToForm} />
        <DiagnosticProcess />
        <Proof onCtaClick={scrollToForm} />
        <Founders />
        <FAQ />
        <MultiStepForm />
      </main>
      <LPFooter />
      <StickyCTA onCtaClick={scrollToForm} />
    </>
  );
}
