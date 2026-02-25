import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, Eye, BarChart3 } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { useTeamMembers } from "@/hooks/queries/useTeamMembers";
import { useCases } from "@/hooks/queries/useCases";
import ana1 from "@/assets/ana-foto.jpeg";
import thiago1 from "@/assets/thiago-1.png";

// Equipe (fallback images)
import anaCastro from "@/assets/equipe/ana-castro.jpeg";
import caioCastro from "@/assets/equipe/caio-castro.jpg";
import gabrielaMontezi from "@/assets/equipe/gabriela-montezi.png";
import grazielliSantos from "@/assets/equipe/grazielli-santos.jpg";
import lohanaVitoria from "@/assets/equipe/lohana-vitoria.png";

// Fallback data for team members (used when Supabase is unavailable)
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

// Fallback data for cases/portfolio
const fallbackProjects = [
  { name: "Tech Solutions", category: "Consultoria Estratégica", result: "3× ticket médio" },
  { name: "Consultoria Premium", category: "Branding Empresarial", result: "Segmento premium" },
  { name: "E-commerce Moda", category: "Consultoria Estratégica", result: "+180% margem" },
  { name: "Thatiane Oliveira", category: "Branding Pessoal", result: "Autoridade construída" },
  { name: "Grupo RA", category: "Branding Empresarial", result: "Reposicionamento completo" },
  { name: "StartupX", category: "Consultoria Estratégica", result: "Entrada no mercado premium" },
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
                Fundada por Ana Santos e Thiago Bianchi, a SM Agency nasceu da convicção de que toda empresa estabelecida tem potencial para se tornar referência no seu mercado.
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
                A SM Agency nasceu quando Ana e Thiago, cada um com mais de uma década de experiência em suas áreas, perceberam um padrão frustrante no mercado: empresas excelentes sendo tratadas como commodities porque suas marcas não comunicavam o valor real que entregavam.
              </p>
              <p>
                Ana, com background profundo em branding e design estratégico, via constantemente negócios sólidos com identidades que não refletiam sua essência. Thiago, vindo do mundo de performance e crescimento, frustrava-se ao ver empresas competindo por preço quando poderiam justificar premium com posicionamento correto.
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
                    <p className="text-2xl font-bold font-serif">15+</p>
                    <p className="text-xs font-mono tracking-widest uppercase opacity-70">Anos de experiência</p>
                  </div>
                  <div className="w-px bg-primary-foreground/20" />
                  <div>
                    <p className="text-2xl font-bold font-serif">50+</p>
                    <p className="text-xs font-mono tracking-widest uppercase opacity-70">Marcas reposicionadas</p>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="space-y-6 md:pt-6">
                <div>
                  <div className="h-px w-10 bg-primary mb-5" />
                  <h3 className="text-3xl font-bold font-serif leading-tight">Ana Santos</h3>
                  <p className="text-primary font-mono font-medium text-xs tracking-widest uppercase mt-2">
                    Co-fundadora · Diretora de Branding
                  </p>
                </div>

                <div className="text-foreground/65 text-sm leading-relaxed space-y-4">
                  <p>
                    Ana Santos é co-fundadora e Diretora de Branding da SM Agency, onde lidera todos os projetos de posicionamento estratégico e construção de marca.
                  </p>
                  <p>
                    Com mais de 15 anos de experiência em branding para empresas de diversos setores, desenvolveu uma abordagem única que combina rigor analítico com sensibilidade para traduzir a essência de um negócio em territórios de comunicação memoráveis.
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
                  alt="Thiago Bianchi"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Stat bar */}
              <div className="bg-primary text-primary-foreground px-6 py-4 flex gap-8">
                <div>
                  <p className="text-2xl font-bold font-serif">10+</p>
                  <p className="text-xs font-mono tracking-widest uppercase opacity-70">Anos em performance</p>
                </div>
                <div className="w-px bg-primary-foreground/20" />
                <div>
                  <p className="text-2xl font-bold font-serif">100+</p>
                  <p className="text-xs font-mono tracking-widest uppercase opacity-70">Estratégias executadas</p>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 md:pt-6">
              <div>
                <div className="h-px w-10 bg-primary mb-5" />
                <h3 className="text-3xl font-bold font-serif leading-tight">Thiago Bianchi</h3>
                <p className="text-primary font-mono font-medium text-xs tracking-widest uppercase mt-2">
                  Co-fundador · Diretor de Performance
                </p>
              </div>

              <div className="text-foreground/65 text-sm leading-relaxed space-y-4">
                <p>
                  Thiago Bianchi é co-fundador e Diretor de Performance da SM Agency, onde lidera a dimensão de crescimento, conversão e resultados mensuráveis.
                </p>
                <p>
                  Com background em estratégias de crescimento e marketing de performance, desenvolveu expertise em conectar estratégia de marca com resultados tangíveis de negócio. Ele não acredita em branding que não se traduz em crescimento de receita, nem em performance sem clareza estratégica.
                </p>
                <p>
                  O que diferencia a abordagem de Thiago é a capacidade de traduzir posicionamento em ações concretas de crescimento — garantindo que há um plano claro de como executar e medir resultados.
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

  // Filter non-founders from Supabase data, or use fallback
  const teamMembers = supabaseMembers && supabaseMembers.length > 0
    ? supabaseMembers
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
              Equipe de Estrategistas
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
    { value: "10+", label: "Anos de expertise combinada" },
    { value: "100+", label: "Marcas transformadas" },
    { value: "6", label: "Projetos por trimestre" },
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
  const { data: supabaseCases } = useCases();
  const categories = ["Todos", "Consultoria Estratégica", "Branding Empresarial", "Branding Pessoal"];

  // Use Supabase data or fallback
  const projects = supabaseCases && supabaseCases.length > 0
    ? supabaseCases.map(c => ({
        name: c.name,
        category: c.category || "Consultoria Estratégica",
        result: c.result || "",
      }))
    : fallbackProjects;

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

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

        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <RevealSection key={p.name + p.category} delay={i * 100}>
              <div className="border border-border hover:border-primary/40 transition-colors group overflow-hidden">
                <div className="aspect-[16/10] bg-primary/5 flex items-center justify-center">
                  <span className="text-primary/20 font-serif text-6xl font-bold">{p.name.charAt(0)}</span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary">{p.category}</span>
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-foreground/50 text-sm">{p.result}</p>
                </div>
              </div>
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
