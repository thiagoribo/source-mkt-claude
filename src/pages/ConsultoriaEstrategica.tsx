import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  ClipboardList,
  Lightbulb,
  BarChart3,
  Route,
  Eye,
  Quote,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ana1 from "@/assets/ana-1.png";
import thiago1 from "@/assets/thiago-1.png";

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.15] tracking-tight">
              Consultoria Estratégica para{" "}
              <span className="text-primary">Empresas Estabelecidas</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Se sua empresa já fatura consistentemente mas está presa numa categoria competitiva, desenvolvemos a estratégia de marca e crescimento que justifica preços premium e atrai o cliente que você realmente quer atender.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Esta consultoria é desenhada para empresas que superaram o estágio inicial, já têm produto/serviço validado, e agora precisam de reposicionamento estratégico para crescer em margens mais rentáveis.
            </p>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Solicitar Conversa de Qualificação</a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Para Quem É ─── */
function ParaQuemE() {
  const criteria = [
    "Sua empresa fatura acima de R$500k/ano ou possui funding confirmado",
    "Você tem produto ou serviço já validado no mercado",
    "Sua empresa compete mais por preço do que gostaria",
    "Você quer reposicionar para atrair clientes de maior valor",
    "Você tem equipe interna ou budget para implementar estratégia",
    "Você está disposto a investir 90-120 dias num processo estruturado",
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Esta Consultoria É Para Você Se:
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <ul className="space-y-5 mb-12">
            {criteria.map((c) => (
              <li key={c} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-foreground/80 leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </RevealSection>
        <RevealSection delay={200}>
          <div className="bg-background rounded-xl p-8 border border-border/50 shadow-sm">
            <p className="text-foreground/80 leading-relaxed">
              <strong className="text-foreground">Importante:</strong> Trabalhamos com capacidade limitada de <strong className="text-primary">6 empresas por trimestre</strong> para garantir imersão total em cada projeto. Se seu perfil se enquadra, recomendamos agendar conversa o quanto antes.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Metodologia ─── */
function Metodologia() {
  const phases = [
    {
      icon: ClipboardList,
      num: "01",
      title: "Auditoria Estratégica",
      duration: "Semanas 1-3",
      items: [
        "Análise profunda de posicionamento competitivo",
        "Mapeamento de percepção de marca (pesquisa qualitativa)",
        "Auditoria de comunicação cross-channel",
        "Identificação de gaps estratégicos e oportunidades",
      ],
      deliverable: "Diagnóstico Executivo (40-60 páginas)",
    },
    {
      icon: Lightbulb,
      num: "02",
      title: "Desenvolvimento Estratégico",
      duration: "Semanas 4-8",
      items: [
        "Workshops de imersão com stakeholders-chave",
        "Definição de arquitetura de marca e proposta de valor",
        "Desenvolvimento de plataforma estratégica completa",
        "Prototipagem de conceitos de posicionamento",
      ],
      deliverable: "Brand Strategy Document + Apresentação Executiva",
    },
    {
      icon: BarChart3,
      num: "03",
      title: "Estratégia de Performance",
      duration: "Semanas 8-10",
      items: [
        "Mapeamento completo da jornada de compra",
        "Arquitetura de funil de vendas e conversão",
        "Definição de KPIs e métricas de sucesso",
        "Estratégia de canais e alocação de investimento",
      ],
      deliverable: "Performance Strategy Playbook",
    },
    {
      icon: Route,
      num: "04",
      title: "Roadmap de Implementação",
      duration: "Semanas 11-12",
      items: [
        "Planejamento detalhado de implementação",
        "Priorização de iniciativas por impacto",
        "Definição de responsáveis e cronograma",
        "Alinhamento com equipe interna",
      ],
      deliverable: "Roadmap de Implementação com Quick Wins e Long-term",
    },
    {
      icon: Eye,
      num: "05",
      title: "Acompanhamento de Resultados",
      duration: "30-90 dias pós-entrega (opcional)",
      items: [
        "Check-ins mensais de acompanhamento",
        "Ajustes estratégicos baseados em dados",
        "Suporte na execução de iniciativas críticas",
        "Mensuração de impacto e ROI",
      ],
      deliverable: "Relatório de Impacto e Recomendações",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Nossa Metodologia de Consultoria
          </h2>
        </RevealSection>
        <div className="space-y-8">
          {phases.map((p, i) => (
            <RevealSection key={p.num} delay={i * 100}>
              <div className="relative pl-16 md:pl-20">
                {/* Timeline line */}
                {i < phases.length - 1 && (
                  <div className="absolute left-[1.35rem] md:left-[1.6rem] top-14 bottom-0 w-px bg-border" />
                )}
                {/* Number badge */}
                <div className="absolute left-0 top-0 w-11 h-11 md:w-13 md:h-13 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {p.num}
                </div>
                <div className="bg-secondary rounded-xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <h3 className="text-xl font-bold font-serif">{p.title}</h3>
                    <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {p.duration}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {p.items.map((item) => (
                      <li key={item} className="text-foreground/70 text-sm flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-foreground/90">
                    <span className="text-primary">Entregável:</span> {p.deliverable}
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

/* ─── Modalidades ─── */
function Modalidades() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Modalidades de Consultoria
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-xl overflow-hidden shadow-sm text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 md:p-6 text-left font-semibold text-foreground/60" />
                  <th className="p-4 md:p-6 text-left font-bold font-serif text-lg">Remota</th>
                  <th className="p-4 md:p-6 text-left font-bold font-serif text-lg">Híbrida</th>
                  <th className="p-4 md:p-6 text-left font-bold font-serif text-lg text-primary">Imersão Presencial</th>
                </tr>
              </thead>
              <tbody className="text-foreground/70">
                <tr className="border-b border-border/50">
                  <td className="p-4 md:p-6 font-medium text-foreground">Workshops</td>
                  <td className="p-4 md:p-6">Online (4-6h)</td>
                  <td className="p-4 md:p-6">Online + 1 visita</td>
                  <td className="p-4 md:p-6">Presencial (16-24h)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 md:p-6 font-medium text-foreground">Alinhamento</td>
                  <td className="p-4 md:p-6">Calls estruturadas</td>
                  <td className="p-4 md:p-6">Calls + imersão</td>
                  <td className="p-4 md:p-6">Workshops in-loco</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 md:p-6 font-medium text-foreground">Implementação</td>
                  <td className="p-4 md:p-6">Roadmap</td>
                  <td className="p-4 md:p-6">Roadmap + check-ins</td>
                  <td className="p-4 md:p-6">Hands-on com equipe SM</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-medium text-foreground">Ideal para</td>
                  <td className="p-4 md:p-6">Empresas com time para executar</td>
                  <td className="p-4 md:p-6">Validação presencial desejada</td>
                  <td className="p-4 md:p-6">Projetos complexos ou múltiplos stakeholders</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealSection>
        <RevealSection delay={200}>
          <p className="text-foreground/70 text-sm leading-relaxed mt-8 max-w-3xl mx-auto">
            Nossa experiência com mais de 100 projetos mostra que imersões presenciais aceleram o processo em 40-60% e reduzem resistência interna. Quando estamos fisicamente presentes, capturamos nuances culturais que não aparecem em calls, alinhamos stakeholders em tempo real, e criamos momentum que é difícil gerar remotamente.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Investimento ─── */
function Investimento() {
  const plans = [
    {
      title: "Essencial",
      subtitle: "Diagnóstico + Posicionamento + Roadmap",
      modality: "Modalidade: 100% remota",
      duration: "Duração: 60-90 dias",
      price: "R$35.000 - R$48.000",
    },
    {
      title: "Completa",
      subtitle: "Diagnóstico + Posicionamento + Performance + Funil + Acompanhamento",
      modality: "Modalidade: Híbrida (remoto + 2 imersões)",
      duration: "Duração: 90-120 dias",
      price: "R$55.000 - R$75.000",
      featured: true,
    },
    {
      title: "Hands-On",
      subtitle: "Escopo completo + Equipe SM executando implementação",
      modality: "Modalidade: Imersão presencial + acompanhamento",
      duration: "Duração: 120-180 dias",
      price: "R$85.000 - R$140.000",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Investimento e Escopo</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              A consultoria estratégica da SM é montada sob medida para o contexto e objetivos da sua empresa. O investimento varia conforme escopo do projeto, modalidade de entrega, e duração.
            </p>
          </div>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <RevealSection key={p.title} delay={i * 150}>
              <div
                className={`rounded-xl p-8 h-full flex flex-col ${
                  p.featured
                    ? "bg-primary text-primary-foreground ring-2 ring-primary shadow-xl"
                    : "bg-secondary border border-border/50"
                }`}
              >
                <h3 className="text-xl font-bold font-serif mb-2">Consultoria {p.title}</h3>
                <p className={`text-sm mb-6 leading-relaxed ${p.featured ? "text-primary-foreground/80" : "text-foreground/70"}`}>
                  {p.subtitle}
                </p>
                <div className={`space-y-1 text-sm mb-6 ${p.featured ? "text-primary-foreground/70" : "text-foreground/60"}`}>
                  <p>{p.modality}</p>
                  <p>{p.duration}</p>
                </div>
                <div className="mt-auto space-y-4">
                  <p className={`text-2xl font-bold font-serif ${p.featured ? "" : "text-primary"}`}>{p.price}</p>
                  <Button
                    asChild
                    className={`w-full rounded-md ${
                      p.featured
                        ? "bg-background text-primary hover:bg-background/90"
                        : ""
                    }`}
                    variant={p.featured ? "default" : "outline"}
                  >
                    <a href="#formulario">Solicitar Proposta</a>
                  </Button>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
        <RevealSection delay={300}>
          <p className="text-xs text-muted-foreground mt-8 text-center">
            * Os valores finais são definidos após conversa de diagnóstico inicial, onde mapeamos necessidades específicas e montamos proposta personalizada para seu contexto.
          </p>
        </RevealSection>

        {/* Accordion precificação */}
        <RevealSection delay={400}>
          <div className="mt-12">
            <Accordion type="single" collapsible>
              <AccordionItem value="pricing" className="border rounded-xl px-6">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  Como é calculado o investimento?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 text-sm text-foreground/70 leading-relaxed">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Diagnóstico e Auditoria (incluído em todos)</p>
                      <p>Análise competitiva, auditoria de comunicação, pesquisa qualitativa com stakeholders.</p>
                      <p className="text-xs text-muted-foreground mt-1">Esforço: 40-80 horas | Duração: 2-3 semanas</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Estratégia de Posicionamento (incluído em todos)</p>
                      <p>Plataforma de marca, proposta de valor, narrativa, territórios de comunicação.</p>
                      <p className="text-xs text-muted-foreground mt-1">Esforço: 60-100 horas | Duração: 3-4 semanas</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Estratégia de Performance (opcional)</p>
                      <p>Mapeamento de jornada, KPIs, budget allocation.</p>
                      <p className="text-xs text-muted-foreground mt-1">Adicional: +R$12.000 - R$18.000</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Arquitetura de Funil (opcional)</p>
                      <p>Funil completo, estratégia de nutrição, automações.</p>
                      <p className="text-xs text-muted-foreground mt-1">Adicional: +R$15.000 - R$22.000</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Implementação Hands-On (opcional)</p>
                      <p>Identidade visual aplicada, campanhas de lançamento, setup de automações.</p>
                      <p className="text-xs text-muted-foreground mt-1">Adicional: +R$30.000 - R$60.000</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Liderança do Projeto ─── */
function Lideranca() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Quem Conduz Sua Consultoria
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-10">
          <RevealSection>
            <div className="text-center space-y-4">
              <img src={ana1} alt="Ana Santos" className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-lg" />
              <h3 className="text-xl font-bold font-serif">Ana Santos</h3>
              <p className="text-primary text-sm font-medium">Co-fundadora | Estratégia de Branding</p>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Ana lidera a dimensão de posicionamento e construção de marca, trazendo 15 anos de experiência em transformar empresas em referências de mercado.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="text-center space-y-4">
              <img src={thiago1} alt="Thiago Bianchi" className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-lg" />
              <h3 className="text-xl font-bold font-serif">Thiago Bianchi</h3>
              <p className="text-primary text-sm font-medium">Co-fundador | Performance e Crescimento</p>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Thiago lidera a dimensão de performance, conversão e arquitetura de funil, com foco em conectar posicionamento de marca com resultados mensuráveis.
              </p>
            </div>
          </RevealSection>
        </div>
        <RevealSection delay={300}>
          <p className="text-foreground/60 text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            Cada projeto é supervisionado diretamente por Ana e Thiago, com execução por nossa equipe de estrategistas treinados na metodologia SM. Você terá um estrategista dedicado, com os fundadores presentes nos momentos críticos: kickoff, workshops, validação e apresentação final.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Cases ─── */
function CasesConsultoria() {
  const cases = [
    { name: "Empresa de Tecnologia", challenge: "Competia por preço em mercado saturado", actions: ["Diagnóstico completo de posicionamento", "Redefinição de proposta de valor", "Arquitetura de funil premium"], result: "Crescimento de 3x no ticket médio em 6 meses" },
    { name: "Consultoria Financeira", challenge: "Dificuldade em atrair clientes de maior valor", actions: ["Reposicionamento de marca", "Estratégia de conteúdo de autoridade", "Novo funil de qualificação"], result: "Entrada bem-sucedida no segmento premium" },
    { name: "E-commerce de Moda", challenge: "Margens apertadas e dependência de promoções", actions: ["Auditoria estratégica completa", "Nova arquitetura de marca", "Estratégia de precificação premium"], result: "Aumento de 180% em margem líquida" },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Empresas que Transformaram com Nossa Consultoria
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <RevealSection key={c.name} delay={i * 150}>
              <div className="bg-secondary rounded-xl p-6 md:p-8 h-full flex flex-col">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-4">Consultoria Estratégica</span>
                <h3 className="font-bold font-serif text-lg mb-2">{c.name}</h3>
                <p className="text-foreground/60 text-sm mb-4">{c.challenge}</p>
                <ul className="space-y-1 mb-4 flex-1">
                  {c.actions.map((a) => (
                    <li key={a} className="text-foreground/70 text-xs flex items-start gap-2">
                      <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="text-primary font-semibold text-sm mt-auto">{c.result}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const items = [
    { q: "Quanto tempo leva a consultoria?", a: "Dependendo do escopo, entre 60 e 180 dias. A Consultoria Essencial leva de 60-90 dias, a Completa de 90-120 dias, e a Hands-On de 120-180 dias." },
    { q: "Como funciona o pagamento?", a: "Trabalhamos com entrada + parcelas mensais ao longo do projeto. Os termos específicos são definidos na proposta personalizada." },
    { q: "Posso começar com escopo menor e expandir depois?", a: "Sim. Muitos clientes começam pela Consultoria Essencial e, conforme validam os resultados, avançam para módulos complementares." },
    { q: "Vocês garantem resultados?", a: "Não prometemos milagres, mas estruturamos cada projeto com KPIs claros e acompanhamento de impacto. Nossa taxa de satisfação é superior a 95%." },
    { q: "Como é o processo de kickoff?", a: "Após assinatura, realizamos uma sessão de kickoff com os stakeholders-chave para alinhar expectativas, definir cronograma e iniciar a fase de diagnóstico." },
    { q: "Precisamos ter equipe interna?", a: "Depende da modalidade. Na Essencial e Completa, ter equipe interna para implementar é recomendado. Na Hands-On, nossa equipe executa a implementação." },
    { q: "Qual a diferença entre consultoria e branding empresarial?", a: "Branding Empresarial foca na construção da plataforma de marca. A Consultoria Estratégica é mais abrangente: inclui branding, mas adiciona performance, funil e acompanhamento." },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-6 bg-background">
                <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground/70 text-sm leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Formulário ─── */
function FormularioQualificacao() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="formulario" className="section-spacing bg-background">
        <div className="container-sm max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-serif">Solicitação Enviada!</h2>
          <p className="text-foreground/70">Entraremos em contato em até 48h úteis para agendar sua conversa de qualificação.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-spacing bg-background">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Transformar sua Estratégia?
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Agende uma conversa de qualificação de 30 minutos. Vamos entender seu contexto, validar fit, e apresentar como podemos ajudar.
            </p>
          </div>
        </RevealSection>
        <RevealSection delay={100}>
          <form onSubmit={handleSubmit} className="space-y-6 bg-secondary rounded-xl p-8 border border-border/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" required placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email corporativo *</Label>
                <Input id="email" type="email" required placeholder="seu@empresa.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" required placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Nome da empresa *</Label>
                <Input id="company" required placeholder="Sua empresa" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Site da empresa *</Label>
                <Input id="website" required placeholder="www.suaempresa.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Seu cargo *</Label>
                <Input id="role" required placeholder="CEO, Diretor, etc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">Qual o principal desafio estratégico? *</Label>
              <Textarea id="challenge" required placeholder="Descreva brevemente o desafio que sua empresa enfrenta..." rows={3} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Faturamento anual aproximado *</Label>
                <select id="revenue" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="ate500k">Até R$500k/ano</option>
                  <option value="500k-2m">R$500k - R$2M/ano</option>
                  <option value="2m-10m">R$2M - R$10M/ano</option>
                  <option value="10m+">R$10M+/ano</option>
                  <option value="funding">Empresa com funding</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Faixa de investimento disponível *</Label>
                <select id="budget" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="ate35k">Até R$35.000</option>
                  <option value="35k-55k">R$35.000 - R$55.000</option>
                  <option value="55k-85k">R$55.000 - R$85.000</option>
                  <option value="85k-140k">R$85.000 - R$140.000</option>
                  <option value="140k+">Acima de R$140.000</option>
                  <option value="flexivel">Budget flexível para projeto certo</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Escopo do projeto (múltipla escolha)</Label>
              <div className="space-y-2">
                {[
                  "Diagnóstico e Reposicionamento Estratégico",
                  "Estratégia de Performance e Conversão",
                  "Arquitetura de Funil de Vendas",
                  "Implementação Hands-on",
                  "Ainda não sei, preciso de ajuda para mapear",
                ].map((scope) => (
                  <div key={scope} className="flex items-center gap-2">
                    <Checkbox id={`scope-${scope}`} />
                    <Label htmlFor={`scope-${scope}`} className="text-sm font-normal text-foreground/80 cursor-pointer">
                      {scope}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modality">Modalidade preferencial</Label>
                <select id="modality" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="remota">100% Remota</option>
                  <option value="hibrida">Híbrida</option>
                  <option value="presencial">Imersão Presencial</option>
                  <option value="flexivel">Flexível</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline desejado</Label>
                <select id="timeline" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="urgente">Urgente (menos de 30 dias)</option>
                  <option value="30-90">30-90 dias</option>
                  <option value="90+">90+ dias</option>
                  <option value="flexivel">Flexível</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Como conheceu a SM Agency?</Label>
              <Input id="source" placeholder="Google, indicação, redes sociais..." />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-md text-base h-12">
              Solicitar Conversa de Qualificação
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Ao enviar, você concorda com nossa Política de Privacidade. Entraremos em contato em até 48h úteis.
            </p>
          </form>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function ConsultoriaEstrategica() {
  return (
    <>
      <Hero />
      <ParaQuemE />
      <Metodologia />
      <Modalidades />
      <Investimento />
      <Lideranca />
      <CasesConsultoria />
      <FAQ />
      <FormularioQualificacao />
    </>
  );
}
