import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, Zap, BarChart3, Map, Building2, Sparkles, Paintbrush2, Megaphone, Type } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ResponsiveImage from "@/components/shared/ResponsiveImage";
import TestimonialV2 from "@/components/ui/testimonial-v2";
import { casesData } from "@/data/casesData";
import anaHero from "@/assets/ana-header.svg";
import ana1 from "@/assets/ana-nova.jpeg";
import thiago1 from "@/assets/thiago-1.png";


/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative section-spacing bg-background overflow-hidden">
      <div className="container-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <RevealSection duration={800}>
            <div className="space-y-8 lg:space-y-10 lg:pr-12">
              <div className="accent-border pt-6">
                <h1 className="text-fluid-4xl lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.1] font-bold tracking-tight">
                  Sua empresa é sólida.{" "}
                  <span className="text-primary italic font-serif">Sua marca ainda não comunica isso.</span>
                </h1>
              </div>
              <p className="text-fluid-lg text-foreground/75 leading-[1.6] max-w-xl font-light">
                Consultoria estratégica e branding para empresas estabelecidas que querem parar de competir por preço e começar a vender pelo valor que entregam.
              </p>
              <div className="flex items-center gap-3 text-fluid-sm text-muted-foreground font-mono">
                <div className="h-px w-12 bg-accent"></div>
                <p>Faturamento mínimo: R$500k/ano</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-none text-base px-8 bg-primary hover:shadow-lg transition-shadow">
                  <a href="#diagnostico">Diagnóstico Estratégico</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-none text-base px-8 border-2 border-primary hover:bg-primary/5">
                  <a href="#cases">Ver Transformações</a>
                </Button>
              </div>
            </div>
          </RevealSection>
          <RevealSection variant="scale" delay={200} duration={800}>
            <div className="hidden lg:block relative -mr-12 xl:-mr-24 2xl:-mr-32">
              <div className="relative scale-[1.15] xl:scale-[1.35] 2xl:scale-[1.45] origin-center">
                <div className="relative">
                  <ResponsiveImage
                    src={anaHero}
                    alt="Ana Menegaz - Co-fundadora SM Agency"
                    className="w-full object-contain aspect-[662/697] drop-shadow-2xl"
                    sizes="(min-width: 1024px) 50vw, 0vw"
                    priority
                  />
                </div>
              </div>
              {/* Decorative elements - positioned behind */}
              <div className="absolute bottom-0 left-4 w-40 h-40 bg-accent/8 -z-10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/4 -right-8 w-3 h-32 bg-accent/40 -z-10"></div>
              <div className="absolute -bottom-8 right-1/4 w-24 h-24 border border-accent/20 -z-10 rotate-12"></div>
            </div>
          </RevealSection>
        </div>
      </div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl -z-10"></div>
    </section>
  );
}

/* ─── Authority ─── */
function AuthoritySection() {
  const items = [
    {
      icon: Layers,
      title: "Estratégia 360°",
      text: "Não fazemos apenas branding ou apenas marketing. Desenvolvemos a arquitetura completa que conecta posicionamento, performance e crescimento sustentável.",
    },
    {
      icon: Zap,
      title: "Execução sem Fricção",
      text: "Nossa equipe integrada elimina o problema de trabalhar com múltiplos fornecedores desalinhados. Da estratégia à implementação, tudo acontece sob a mesma liderança metodológica.",
    },
    {
      icon: BarChart3,
      title: "Resultados Mensuráveis",
      text: "Cada projeto é estruturado com KPIs claros e acompanhamento de impacto. Você sabe exatamente o retorno do investimento estratégico.",
    },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm">
        <RevealSection>
          <h2 className="text-fluid-3xl font-bold text-center mb-16 lg:mb-20 max-w-3xl mx-auto leading-tight">
            Por Que Empresas de Alto Crescimento{" "}
            <span className="text-primary">Confiam na SM Agency</span>
          </h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-14">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 150}>
              <div className="space-y-4 md:space-y-5">
                <item.icon className="h-10 w-10 md:h-12 md:w-12 text-primary" strokeWidth={1.25} />
                <h3 className="text-fluid-xl font-bold font-serif">{item.title}</h3>
                <p className="text-fluid-base text-foreground/70 leading-relaxed">{item.text}</p>
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
          <div className="text-center mb-20 max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">Quem conduz sua transformação</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Liderança Estratégica</h2>
          </div>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Ana */}
          <RevealSection delay={0}>
            <div className="flex flex-col space-y-8">
              <div className="aspect-[3/4] shadow-lg overflow-hidden">
                <img
                  src={ana1}
                  alt="Ana Santos"
                  className="w-full h-full object-cover object-[50%_18%] scale-[1.12] origin-top"
                />
              </div>
              <div className="space-y-5">
                <div>
                  <div className="h-px w-10 bg-primary mb-4" />
                  <h3 className="text-2xl font-bold font-serif">Ana Santos</h3>
                  <p className="text-primary font-medium text-xs tracking-widest uppercase mt-1.5">
                    Co-fundadora · Estrategista de Posicionamento de Marca & Negócios
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/30">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary">10+</p>
                    <p className="text-xs text-foreground/50 mt-0.5 leading-tight">Anos de mercado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary">100+</p>
                    <p className="text-xs text-foreground/50 mt-0.5 leading-tight">Marcas lideradas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary">15+</p>
                    <p className="text-xs text-foreground/50 mt-0.5 leading-tight">Segmentos</p>
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  Ana lidera o posicionamento e a construção de marca em cada projeto. Sua metodologia, desenvolvida ao longo de 10 anos, transforma empresas estabelecidas em referências de mercado — com profundidade conceitual que vai além do visual.
                </p>
              </div>
            </div>
          </RevealSection>
          {/* Thiago */}
          <RevealSection delay={200}>
            <div className="flex flex-col space-y-8">
              <img
                src={thiago1}
                alt="Thiago Castro"
                className="w-full object-cover object-top aspect-[3/4] shadow-lg"
              />
              <div className="space-y-5">
                <div>
                  <div className="h-px w-10 bg-primary mb-4" />
                  <h3 className="text-2xl font-bold font-serif">Thiago Castro</h3>
                  <p className="text-primary font-medium text-xs tracking-widest uppercase mt-1.5">
                    Co-fundador · Performance e Crescimento
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/30">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary">15+</p>
                    <p className="text-xs text-foreground/50 mt-0.5 leading-tight">Anos de mercado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary">6+</p>
                    <p className="text-xs text-foreground/50 mt-0.5 leading-tight">Países de atuação</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary">99+</p>
                    <p className="text-xs text-foreground/50 mt-0.5 leading-tight">Projetos Aprovados</p>
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  Thiago conecta posicionamento de marca com resultados concretos de negócio. Responsável pela dimensão de performance, conversão e arquitetura de funil — garantindo que cada estratégia se traduza em crescimento mensurável.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
        <RevealSection>
          <div className="text-center mt-16">
            <Link to="/quem-somos" className="text-primary text-sm font-medium hover:underline inline-block">
              Conheça toda a equipe →
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Services Section - Editorial Design ─── */
function ServicesSection() {
  const mainServices = [
    {
      num: "01",
      icon: Map,
      title: "Consultoria Estratégica",
      subtitle: "Transformação completa",
      text: "Diagnóstico profundo, reposicionamento estratégico, arquitetura de funil e implementação acompanhada. Para empresas que precisam de transformação real, não apenas ajustes cosméticos.",
      highlights: ["Diagnóstico executivo", "Arquitetura de funil", "Acompanhamento 90 dias"],
      price: "R$48.000",
      href: "/consultoria-estrategica",
      featured: true,
    },
    {
      num: "02",
      icon: Building2,
      title: "Branding Empresarial",
      subtitle: "Construção de marca",
      text: "Plataforma de marca completa: propósito, posicionamento, arquitetura estratégica e identidade visual que comunica o valor real da sua empresa.",
      highlights: ["Plataforma de marca", "Posicionamento", "Identidade visual"],
      price: "R$25.000",
      href: "/branding-empresarial",
    },
    {
      num: "03",
      icon: Sparkles,
      title: "Branding Pessoal",
      subtitle: "Autoridade & influência",
      text: "Para empreendedores e especialistas que querem construir autoridade genuína e se tornarem referência incontestável no seu segmento.",
      highlights: ["Posicionamento pessoal", "Narrativa de autoridade", "Presença digital"],
      price: "R$18.000",
      href: "/branding-pessoal",
    },
  ];

  const specializedServices = [
    { icon: Paintbrush2, title: "Identidade Visual", text: "Sistema visual completo e coeso para estratégias já definidas.", href: "/identidade-visual" },
    { icon: Megaphone, title: "Gestão de Redes", text: "Execução de conteúdo alinhado ao posicionamento.", href: "/gestao-redes-sociais" },
    { icon: Type, title: "Naming", text: "Nomes estratégicos para marcas e produtos.", href: "/naming" },
  ];

  return (
    <section className="bg-secondary overflow-hidden">
      {/* Main Services */}
      <div className="section-spacing">
        <div className="container-sm">
          {/* Header */}
          <RevealSection>
            <div className="relative mb-20 lg:mb-28">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <p className="text-xs font-mono tracking-[0.3em] uppercase text-primary">
                    Nossos serviços
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight">
                    Soluções que{" "}
                    <span className="relative">
                      <span className="text-primary italic font-serif">transformam</span>
                      <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-accent/60" />
                    </span>
                    <br className="hidden md:block" />
                    posicionamento em resultado
                  </h2>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed max-w-sm lg:text-right lg:pb-2">
                  Cada serviço é estruturado para gerar impacto mensurável. Escolha o escopo ideal para o momento da sua empresa.
                </p>
              </div>
              {/* Decorative line */}
              <div className="absolute -bottom-10 left-0 w-full h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
            </div>
          </RevealSection>

          {/* Services Grid - Asymmetric Layout */}
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Featured Service - Larger */}
            <RevealSection delay={0} className="lg:col-span-7 lg:row-span-2">
              {(() => {
                const featured = mainServices[0];
                const FeaturedIcon = featured.icon;
                return (
              <Link
                to={featured.href}
                className="group relative flex flex-col h-full bg-primary text-primary-foreground p-8 md:p-12 lg:p-14 transition-all duration-500 hover:shadow-[12px_12px_0_0_rgba(220,180,100,0.3)]"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }} />

                {/* Number */}
                <span className="absolute top-6 right-6 md:top-10 md:right-10 text-[80px] md:text-[120px] lg:text-[160px] font-serif font-bold leading-none opacity-[0.08] select-none">
                  {featured.num}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-8 self-start">
                    <span className="w-2 h-2 bg-accent animate-pulse" />
                    <span className="text-xs font-mono tracking-widest uppercase opacity-70">Mais completo</span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 border-2 border-primary-foreground/20 flex items-center justify-center mb-8 group-hover:border-accent transition-colors duration-300">
                    <FeaturedIcon className="w-8 h-8" strokeWidth={1.25} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-xs font-mono tracking-widest uppercase opacity-50 mb-2">{featured.subtitle}</p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-4 group-hover:translate-x-2 transition-transform duration-300">
                      {featured.title}
                    </h3>
                    <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-lg">
                      {featured.text}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featured.highlights.map((h) => (
                        <span key={h} className="text-xs font-mono px-3 py-1.5 border border-primary-foreground/20 bg-primary-foreground/5">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-end justify-between pt-8 border-t border-primary-foreground/10">
                    <div>
                      <p className="text-xs opacity-50 mb-1">A partir de</p>
                      <p className="text-3xl md:text-4xl font-bold font-serif">{featured.price}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all duration-300">
                      <span>Ver detalhes</span>
                      <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
                );
              })()}
            </RevealSection>

            {/* Secondary Services */}
            {mainServices.slice(1).map((service, i) => {
              const ServiceIcon = service.icon;
              return (
              <RevealSection key={service.title} delay={(i + 1) * 150} className="lg:col-span-5">
                <Link
                  to={service.href}
                  className="group relative flex flex-col h-full bg-background border-2 border-border/60 p-8 md:p-10 transition-all duration-300 hover:border-primary hover:shadow-[8px_8px_0_0_rgba(33,46,63,0.08)]"
                >
                  {/* Number */}
                  <span className="absolute top-4 right-4 md:top-6 md:right-6 text-[60px] md:text-[80px] font-serif font-bold leading-none text-foreground/[0.04] select-none">
                    {service.num}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <ServiceIcon className="w-7 h-7" strokeWidth={1.25} />
                    </div>

                    {/* Content */}
                    <p className="text-xs font-mono tracking-widest uppercase text-foreground/40 mb-2">{service.subtitle}</p>
                    <h3 className="text-xl md:text-2xl font-bold font-serif mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-6 flex-1">
                      {service.text}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.highlights.map((h) => (
                        <span key={h} className="text-[10px] font-mono px-2 py-1 bg-secondary text-foreground/50">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-end justify-between pt-6 border-t border-border/50">
                      <div>
                        <p className="text-xs text-foreground/40 mb-0.5">A partir de</p>
                        <p className="text-2xl font-bold font-serif text-primary">{service.price}</p>
                      </div>
                      <span className="text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Saber mais
                        <span className="w-5 h-px bg-primary group-hover:w-8 transition-all duration-300" />
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

      {/* Specialized Services - Horizontal Strip */}
      <div className="border-t border-border/50 bg-background/50">
        <div className="container-sm py-12 md:py-16">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-20">
              {/* Label */}
              <div className="md:w-64 flex-shrink-0">
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-2">Implementação</p>
                <h3 className="text-lg font-bold font-serif">Serviços Especializados</h3>
                <p className="text-foreground/50 text-xs mt-2 leading-relaxed">
                  Para empresas com estratégia definida.
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-20 bg-border/60" />

              {/* Services */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
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
                        <span className="inline-flex items-center gap-1.5 text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Ver detalhes
                          <span className="w-3 h-px bg-primary" />
                        </span>
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

/* ─── Cases ─── */
function CasesSection() {
  return (
    <section id="cases" className="section-spacing bg-background">
      <div className="container-sm">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            Empresas que Transformamos
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-8">
          {casesData.map((c, i) => (
            <RevealSection key={c.id} delay={i * 120}>
              <Link
                to={`/cases/${c.id}`}
                className="group block border border-border/50 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="h-52 bg-primary/5 flex flex-col justify-between p-8">
                  <span className="text-primary text-xs font-mono font-semibold tracking-widest uppercase">
                    {c.category}
                  </span>
                  <p className="text-xl font-serif font-semibold text-foreground leading-tight">
                    {c.tagline}
                  </p>
                </div>
                <div className="p-8 flex items-center justify-between border-t border-border/30">
                  <h3 className="font-semibold text-sm text-foreground/70">{c.client}</h3>
                  <span className="text-primary text-sm font-medium group-hover:underline">
                    Ver case completo →
                  </span>
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
function CTASection() {
  return (
    <section id="diagnostico" className="py-[100px] bg-primary text-primary-foreground">
      <div className="container-sm text-center space-y-10 max-w-3xl">
        <RevealSection>
          <h2 className="text-[42px] font-bold leading-tight font-serif">
            Vamos Construir a Estratégia que sua Empresa Merece?
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mt-5 max-w-2xl mx-auto">
            Agende uma conversa de diagnóstico de 30 minutos. Sem compromisso. Vamos entender seu contexto e validar se faz sentido trabalharmos juntos.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="rounded-none bg-background text-primary hover:bg-background/95 text-base px-10 h-13 font-semibold transition-colors duration-300"
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
      <ServicesSection />
      <CasesSection />
      <TestimonialV2 />
      <CTASection />
    </>
  );
}
