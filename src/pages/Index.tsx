import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Compass, Cog, TrendingUp, Target, Star, User, Palette, Share2, PenTool, Quote } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ana1 from "@/assets/ana-1.png";
import thiago1 from "@/assets/thiago-1.png";

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="py-24 md:py-36 lg:py-[120px] bg-background">
      <div className="container-sm">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-10">
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.15] font-bold tracking-tight">
              Sua empresa é sólida.{" "}
              <span className="text-primary">Sua marca ainda não comunica isso.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl">
              Consultoria estratégica e branding para empresas estabelecidas que querem parar de competir por preço e começar a vender pelo valor que entregam.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Trabalhamos com empresas que faturam acima de R$500k/ano e precisam de reposicionamento estratégico para crescer em categorias mais rentáveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-md text-base px-8 h-12">
                <a href="#diagnostico">Agendar Diagnóstico Gratuito</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-md text-base px-8 h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href="#cases">Ver Cases de Transformação</a>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src={ana1}
                alt="Equipe SM Agency em contexto estratégico"
                className="rounded-xl shadow-[0_20px_60px_-15px_rgba(10,77,104,0.2)] w-full object-cover aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Authority ─── */
function AuthoritySection() {
  const items = [
    {
      icon: Compass,
      title: "Estratégia 360°",
      text: "Não fazemos apenas branding ou apenas marketing. Desenvolvemos a arquitetura completa que conecta posicionamento, performance e crescimento sustentável.",
    },
    {
      icon: Cog,
      title: "Execução sem Fricção",
      text: "Nossa equipe integrada elimina o problema de trabalhar com múltiplos fornecedores desalinhados. Da estratégia à implementação, tudo acontece sob a mesma liderança metodológica.",
    },
    {
      icon: TrendingUp,
      title: "Resultados Mensuráveis",
      text: "Cada projeto é estruturado com KPIs claros e acompanhamento de impacto. Você sabe exatamente o retorno do investimento estratégico.",
    },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 max-w-3xl mx-auto leading-tight">
            Por Que Empresas de Alto Crescimento{" "}
            <span className="text-primary">Confiam na SM Agency</span>
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-14">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 150}>
              <div className="space-y-5">
                <item.icon className="h-12 w-12 text-primary" strokeWidth={1.25} />
                <h3 className="text-xl font-bold font-serif">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Leadership ─── */
function LeadershipSection() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm">
        <RevealSection>
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Liderança Estratégica</h2>
            <p className="text-foreground/70 leading-relaxed">
              Projetos de consultoria estratégica são conduzidos sob supervisão direta dos fundadores Ana Santos e Thiago Bianchi, garantindo a profundidade analítica e rigor metodológico que caracterizam o trabalho da SM Agency.
            </p>
          </div>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
          <RevealSection delay={0}>
            <div className="text-center space-y-5">
              <img src={ana1} alt="Ana Santos" className="w-64 h-64 rounded-2xl object-cover mx-auto shadow-lg" />
              <div>
                <h3 className="text-2xl font-bold font-serif">Ana Santos</h3>
                <p className="text-primary font-medium text-sm mt-1">Co-fundadora | Estratégia de Branding</p>
              </div>
              <p className="text-foreground/70 leading-relaxed text-sm max-w-md mx-auto">
                Ana desenvolveu a metodologia de branding estratégico da SM ao longo de 15 anos trabalhando com empresas de diversos setores. Ela lidera a dimensão de posicionamento e construção de marca em cada projeto de consultoria, trazendo profundidade conceitual que transforma empresas em referências de mercado.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="text-center space-y-5">
              <img src={thiago1} alt="Thiago Bianchi" className="w-64 h-64 rounded-2xl object-cover mx-auto shadow-lg" />
              <div>
                <h3 className="text-2xl font-bold font-serif">Thiago Bianchi</h3>
                <p className="text-primary font-medium text-sm mt-1">Co-fundador | Performance e Crescimento</p>
              </div>
              <p className="text-foreground/70 leading-relaxed text-sm max-w-md mx-auto">
                Thiago é responsável pela dimensão de performance, conversão e arquitetura de funil em projetos de consultoria da SM. Com experiência em estratégias de crescimento para empresas estabelecidas, ele desenvolveu frameworks proprietários que conectam posicionamento de marca com resultados mensuráveis.
              </p>
            </div>
          </RevealSection>
        </div>
        <RevealSection>
          <div className="text-center mt-16 space-y-5">
            <p className="text-foreground/60 text-sm italic max-w-2xl mx-auto">
              "Nossa equipe de estrategistas foi treinada diretamente por Ana e Thiago na metodologia SM, garantindo consistência de qualidade em todos os projetos."
            </p>
            <Link to="/quem-somos" className="text-primary text-sm font-medium hover:underline inline-block">
              Conheça toda a equipe →
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Main Services ─── */
function MainServicesSection() {
  const services = [
    {
      icon: Compass,
      title: "Consultoria Estratégica",
      text: "Diagnóstico completo, reposicionamento estratégico, arquitetura de funil e implementação acompanhada. Para empresas que precisam de transformação, não apenas ajustes.",
      price: "R$48.000",
      href: "/consultoria-estrategica",
      featured: true,
    },
    {
      icon: Star,
      title: "Branding Empresarial",
      text: "Construção completa de plataforma de marca: propósito, posicionamento, arquitetura estratégica e identidade visual integrada.",
      price: "R$25.000",
      href: "/branding-empresarial",
    },
    {
      icon: User,
      title: "Branding Pessoal",
      text: "Para empreendedores e especialistas que querem construir autoridade e se tornarem referência no seu segmento.",
      price: "R$18.000",
      href: "/branding-pessoal",
    },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            Soluções Estratégicas para Crescimento
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <RevealSection key={s.title} delay={i * 150}>
              <div
                className={`bg-background rounded-xl p-12 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${
                  s.featured
                    ? "border-2 border-primary shadow-none"
                    : "shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                }`}
              >
                <s.icon className="h-12 w-12 text-primary mb-6" strokeWidth={1.25} />
                <h3 className="text-xl font-bold font-serif mb-4">{s.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-1">{s.text}</p>
                <div className="mt-auto">
                  <p className="text-muted-foreground text-sm mb-1">A partir de</p>
                  <p className="text-primary font-semibold text-2xl font-serif mb-8">{s.price}</p>
                  <Button asChild variant={s.featured ? "default" : "outline"} className="w-full rounded-md">
                    <Link to={s.href}>Saber Mais</Link>
                  </Button>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Specialized Services ─── */
function SpecializedServicesSection() {
  const items = [
    { icon: Palette, title: "Identidade Visual", text: "Sistema visual completo para estratégias já definidas.", href: "/identidade-visual" },
    { icon: Share2, title: "Gestão de Redes Sociais", text: "Execução de conteúdo alinhado ao posicionamento estabelecido.", href: "/gestao-redes-sociais" },
    { icon: PenTool, title: "Naming", text: "Criação de nomes estratégicos para marcas e produtos.", href: "/naming" },
  ];

  return (
    <section className="pb-20 md:pb-28 lg:pb-[100px] bg-secondary">
      <div className="container-sm">
        <RevealSection>
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-xl md:text-2xl font-bold font-serif text-foreground/80">
              Serviços Especializados de Implementação
            </h3>
            <p className="text-foreground/60 text-sm max-w-xl mx-auto">
              Para empresas que já possuem estratégia de marca definida e precisam apenas de execução especializada.
            </p>
          </div>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 100}>
              <Link
                to={item.href}
                className="flex items-start gap-4 p-6 bg-background rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <item.icon className="h-10 w-10 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.25} />
                <div>
                  <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-foreground/60 text-xs leading-relaxed">{item.text}</p>
                  <span className="text-primary text-xs font-medium mt-2 inline-block">Ver Detalhes →</span>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Cases ─── */
function CasesSection() {
  const cases = [
    { name: "Empresa de Tecnologia", category: "Consultoria Estratégica", result: "Crescimento de 3x no ticket médio em 6 meses" },
    { name: "Consultoria Financeira", category: "Branding Completo", result: "Entrada bem-sucedida no segmento premium" },
    { name: "E-commerce de Moda", category: "Consultoria Estratégica", result: "Aumento de 180% em margem líquida" },
  ];

  return (
    <section id="cases" className="section-spacing bg-background">
      <div className="container-sm">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            Empresas que Transformamos
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-10">
          {cases.map((c, i) => (
            <RevealSection key={c.name} delay={i * 150}>
              <div className="rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="text-primary/30 font-serif text-5xl font-bold">{c.name.charAt(0)}</span>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{c.category}</span>
                  <h3 className="font-bold font-serif text-lg">{c.name}</h3>
                  <p className="text-foreground/70 text-sm">{c.result}</p>
                  <span className="text-primary text-sm font-medium inline-block group-hover:underline">Ver Case Completo →</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button asChild variant="outline" className="rounded-md border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/quem-somos#portfolio">Ver Todos os Cases</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  const testimonials = [
    { text: "A SM Agency transformou completamente nossa percepção de marca no mercado. Passamos a atrair clientes que realmente valorizam nosso trabalho.", name: "Carlos Mendes", role: "CEO", company: "Tech Solutions" },
    { text: "O reposicionamento estratégico nos permitiu triplicar nosso ticket médio em apenas 6 meses. Um investimento que se pagou muitas vezes.", name: "Marina Oliveira", role: "Diretora", company: "Consultoria Premium" },
    { text: "Profundidade analítica que nunca encontramos em outras agências. Ana e Thiago entenderam nossa essência e traduziram isso em estratégia real.", name: "Roberto Almeida", role: "Fundador", company: "Grupo RA" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            O Que Nossos Clientes Dizem
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <RevealSection key={t.name} delay={i * 150}>
              <div className="bg-background rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] h-full flex flex-col">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground/80 leading-relaxed text-sm flex-1 italic">"{t.text}"</p>
                <div className="mt-6 pt-6 border-t border-border/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-foreground/50 text-xs">{t.role}, {t.company}</p>
                  </div>
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
function CTASection() {
  return (
    <section id="diagnostico" className="py-24 md:py-36 lg:py-[120px] bg-primary text-primary-foreground">
      <div className="container-sm text-center space-y-10 max-w-3xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Vamos Construir a Estratégia que sua Empresa Merece?
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mt-5 max-w-2xl mx-auto">
            Agende uma conversa de diagnóstico de 30 minutos. Sem compromisso. Vamos entender seu contexto e validar se faz sentido trabalharmos juntos.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 rounded-md text-base px-10 h-13 font-semibold"
              asChild
            >
              <a href="https://wa.me/5511937292921" target="_blank" rel="noopener noreferrer">
                Agendar Diagnóstico Gratuito
              </a>
            </Button>
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
      <HeroSection />
      <AuthoritySection />
      <LeadershipSection />
      <MainServicesSection />
      <SpecializedServicesSection />
      <CasesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
