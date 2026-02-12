import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, Eye, BarChart3, Quote } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ana1 from "@/assets/ana-1.png";
import ana2 from "@/assets/ana-2.png";
import thiago1 from "@/assets/thiago-1.png";
import thiago2 from "@/assets/thiago-2.png";
import team1 from "@/assets/team-1.png";

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.15] tracking-tight">
              Transformamos Negócios em{" "}
              <span className="text-primary">Marcas de Referência</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Acreditamos que marcas bem construídas não apenas vendem mais, mas criam conexões reais, geram autoridade e deixam um legado.
            </p>
            <p className="text-foreground/70 leading-relaxed max-w-2xl">
              Fundada por Ana Santos e Thiago Bianchi, a SM Agency nasceu da convicção de que toda empresa estabelecida tem potencial para se tornar referência no seu mercado — mas a maioria compete por preço porque falta clareza estratégica.
            </p>
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
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Como Começou</h2>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              A SM Agency nasceu quando Ana e Thiago, cada um com mais de uma década de experiência em suas áreas, perceberam um padrão frustrante no mercado: empresas excelentes sendo tratadas como commodities porque suas marcas não comunicavam o valor real que entregavam.
            </p>
            <p>
              Ana, com background profundo em branding e design estratégico, via constantemente negócios sólidos com identidades visuais que não refletiam sua essência. Thiago, vindo do mundo de performance e crescimento, frustrava-se ao ver empresas competindo por preço quando poderiam justificar premium com posicionamento correto.
            </p>
            <p>
              Juntos, desenvolveram uma abordagem que integra o melhor de ambos os mundos: a profundidade conceitual do branding estratégico com o rigor analítico de performance e crescimento. Não fazemos marca bonita sem substância, nem estratégia sem execução visual.
            </p>
            <p>
              Hoje, após trabalhar com mais de 100 empresas, desenvolvemos uma metodologia proprietária que provou sua eficácia em diversos setores — de manufatura a tecnologia, de serviços profissionais a e-commerce.
            </p>
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
      text: "Não prometemos milagres. Somos honestos sobre o que é possível, quanto vai custar, e quanto tempo vai levar. Se não somos o fit certo, dizemos isso logo na primeira conversa.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">O Que Nos Move</h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-10">
          {values.map((v, i) => (
            <RevealSection key={v.title} delay={i * 150}>
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif">{v.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">{v.text}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Liderança</h2>
        </RevealSection>

        {/* Ana */}
        <RevealSection>
          <div className="mb-20">
            <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
              <div className="space-y-4">
                <img src={ana1} alt="Ana Santos" className="w-full rounded-2xl shadow-lg aspect-square object-cover" />
                <div className="grid grid-cols-2 gap-3">
                  <img src={ana2} alt="Ana Santos em workshop" className="rounded-xl aspect-square object-cover w-full" />
                  <img src={team1} alt="Ana Santos apresentando" className="rounded-xl aspect-square object-cover w-full" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-serif">Ana Santos</h3>
                <p className="text-primary font-medium text-sm">Co-fundadora e Diretora de Branding</p>
                <div className="text-foreground/70 text-sm leading-relaxed space-y-3">
                  <p>
                    Ana Santos é co-fundadora e Diretora de Branding da SM Agency, onde lidera todos os projetos de posicionamento estratégico e construção de marca.
                  </p>
                  <p>
                    Com mais de 15 anos de experiência em branding para empresas de diversos setores, Ana desenvolveu uma abordagem única que combina rigor analítico com sensibilidade para traduzir essência de negócio em territórios de comunicação memoráveis. Sua expertise está em identificar o que realmente diferencia uma empresa no mercado — não o que ela quer ser, mas o que ela genuinamente é — e construir posicionamento em cima dessa verdade.
                  </p>
                  <p>
                    Ana é conhecida por sua abordagem sem frescura: ela não acredita em branding como exercício criativo desconectado de negócio. Cada decisão de marca precisa ter justificativa estratégica e potencial de gerar valor mensurável. Essa mentalidade a tornou procurada por CEOs e líderes que querem transformação real, não apenas uma cara nova.
                  </p>
                  <p>
                    Nos últimos anos, Ana liderou pessoalmente o reposicionamento de mais de 50 empresas, muitas das quais conseguiram aumentar significativamente seus preços e atrair clientes de maior valor após o trabalho estratégico. Ela participa diretamente de todos os projetos de consultoria e branding da SM, garantindo consistência metodológica e profundidade analítica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Thiago */}
        <RevealSection>
          <div>
            <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
              <div className="space-y-4">
                <img src={thiago1} alt="Thiago Bianchi" className="w-full rounded-2xl shadow-lg aspect-square object-cover" />
                <div className="grid grid-cols-2 gap-3">
                  <img src={thiago2} alt="Thiago Bianchi analisando dados" className="rounded-xl aspect-square object-cover w-full" />
                  <img src={team1} alt="Thiago Bianchi em apresentação" className="rounded-xl aspect-square object-cover w-full" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-serif">Thiago Bianchi</h3>
                <p className="text-primary font-medium text-sm">Co-fundador e Diretor de Performance</p>
                <div className="text-foreground/70 text-sm leading-relaxed space-y-3">
                  <p>
                    Thiago Bianchi é co-fundador e Diretor de Performance da SM Agency, onde lidera a dimensão de crescimento, conversão e resultados mensuráveis em todos os projetos de consultoria.
                  </p>
                  <p>
                    Com background em estratégias de crescimento e marketing de performance, Thiago desenvolveu expertise em conectar estratégia de marca com resultados tangíveis de negócio. Ele não acredita em branding que não se traduz em crescimento de receita, nem em performance sem clareza estratégica — para ele, os dois precisam andar juntos.
                  </p>
                  <p>
                    Thiago é conhecido por sua abordagem direta e orientada a dados. Ele não tem paciência para estratégias que não podem ser medidas ou implementadas. Em cada projeto, ele garante que há KPIs claros, roadmap viável, e mecanismos de acompanhamento de ROI. Essa mentalidade pragmática o tornou procurado por empresas que já tentaram "branding" no passado mas não viram impacto real no negócio.
                  </p>
                  <p>
                    O que diferencia a abordagem de Thiago é a capacidade de traduzir posicionamento de marca em ações concretas de crescimento. Ele não deixa o projeto terminar no "strategic document" — ele garante que há plano claro de como executar e medir resultados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Equipe ─── */
function Equipe() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Equipe de Estrategistas
          </h2>
          <p className="text-foreground/70 text-center leading-relaxed max-w-2xl mx-auto mb-12">
            Conforme a SM cresceu, desenvolvemos um processo rigoroso de seleção e treinamento. Cada membro é treinado diretamente por Ana e Thiago na metodologia SM, passando por meses de imersão em projetos reais antes de liderar componentes de consultoria.
          </p>
        </RevealSection>
        <RevealSection delay={100}>
          <img
            src={team1}
            alt="Equipe SM Agency"
            className="w-full rounded-2xl shadow-lg aspect-[16/9] object-cover"
          />
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Números ─── */
function Numeros() {
  const stats = [
    { value: "10+", label: "Anos de expertise combinada" },
    { value: "100+", label: "Marcas transformadas" },
    { value: "6", label: "Projetos por trimestre (capacidade atual)" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Impacto em Números</h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <RevealSection key={s.label} delay={i * 150}>
              <div className="text-center space-y-3">
                <p className="text-5xl md:text-6xl font-bold font-serif text-primary">{s.value}</p>
                <p className="text-foreground/70 text-sm">{s.label}</p>
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
  const categories = ["Todos", "Consultoria Estratégica", "Branding Empresarial", "Branding Pessoal"];
  const projects = [
    { name: "Tech Solutions", category: "Consultoria Estratégica", result: "3x ticket médio" },
    { name: "Consultoria Premium", category: "Branding Empresarial", result: "Segmento premium" },
    { name: "E-commerce Moda", category: "Consultoria Estratégica", result: "+180% margem" },
    { name: "Thatiane Oliveira", category: "Branding Pessoal", result: "Autoridade construída" },
    { name: "Grupo RA", category: "Branding Empresarial", result: "Reposicionamento completo" },
    { name: "StartupX", category: "Consultoria Estratégica", result: "Entrada no mercado premium" },
  ];

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Trabalhos que Nos Orgulham
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm px-4 py-2 rounded-full transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/70 hover:text-primary"
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
              <div className="rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all group">
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="text-primary/30 font-serif text-5xl font-bold">{p.name.charAt(0)}</span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{p.category}</span>
                  <h3 className="font-bold font-serif">{p.name}</h3>
                  <p className="text-foreground/60 text-sm">{p.result}</p>
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
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container-sm text-center space-y-8 max-w-3xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Vamos Construir Algo Extraordinário Juntos?
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mt-5 max-w-2xl mx-auto">
            Se você sente que sua empresa ou marca pessoal tem potencial não realizado, vamos conversar. Agende um diagnóstico gratuito de 30 minutos e vamos explorar como podemos ajudar.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 rounded-md text-base px-10 h-13 font-semibold"
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
