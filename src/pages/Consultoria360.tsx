import { useRef, useState } from "react";
import { trackLead, trackFormStart } from "@/lib/analytics";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RevealSection from "@/components/shared/RevealSection";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import { Check } from "lucide-react";
import ana1 from "@/assets/ana-nova.webp";
import thiago1 from "@/assets/thiago-1.webp";
import logoCodigoVarejista from "@/assets/clientes/Logo/codigo-varejista.png";
import logoCelsoMissias from "@/assets/clientes/Logo/celso-missias.png";
import logoStartImobiliario from "@/assets/clientes/Logo/start-imobilirio.png";
import logoCelmi from "@/assets/clientes/Logo/celmi.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    title: "Funil que vaza leads qualificados",
    desc: "Tráfego existe, mas as conversões não acompanham. Cada etapa sangra oportunidade.",
  },
  {
    title: "CRM subutilizado ou inexistente",
    desc: "A operação comercial depende de planilhas, memória e sorte. Nenhuma previsibilidade.",
  },
  {
    title: "Branding sem posicionamento real",
    desc: "A empresa tem identidade visual, mas não tem um posicionamento que justifique o preço premium.",
  },
  {
    title: "Time desalinhado com a estratégia",
    desc: "Cada área opera com sua própria versão da visão da empresa. Cultura e comunicação fragmentadas.",
  },
  {
    title: "Tráfego pago queimando verba",
    desc: "Campanhas rodando sem estrutura de funil. ROAS negativo ou impossível de medir com precisão.",
  },
  {
    title: "Crescimento sem previsibilidade",
    desc: "Meses bons e meses ruins sem explicação clara. Impossível escalar o que não é previsível.",
  },
];

const PILARES = [
  {
    num: "01",
    name: "Funil de Vendas",
    desc: "Mapeamento, diagnóstico e reestruturação de cada etapa do processo comercial com foco em conversão.",
  },
  {
    num: "02",
    name: "CRM & Operação",
    desc: "Implementação ou otimização do CRM, automações de follow-up e dashboards de previsibilidade.",
  },
  {
    num: "03",
    name: "Tráfego Pago",
    desc: "Estratégia e estrutura de campanhas com atribuição real, funil alinhado e redução de CAC.",
  },
  {
    num: "04",
    name: "Posicionamento",
    desc: "Definição do posicionamento competitivo que justifica preço premium e reduz objeções.",
  },
  {
    num: "05",
    name: "Branding Estratégico",
    desc: "Estratégia de marca alinhada ao negócio — não só estética, mas percepção de valor real.",
  },
  {
    num: "06",
    name: "Cultura & Comunicação",
    desc: "Alinhamento interno entre times, propósito, comunicação estratégica e coerência de mensagem.",
  },
];

const STATS = [
  { value: "+62%", label: "Taxa de conversão média após reestruturação do funil" },
  { value: "3.8x", label: "Retorno médio sobre investimento na consultoria" },
  { value: "41%", label: "Redução de CAC com tráfego e funil alinhados" },
  { value: "90d", label: "Prazo médio para primeiros resultados mensuráveis" },
];

const DEPOIMENTOS = [
  {
    text: "Em 4 meses, reestruturamos o CRM, zeramos o desperdício em tráfego pago e o time comercial finalmente tinha previsibilidade de pipeline. Foi a primeira vez que consegui projetar o faturamento do trimestre com confiança.",
    author: "Ricardo Fonseca",
    role: "CEO · Vértice Soluções (R$18M faturamento)",
  },
  {
    text: "O posicionamento que desenvolvemos junto abriu mercado para uma linha premium que triplicou nosso ticket médio. Não é consultoria de papel — é execução de verdade.",
    author: "Camila Torres",
    role: "Diretora Comercial · Nórdica Retail",
  },
];

const ETAPAS = [
  {
    num: "01",
    name: "Auditoria Estratégica 360°",
    desc: "Diagnóstico completo dos 6 pilares: funil, CRM, tráfego, posicionamento, branding e cultura. Identificamos onde a empresa está sangrando.",
    tag: "Semanas 1–2",
  },
  {
    num: "02",
    name: "Mapa de Prioridades",
    desc: "Definimos a sequência de intervenções com base em impacto e velocidade de retorno. Nada de fazer tudo ao mesmo tempo.",
    tag: "Semana 3",
  },
  {
    num: "03",
    name: "Estratégia & Plano de Execução",
    desc: "Entregamos o playbook completo com planos táticos por pilar, responsáveis, prazos e KPIs de acompanhamento.",
    tag: "Semanas 4–6",
  },
  {
    num: "04",
    name: "Implementação Acompanhada",
    desc: "Não entregamos relatório e sumimos. Estamos junto na execução — reuniões semanais, revisões e ajustes em tempo real.",
    tag: "Meses 2–4",
  },
  {
    num: "05",
    name: "Consolidação e Escala",
    desc: "Transferência de conhecimento, documentação dos processos e estrutura para que a empresa opere independente depois da consultoria.",
    tag: "Meses 5–6",
  },
];

const PLANOS = [
  {
    badge: "Diagnóstico",
    name: "Sprint 360°",
    price: "R$30K",
    period: "pagamento único · 30 dias",
    modality: "Encontros 100% remotos",
    featured: false,
    items: [
      "Auditoria completa dos 6 pilares",
      "Mapa de prioridades estratégicas",
      "Playbook com plano de ação",
      "2 sessões de alinhamento com liderança",
      "Entrega em até 30 dias",
    ],
  },
  {
    badge: "Mais contratado",
    name: "Consultoria 360°",
    price: "R$50K",
    period: "investimento total · 6 meses",
    modality: "Encontros híbridos",
    featured: true,
    items: [
      "Tudo do Sprint 360°",
      "Acompanhamento semanal por 6 meses",
      "Execução junto ao time",
      "Funil, CRM, tráfego e branding",
      "Acesso direto aos consultores seniores",
    ],
  },
  {
    badge: "Enterprise",
    name: "Transformação Total",
    price: "R$70K+",
    period: "investimento total · 12 meses",
    modality: "Encontros presenciais",
    featured: false,
    items: [
      "Tudo da Consultoria 360°",
      "Desenvolvimento de ferramentas próprias (CRM, automações)",
      "Gerenciamento de campanhas por 1 mês",
      "Cultura, alinhamento e comunicação interna",
      "Treinamento de times comerciais",
      "Suporte por 12 meses",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Para qual tipo de empresa é indicada essa consultoria?",
    a: "Empresas de médio porte — entre R$3M e R$60M de faturamento — que já têm produto validado e mercado comprovado, mas enfrentam dificuldade em escalar de forma previsível. Atendemos B2B e B2C com times comerciais estruturados.",
  },
  {
    q: "Quanto tempo até ver os primeiros resultados?",
    a: "Na maioria dos projetos, os primeiros indicadores mudam entre o 60° e o 90° dia — especialmente nos pilares de funil e CRM. Resultados de branding e posicionamento têm horizonte um pouco mais longo, de 4 a 6 meses.",
  },
  {
    q: "Vocês só entregam estratégia ou também executam?",
    a: "Executamos junto. O diferencial da consultoria 360° é exatamente a presença na implementação — reuniões semanais, revisões de campanha, acompanhamento de CRM, treinamentos com o time. Não fazemos relatório de gaveta.",
  },
  {
    q: "Como funciona o diagnóstico gratuito?",
    a: "É uma call de 45 minutos com um consultor sênior. Você apresenta o cenário atual da empresa e nós mapeamos os 2 ou 3 maiores gargalos em tempo real. Sem compromisso de contratação — o valor está na conversa.",
  },
  {
    q: "O investimento pode ser parcelado?",
    a: "Sim. Trabalhamos com entrada e parcelamento ao longo do projeto — geralmente 30% na assinatura e o restante em parcelas mensais. Os detalhes são definidos na proposta personalizada.",
  },
];

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-accent">
      <span className="w-6 h-px bg-accent shrink-0" />
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-background">
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display font-black select-none pointer-events-none text-foreground/[0.028] whitespace-nowrap leading-none tracking-tighter"
        style={{ fontSize: "clamp(100px, 18vw, 220px)" }}
      >
        360°
      </span>

      <div className="container-sm max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 md:gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <RevealSection>
              <SectionLabel>Consultoria Estratégica 360°</SectionLabel>
            </RevealSection>

            <RevealSection delay={80}>
              <h1
                className="font-display font-black text-foreground leading-[1.05] mt-4 mb-4 md:mt-6 md:mb-6"
                style={{ fontSize: "clamp(32px, 7vw, 58px)", letterSpacing: "-0.02em" }}
              >
                Sua empresa cresce.
                <br />
                <span className="text-accent italic">Mas não escala.</span>
              </h1>
            </RevealSection>

            <RevealSection delay={140}>
              <p className="text-foreground/60 text-sm md:text-base mb-8 md:mb-10 max-w-md leading-relaxed">
                Diagnóstico e execução integrados — funil de vendas, CRM, tráfego pago,
                branding, cultura e comunicação — para empresas prontas para crescer de
                forma estruturada.
              </p>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="flex flex-col items-stretch sm:items-start gap-3">
                <Button size="lg" className="rounded-none px-8 h-12 text-sm w-full sm:w-auto" asChild>
                  <a href="#diagnostico">Quero meu diagnóstico gratuito →</a>
                </Button>
                <span className="flex items-center gap-2 text-xs text-foreground/45">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  Apenas 4 vagas disponíveis em maio
                </span>
              </div>
            </RevealSection>
          </div>

          {/* Metrics card */}
          <RevealSection delay={320} variant="right">
            <div className="relative bg-card border border-border p-5 sm:p-7 space-y-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent/40" />
              <p className="text-[11px] font-mono tracking-wider uppercase text-foreground/40">
                Resultado médio · clientes ativos
              </p>
              {[
                { val: "3.8×", label: "Retorno sobre investimento", badge: "↑ Comprovado" },
                { val: "+62%", label: "Taxa de conversão do funil", badge: "↑ Média" },
                { val: "90d", label: "Até primeiros resultados", badge: "Garantido" },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start justify-between ${i < 2 ? "pb-4 border-b border-border" : ""}`}
                >
                  <div>
                    <p className="font-display font-bold text-foreground text-xl sm:text-2xl">{m.val}</p>
                    <p className="text-xs text-foreground/50 mt-0.5">{m.label}</p>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 mt-1 shrink-0">
                    {m.badge}
                  </span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

const CLIENT_LOGOS = [
  { src: logoCodigoVarejista, alt: "Código Varejista" },
  { src: logoCelsoMissias,    alt: "Celso Missias" },
  { src: logoStartImobiliario, alt: "Start Imobiliário" },
  { src: logoCelmi,           alt: "Celmi" },
];

function SocialProof() {
  return (
    <section className="py-10 border-y border-border bg-card overflow-hidden">
      <p className="text-[11px] font-mono tracking-widest uppercase text-foreground/35 text-center mb-8">
        Empresas que já transformaram sua operação
      </p>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade esquerda */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-card to-transparent" />
        {/* Fade direita */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-card to-transparent" />

        <div
          className="flex items-center gap-14 w-max animate-marquee hover:[animation-play-state:paused]"
          aria-hidden="false"
        >
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={i < CLIENT_LOGOS.length ? logo.alt : ""}
              aria-hidden={i >= CLIENT_LOGOS.length}
              className="h-8 w-auto object-contain grayscale opacity-40 hover:opacity-70 transition-opacity mix-blend-multiply shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Problema() {
  return (
    <section className="section-spacing bg-primary text-primary-foreground">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-accent">
              <span className="w-6 h-px bg-accent shrink-0" />
              O diagnóstico
            </p>
            <h2
              className="font-display font-bold text-primary-foreground"
              style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
            >
              Você reconhece algum desses cenários?
            </h2>
            <p className="text-primary-foreground/50 text-sm max-w-lg">
              Esses são os padrões que identificamos em mais de 300 diagnósticos realizados.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-foreground/10 border border-primary-foreground/10">
          {PAIN_POINTS.map((p, i) => (
            <RevealSection key={i} delay={i * 65}>
              <div className="bg-primary p-7 hover:bg-white/[0.03] transition-colors h-full">
                <div className="w-4 h-4 border border-primary-foreground/20 mb-4" />
                <p className="text-sm font-medium text-primary-foreground mb-2">{p.title}</p>
                <p className="text-xs text-primary-foreground/45 leading-relaxed">{p.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pilares() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-10 md:mb-16">
          <RevealSection>
            <div className="space-y-3">
              <SectionLabel>A solução</SectionLabel>
              <h2
                className="font-display font-bold"
                style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
              >
                6 pilares integrados.
                <br />
                Uma única estratégia.
              </h2>
            </div>
          </RevealSection>
          <RevealSection delay={100}>
            <p className="text-foreground/55 text-sm leading-relaxed">
              Nenhum pilar funciona isolado. A consultoria 360° age no sistema completo —
              porque empresas que não escalam quase sempre têm problemas em múltiplas
              frentes simultaneamente.
            </p>
          </RevealSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {PILARES.map((p, i) => (
            <RevealSection key={i} delay={i * 55}>
              <div className="group bg-card p-6 hover:bg-primary transition-colors cursor-default h-full">
                <p className="font-display font-black text-[40px] leading-none text-foreground/[0.07] group-hover:text-accent mb-5 transition-colors">
                  {p.num}
                </p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary-foreground mb-2 transition-colors">
                  {p.name}
                </p>
                <p className="text-xs text-foreground/50 group-hover:text-primary-foreground/50 leading-relaxed transition-colors">
                  {p.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resultados() {
  return (
    <section className="section-spacing bg-card">
      <div className="container-sm max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <RevealSection>
              <div className="mb-10 space-y-3">
                <SectionLabel>Resultados</SectionLabel>
                <h2
                  className="font-display font-bold"
                  style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}
                >
                  O que muda depois da consultoria.
                </h2>
                <p className="text-foreground/55 text-sm leading-relaxed">
                  Trabalhamos com empresas de R$5M a R$50M de faturamento que estavam
                  crescendo, mas não conseguiam estruturar esse crescimento para se tornar
                  previsível.
                </p>
              </div>
            </RevealSection>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <RevealSection key={i} delay={i * 75}>
                  <div className="bg-background border border-border p-5">
                    <p className="font-display font-black text-3xl leading-none mb-2 text-foreground">
                      <AnimatedNumber value={s.value} />
                    </p>
                    <p className="text-xs text-foreground/50 leading-relaxed">{s.label}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {DEPOIMENTOS.map((d, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="relative bg-background border border-border p-7">
                  <span
                    aria-hidden
                    className="absolute top-3 left-5 font-display text-[64px] text-accent/20 leading-none select-none pointer-events-none"
                  >
                    "
                  </span>
                  <p className="text-sm italic text-foreground/75 leading-relaxed mb-4 relative z-10">
                    {d.text}
                  </p>
                  <p className="text-sm font-medium text-foreground">{d.author}</p>
                  <p className="text-xs text-foreground/45">{d.role}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metodologia() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <SectionLabel>Como funciona</SectionLabel>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}
            >
              5 etapas. Do diagnóstico à execução.
            </h2>
          </div>
        </RevealSection>

        <div className="border-t border-border divide-y divide-border">
          {ETAPAS.map((e, i) => (
            <RevealSection key={i} delay={i * 70}>
              <div className="grid grid-cols-[72px_1fr] gap-8 py-7 items-start">
                <p className="font-display font-black text-[44px] leading-none text-foreground/[0.06] pt-0.5">
                  {e.num}
                </p>
                <div>
                  <p className="text-base font-medium text-foreground mb-1.5">{e.name}</p>
                  <p className="text-sm text-foreground/55 leading-relaxed">{e.desc}</p>
                  <span className="inline-block mt-3 text-[11px] font-mono tracking-wider uppercase text-accent bg-accent/10 px-3 py-1">
                    {e.tag}
                  </span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lideranca() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-10 md:mb-16 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-primary">
              Supervisão direta dos fundadores
            </p>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}>
              Quem Conduz Sua Consultoria
            </h2>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
          <RevealSection>
            <div className="flex flex-col space-y-7">
              <img src={ana1} alt="Ana Santos" className="w-full object-cover object-top aspect-[3/4]" />
              <div className="space-y-4">
                <div>
                  <div className="h-px w-10 bg-primary mb-4" />
                  <h3 className="text-2xl font-display font-bold">Ana Santos</h3>
                  <p className="text-primary font-medium text-xs tracking-widest uppercase mt-1.5 font-mono">
                    Co-fundadora · Estratégia de Branding
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/30">
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-primary"><AnimatedNumber value="10+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Anos de mercado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-primary"><AnimatedNumber value="100+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Marcas lideradas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-primary"><AnimatedNumber value="15+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Segmentos</p>
                  </div>
                </div>
                <p className="text-foreground/65 text-sm leading-relaxed">
                  Ana lidera a dimensão de posicionamento e construção de marca, trazendo 10 anos de experiência em transformar empresas em referências de mercado.
                </p>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="flex flex-col space-y-7">
              <img src={thiago1} alt="Thiago Castro" className="w-full object-cover object-top aspect-[3/4]" />
              <div className="space-y-4">
                <div>
                  <div className="h-px w-10 bg-primary mb-4" />
                  <h3 className="text-2xl font-display font-bold">Thiago Castro</h3>
                  <p className="text-primary font-medium text-xs tracking-widest uppercase mt-1.5 font-mono">
                    Co-fundador · Performance e Crescimento
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/30">
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-primary"><AnimatedNumber value="15+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Anos de mercado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-primary"><AnimatedNumber value="6+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Países de atuação</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold text-primary"><AnimatedNumber value="99+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Projetos Aprovados</p>
                  </div>
                </div>
                <p className="text-foreground/65 text-sm leading-relaxed">
                  Thiago lidera a dimensão de performance, estruturação comercial e crescimento, com mais de 15 anos de atuação em 6 países e 99+ projetos aprovados.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>

        <RevealSection delay={300}>
          <p className="text-foreground/50 text-sm mt-12 max-w-2xl leading-relaxed pl-4 border-l-2 border-border">
            Cada projeto é supervisionado diretamente por Ana e Thiago, com execução por nossa equipe de estrategistas treinados na metodologia SM. Você terá um estrategista dedicado, com os fundadores presentes nos momentos críticos.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

function Investimento() {
  return (
    <section className="section-spacing bg-primary text-primary-foreground">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-accent">
              <span className="w-6 h-px bg-accent shrink-0" />
              Investimento
            </p>
            <h2
              className="font-display font-bold text-primary-foreground"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}
            >
              Três formatos. Um objetivo.
            </h2>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary-foreground/10 border border-primary-foreground/10">
          {PLANOS.map((p, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div
                className={`p-6 sm:p-8 h-full ${
                  p.featured
                    ? "bg-accent"
                    : "bg-primary/70 hover:bg-primary/50 transition-colors"
                }`}
              >
                <span
                  className={`inline-block text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 mb-5 ${
                    p.featured
                      ? "bg-black/15 text-foreground"
                      : "bg-primary-foreground/[0.06] text-primary-foreground/40"
                  }`}
                >
                  {p.badge}
                </span>
                <p
                  className={`font-display font-bold text-xl mb-2 ${
                    p.featured ? "text-foreground" : "text-primary-foreground"
                  }`}
                >
                  {p.name}
                </p>
                <p
                  className={`text-[10px] font-mono tracking-wider uppercase mt-4 -mb-0.5 ${
                    p.featured ? "text-foreground/45" : "text-primary-foreground/35"
                  }`}
                >
                  a partir de
                </p>
                <p
                  className={`font-display font-black text-[38px] leading-none mb-1 ${
                    p.featured ? "text-foreground" : "text-accent"
                  }`}
                >
                  {p.price}
                </p>
                <p
                  className={`text-xs mb-3 ${
                    p.featured ? "text-foreground/50" : "text-primary-foreground/35"
                  }`}
                >
                  {p.period}
                </p>
                <p
                  className={`text-[11px] font-mono tracking-wide mb-6 flex items-center gap-1.5 ${
                    p.featured ? "text-foreground/60" : "text-primary-foreground/45"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                  {p.modality}
                </p>
                <ul className="space-y-2.5">
                  {p.items.map((item, j) => (
                    <li
                      key={j}
                      className={`flex items-start gap-2.5 text-sm ${
                        p.featured ? "text-foreground/75" : "text-primary-foreground/55"
                      }`}
                    >
                      <Check
                        className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                          p.featured ? "text-foreground/50" : "text-accent"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section-spacing bg-card">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
            >
              O que você precisa saber
            </h2>
          </div>
        </RevealSection>

        <div className="max-w-2xl">
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item, i) => (
              <RevealSection key={i} delay={i * 50}>
                <AccordionItem value={`faq-${i}`} className="border-b border-border px-0">
                  <AccordionTrigger className="text-sm font-medium text-foreground py-5 text-left hover:no-underline hover:text-accent transition-colors [&>svg]:text-foreground/40">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/55 leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </RevealSection>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const { submitLead, isLoading } = useSubmitLead("consultoria-estrategica");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    const result = await submitLead({
      full_name: fd.get("name") as string,
      email: fd.get("email") as string,
      whatsapp: fd.get("whatsapp") as string,
      company: fd.get("company") as string,
      source: "LP Consultoria 360°",
    });
    if (result.success) {
      trackLead("consultoria-360");
      setSubmitted(true);
    }
  };

  return (
    <section id="diagnostico" className="section-spacing bg-background relative overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display font-black select-none pointer-events-none text-foreground/[0.02] whitespace-nowrap leading-none tracking-tighter"
        style={{ fontSize: "clamp(80px, 15vw, 180px)" }}
      >
        360°
      </span>

      <div className="container-sm max-w-5xl relative z-10">
        <div className="max-w-md mx-auto text-center">
          <RevealSection>
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-medium px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              Apenas 4 vagas abertas em maio
            </span>
          </RevealSection>

          <RevealSection delay={70}>
            <h2
              className="font-display font-black mb-4"
              style={{ fontSize: "clamp(30px, 4vw, 46px)" }}
            >
              Pronto para escalar com{" "}
              <span className="text-accent italic">estrutura?</span>
            </h2>
          </RevealSection>

          <RevealSection delay={120}>
            <p className="text-foreground/55 text-sm mb-9 leading-relaxed">
              Preencha abaixo para agendar seu diagnóstico gratuito de 45 minutos com um
              consultor sênior. Sem compromisso.
            </p>
          </RevealSection>

          {submitted ? (
            <RevealSection>
              <div className="border border-border bg-card p-10 space-y-3">
                <div className="w-10 h-10 bg-emerald-50 flex items-center justify-center mx-auto">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="font-medium text-foreground text-sm">
                  Recebemos sua solicitação!
                </p>
                <p className="text-xs text-foreground/50">
                  Entraremos em contato pelo WhatsApp em até 2h.
                </p>
              </div>
            </RevealSection>
          ) : (
            <RevealSection delay={180}>
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                  name="name"
                  placeholder="Seu nome"
                  required
                  onFocus={() => trackFormStart("consultoria-360")}
                  className="rounded-none h-12 text-sm bg-card border-border"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Seu e-mail"
                  required
                  className="rounded-none h-12 text-sm bg-card border-border"
                />
                <Input
                  name="whatsapp"
                  type="tel"
                  placeholder="WhatsApp com DDD"
                  required
                  className="rounded-none h-12 text-sm bg-card border-border"
                />
                <Input
                  name="company"
                  placeholder="Nome da empresa"
                  required
                  className="rounded-none h-12 text-sm bg-card border-border"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="rounded-none h-12 text-sm w-full mt-1"
                >
                  {isLoading ? "Enviando..." : "Quero meu diagnóstico gratuito →"}
                </Button>
              </form>
              <p className="text-xs text-foreground/40 mt-4">
                Você receberá uma confirmação por WhatsApp em até 2h. Sem spam.
              </p>
            </RevealSection>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Consultoria360() {
  return (
    <>
      <Helmet>
        <title>Consultoria Estratégica 360° | SM Agency</title>
        <meta
          name="description"
          content="Diagnóstico e execução integrados em funil de vendas, CRM, tráfego pago, branding e cultura. Para empresas de R$5M–R$50M prontas para escalar com estrutura."
        />
        <meta property="og:title" content="Consultoria Estratégica 360° | SM Agency" />
        <meta
          property="og:description"
          content="Diagnóstico 360° e execução integrada para empresas que crescem mas não escalam. Funil, CRM, tráfego pago, branding e cultura alinhados."
        />
        <link rel="canonical" href="https://sourcemkt.com.br/consultoria-360" />
      </Helmet>

      <Hero />
      <SocialProof />
      <Problema />
      <Pilares />
      <Resultados />
      <Metodologia />
      <Lideranca />
      <Investimento />
      <FAQ />
      <CTAFinal />
    </>
  );
}
