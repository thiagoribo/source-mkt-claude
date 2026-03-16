import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, Eye, BarChart3 } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { useTeamMembers } from "@/hooks/queries/useTeamMembers";
import { casesData } from "@/data/casesData";
import ana1 from "@/assets/ana-nova.webp";
import thiago1 from "@/assets/thiago-1.webp";

// Equipe (fallback images)
import anaCastro from "@/assets/equipe/ana-castro.webp";
import caioCastro from "@/assets/equipe/caio-castro.webp";
import gabrielaMontezi from "@/assets/equipe/gabriela-montezi.webp";
import grazielliSantos from "@/assets/equipe/grazielli-santos.webp";
import lohanaVitoria from "@/assets/equipe/lohana-vitoria.webp";

// Team members (used when Supabase is unavailable)
const fallbackTeamMembers = [
  { name: "Caio Castro", role: "Designer Sênior", image: caioCastro },
  { name: "Ana Castro", role: "Designer Sênior", image: anaCastro },
  { name: "Gabriela Montezi", role: "Estrategista de Redes Sociais", image: gabrielaMontezi },
  { name: "Grazielli Santos", role: "Adm & Financeiro", image: grazielliSantos },
  { name: "Lohana Vitória", role: "Designer Sênior", image: lohanaVitoria },
];

// Map team member names to their local images
const teamImageMap: Record<string, string> = {
  "Ana Castro": anaCastro,
  "Caio Castro": caioCastro,
  "Gabriela Montezi": gabrielaMontezi,
  "Grazielli Santos": grazielliSantos,
  "Lohana Vitória": lohanaVitoria,
  "Lohana Vitoria": lohanaVitoria,
};

function getTeamImage(name: string): string | undefined {
  if (teamImageMap[name]) return teamImageMap[name];
  const normalize = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const norm = normalize(name);
  return Object.entries(teamImageMap).find(([k]) => normalize(k) === norm)?.[1];
}


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
              SM
            </span>

            <div className="relative max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Quem Somos
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
                Transformamos negócios{" "}
                <em className="not-italic text-foreground/40 font-normal">em</em>
                <br />
                <span className="text-primary">marcas de referência.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Acreditamos que marcas bem construídas não apenas vendem mais — criam conexões reais, geram autoridade e deixam um legado.
              </p>

              <p className="text-sm text-foreground/50 max-w-lg leading-relaxed">
                Fundada por Ana Santos e Thiago Castro, a SM Agency nasceu da convicção de que toda empresa estabelecida tem potencial para se tornar referência no seu mercado.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Nossa História ─── */
function Historia() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-16 items-start">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">Nossa história</p>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">Como Começou</h2>
              <div className="h-px w-12 bg-accent mt-6" />
            </div>

            <div className="space-y-5 text-foreground/70 leading-relaxed text-sm md:text-base">
              <p>
                Ana, com background profundo em branding e posicionamento de marca, via constantemente negócios sólidos com uma comunicação que não refletiam de fato a entrega e essência do negócio.
              </p>
              <p>
                Thiago, vindo do mundo de performance e crescimento, frustrava-se ao ver empresas competindo por preço e travadas em faturamentos insustentáveis enquanto poderiam estruturar seu ecossistema, jornada e experiência do cliente para escalar de forma segura e lucrativa.
              </p>
              <p className="pl-4 border-l-2 border-border text-foreground/50 text-sm">
                Juntos, desenvolveram uma abordagem que integra o melhor de ambos: profundidade conceitual do branding estratégico com o rigor analítico de performance. Hoje, após mais de 100 empresas, nossa metodologia provou sua eficácia em diversos setores.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Valores ─── */
function Valores() {
  const values = [
    {
      icon: Layers,
      title: "Profundidade sobre Superfície",
      text: "Não fazemos trabalho cosmético. Mergulhamos fundo em cada desafio estratégico até encontrar a essência que realmente diferencia nossos clientes.",
    },
    {
      icon: Eye,
      title: "Transparência Radical",
      text: "Não prometemos milagres. Somos honestos sobre o que é possível, quanto vai custar e quanto tempo vai levar. Se não somos o fit certo, dizemos isso logo na primeira conversa.",
    },
    {
      icon: BarChart3,
      title: "Resultados Mensuráveis",
      text: "Marca não é arte abstrata. Cada projeto tem métricas claras de sucesso e acompanhamento de impacto no negócio do cliente.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">O Que Nos Move</h2>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
          {values.map((v, i) => (
            <RevealSection key={v.title} delay={i * 150}>
              <div className="p-8 space-y-5">
                <v.icon className="h-8 w-8 text-accent" strokeWidth={1.25} />
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">{v.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Fundadores ─── */
function Fundadores() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-3">Liderança</p>
            <h2 className="text-3xl md:text-4xl font-bold">As Pessoas por Trás da Metodologia</h2>
          </div>
        </RevealSection>

        {/* Ana */}
        <RevealSection>
          <div className="mb-24">
            <div className="grid md:grid-cols-[400px_1fr] gap-14 items-start">
              {/* Foto */}
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={ana1}
                    alt="Ana Santos"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Stat bar */}
                <div className="bg-primary text-primary-foreground px-6 py-4 flex gap-8">
                  <div>
                    <p className="text-2xl font-bold font-serif">10+</p>
                    <p className="text-xs font-mono tracking-widest uppercase opacity-70">Anos de experiência</p>
                  </div>
                  <div className="w-px bg-primary-foreground/20" />
                  <div>
                    <p className="text-2xl font-bold font-serif">100+</p>
                    <p className="text-xs font-mono tracking-widest uppercase opacity-70">Marcas lideradas</p>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="space-y-6 md:pt-6">
                <div>
                  <div className="h-px w-10 bg-primary mb-5" />
                  <h3 className="text-3xl font-bold font-serif leading-tight">Ana Santos</h3>
                  <p className="text-primary font-mono font-medium text-xs tracking-widest uppercase mt-2">
                    Co-fundadora · Estrategista de Posicionamento de Marca & Negócios
                  </p>
                </div>

                <div className="text-foreground/65 text-sm leading-relaxed space-y-4">
                  <p>
                    Ana Santos é co-fundadora da SM Agency, onde lidera todos os projetos de posicionamento estratégico e construção de marca.
                  </p>
                  <p>
                    Com mais de 10 anos de experiência em branding para empresas de diversos setores, desenvolveu uma abordagem única que combina rigor analítico com sensibilidade para traduzir a essência de um negócio em territórios de comunicação memoráveis.
                  </p>
                  <p>
                    Sua expertise está em identificar o que realmente diferencia uma empresa no mercado — não o que ela quer ser, mas o que ela genuinamente é — e construir posicionamento em cima dessa verdade.
                  </p>
                </div>

                <blockquote className="border-l-2 border-primary pl-5 text-foreground/50 text-sm italic leading-relaxed">
                  "Marca não é estética. É a clareza sobre quem você é e para quem você existe."
                </blockquote>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Divider */}
        <div className="h-px bg-border mb-24" />

        {/* Thiago */}
        <RevealSection>
          <div className="grid md:grid-cols-[400px_1fr] gap-14 items-start">
            {/* Foto */}
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={thiago1}
                  alt="Thiago Castro"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Stat bar */}
              <div className="bg-primary text-primary-foreground px-6 py-4 flex gap-8">
                <div>
                  <p className="text-2xl font-bold font-serif">15+</p>
                  <p className="text-xs font-mono tracking-widest uppercase opacity-70">Anos de mercado</p>
                </div>
                <div className="w-px bg-primary-foreground/20" />
                <div>
                  <p className="text-2xl font-bold font-serif">6+</p>
                  <p className="text-xs font-mono tracking-widest uppercase opacity-70">Países de atuação</p>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 md:pt-6">
              <div>
                <div className="h-px w-10 bg-primary mb-5" />
                <h3 className="text-3xl font-bold font-serif leading-tight">Thiago Castro</h3>
                <p className="text-primary font-mono font-medium text-xs tracking-widest uppercase mt-2">
                  Co-fundador · Performance e Crescimento
                </p>
              </div>

              <div className="text-foreground/65 text-sm leading-relaxed space-y-4">
                <p>
                  Thiago Castro é co-fundador da SM Agency, onde lidera a dimensão de performance, estruturação comercial e crescimento de negócios.
                </p>
                <p>
                  Com mais de 15 anos de atuação em mercados nacionais e internacionais — incluindo EUA, China, Austrália, Portugal, Itália e Espanha — desenvolveu expertise em estruturar ecossistemas de negócios, jornadas do cliente e arquiteturas de funil que geram crescimento escalável e lucrativo.
                </p>
                <p>
                  O que diferencia a abordagem de Thiago é a capacidade de enxergar o negócio de forma sistêmica: estruturando processos, canais e estratégias comerciais que transformam faturamento inconsistente em crescimento previsível.
                </p>
              </div>

              <blockquote className="border-l-2 border-primary pl-5 text-foreground/50 text-sm italic leading-relaxed">
                "Posicionamento sem resultado não é estratégia — é apenas uma boa intenção."
              </blockquote>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Equipe ─── */
function Equipe() {
  const { data: supabaseMembers, isLoading } = useTeamMembers();

  const FOUNDER_NAMES = ["Ana Santos", "Thiago Castro"];

  // Filter out founders from Supabase data, or use fallback
  const teamMembers = supabaseMembers && supabaseMembers.length > 0
    ? supabaseMembers
        .filter(m => !FOUNDER_NAMES.includes(m.name))
        .map(m => ({
          name: m.name,
          role: m.role,
          image: m.image_url || getTeamImage(m.name) || anaCastro,
        }))
    : fallbackTeamMembers;

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        {/* Header */}
        <RevealSection>
          <div className="mb-16 space-y-4 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">
              Nossa Equipe
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Equipe SM. Agency
            </h2>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Desenvolvemos um processo rigoroso de seleção e treinamento. Cada membro
              é treinado diretamente por Ana e Thiago na metodologia SM, passando por
              meses de imersão em projetos reais antes de liderar componentes de consultoria.
            </p>
            <div className="h-px w-12 bg-accent mt-6" />
          </div>
        </RevealSection>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <RevealSection key={member.name} delay={index * 100}>
              <div className="group border border-border/50 hover:border-primary/40 transition-colors duration-300 overflow-hidden">
                {/* Foto */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = teamImageMap[member.name];
                      if (fallback && target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-6 space-y-2 border-t border-border/30">
                  <h3 className="text-lg font-bold font-serif">{member.name}</h3>
                  <p className="text-primary font-mono text-xs tracking-widest uppercase">
                    {member.role}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Números ─── */
function Numeros() {
  const stats = [
    { value: "20+", label: "Anos de expertise combinados" },
    { value: "100+", label: "Negócios transformados" },
    { value: "10+", label: "Projetos por trimestre" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Impacto em Números</h2>
        </RevealSection>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
          {stats.map((s, i) => (
            <RevealSection key={s.label} delay={i * 150}>
              <div className="p-10 space-y-3 text-center">
                <p className="text-5xl md:text-6xl font-bold font-serif text-primary">
                  <AnimatedNumber value={s.value} />
                </p>
                <p className="text-foreground/55 text-sm">{s.label}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Portfolio ─── */
function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const categories = ["Todos", "Consultoria 360°", "Branding Empresarial"];

  const filtered =
    filter === "Todos"
      ? casesData
      : casesData.filter((c) => c.category === filter);

  return (
    <section id="portfolio" className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Trabalhos que Nos Orgulham</h2>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs font-mono uppercase tracking-widest px-4 py-2 border transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground/50 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((c, i) => (
            <RevealSection key={c.id} delay={i * 100}>
              <Link
                to={`/cases/${c.id}`}
                className="group block border border-border hover:border-primary/40 transition-colors overflow-hidden"
              >
                {/* Metrics highlight */}
                <div className="bg-primary/5 p-8 grid grid-cols-3 gap-4 border-b border-border/30">
                  {c.results.map((r, ri) => (
                    <div key={ri} className="text-center">
                      <p className="text-2xl md:text-3xl font-serif font-bold text-primary leading-none mb-1">
                        {r.metric}
                      </p>
                      <p className="text-[10px] text-foreground/50 leading-tight">{r.label}</p>
                    </div>
                  ))}
                </div>

                {/* Card body */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    {c.category}
                  </span>
                  <h3 className="font-bold text-foreground">{c.client}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">{c.tagline}</p>

                  {c.quote && (
                    <p className="text-foreground/40 text-xs italic pt-2 border-t border-border/20 leading-relaxed line-clamp-2">
                      "{c.quote.text}"
                    </p>
                  )}

                  <p className="text-primary text-sm font-medium group-hover:underline pt-1">
                    Ver case completo →
                  </p>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Final ─── */
function CTAFinal() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <span
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 font-bold font-serif leading-none select-none pointer-events-none hidden lg:block"
        style={{ opacity: 0.05, fontSize: "200px" }}
      >
        →
      </span>

      <div className="container-sm max-w-3xl relative">
        <RevealSection>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Vamos Construir Algo Extraordinário Juntos?
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
              Se você sente que sua empresa ou marca pessoal tem potencial não realizado, vamos conversar. Agende um diagnóstico gratuito de 30 minutos.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none text-base px-10 h-12 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
              asChild
            >
              <a href="https://wa.me/5511937292921" target="_blank" rel="noopener noreferrer">
                Agendar Conversa
              </a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function QuemSomos() {
  return (
    <>
      <Helmet>
        <title>Quem Somos | SM Agency — Agência de Branding e Marketing</title>
        <meta name="description" content="Conheça a SM Agency: nossa história, valores e os profissionais por trás de marcas que se tornaram referência de mercado. Branding e consultoria estratégica." />
        <link rel="canonical" href="https://sourcemkt.com.br/quem-somos" />
        <meta property="og:title" content="Quem Somos | SM Agency — Agência de Branding e Marketing" />
        <meta property="og:description" content="Conheça a SM Agency: nossa história, valores e os profissionais por trás de marcas que se tornaram referência de mercado." />
        <meta property="og:url" content="https://sourcemkt.com.br/quem-somos" />
      </Helmet>
      <Hero />
      <Historia />
      <Valores />
      <Fundadores />
      <Equipe />
      <Numeros />
      <Portfolio />
      <CTAFinal />
    </>
  );
}
