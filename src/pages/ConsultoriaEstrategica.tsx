import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSubmitLead } from "@/hooks/useSubmitLead";
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
  ArrowRight,
  Instagram,
  Linkedin,
  Globe,
  Users,
  MessageSquare,
  TrendingUp,
  Layers,
  Target,
  X,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ana1 from "@/assets/ana-nova.webp";
import thiago1 from "@/assets/thiago-1.webp";
import stdiCase from "@/assets/cases/consultoria/stdi.webp";
import startCase from "@/assets/cases/consultoria/start.webp";
import likeBrandP20 from "@/assets/cases/branding/like-brand-p20.webp";

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
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Consultoria Estratégica
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
                Você está investindo{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  em marketing.
                </em>
                <br />
                <span className="text-primary">Quanto está convertendo?</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Diagnóstico completo de marketing 360°: analisamos suas campanhas de tráfego pago, seu funil de conversão, a gestão dos seus leads e o alinhamento entre marca, comunicação e vendas — para identificar onde está o vazamento e construir a estratégia que fecha o gap.
              </p>

              <p className="text-sm text-foreground/50 max-w-lg leading-relaxed">
                Para empresas que já investem em marketing mas precisam entender o que está funcionando, o que está vazando e o que precisa mudar.
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Solicitar Conversa de Qualificação</a>
              </Button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Sintomas ─── */
function Sintomas() {
  const symptoms = [
    "Você investe em Meta Ads ou Google Ads mas não sabe com precisão qual campanha gera resultado de verdade",
    "Leads chegam, mas grande parte não converte — e a equipe de vendas culpa a qualidade do lead",
    "Seu funil tem etapas, mas você não consegue identificar onde os contatos estão travando",
    "Sua marca tem um posicionamento, mas comunicação, marketing e time comercial falam coisas diferentes",
    "O custo por aquisição subiu e você não sabe se é problema de campanha, de oferta ou de processo",
    "Você sente que o marketing está rodando, mas o impacto no caixa não é proporcional ao investimento",
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Diagnóstico</p>
            <h2 className="text-3xl md:text-4xl font-bold">Algum desses cenários soa familiar?</h2>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="grid md:grid-cols-2 gap-4">
            {symptoms.map((s, i) => (
              <div key={i} className="flex items-start gap-4 bg-background border border-border p-5">
                <X className="h-4 w-4 text-foreground/25 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/70 text-sm leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="mt-8 pl-5 border-l-2 border-accent">
            <p className="text-sm text-foreground/60 leading-relaxed">
              Se você se identificou com ao menos dois desses pontos, sua empresa é candidata à nossa consultoria.{" "}
              <strong className="text-foreground">O problema raramente está onde parece.</strong>{" "}
              Nosso trabalho começa por descobrir onde ele realmente está.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── O que Analisamos ─── */
function OQueAnalisamos() {
  const pillars = [
    {
      icon: BarChart3,
      title: "Meta Ads & Google Ads",
      desc: "Estrutura de campanhas, segmentações, criativos, otimizações e ROI real por canal",
    },
    {
      icon: Route,
      title: "Funil de conversão",
      desc: "Da atração ao fechamento: onde estão os vazamentos, os gargalos e as oportunidades",
    },
    {
      icon: Users,
      title: "Gestão de leads",
      desc: "Como os contatos são recebidos, qualificados, nutridos e abordados pelo time comercial",
    },
    {
      icon: Target,
      title: "Posicionamento de marca",
      desc: "Se o que você comunica está alinhado com o que o mercado percebe e o que o cliente compra",
    },
    {
      icon: MessageSquare,
      title: "Comunicação cross-channel",
      desc: "Consistência entre redes sociais, anúncios, e-mail, site e discurso do time de vendas",
    },
    {
      icon: TrendingUp,
      title: "Alinhamento marketing + vendas",
      desc: "Se as duas áreas falam a mesma língua, trabalham com o mesmo ICP e têm os mesmos objetivos",
    },
    {
      icon: Layers,
      title: "Estratégia de canais",
      desc: "Qual canal merece mais investimento dado o seu produto, perfil de cliente e momento de crescimento",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Escopo 360°</p>
            <h2 className="text-3xl md:text-4xl font-bold">Nossa visão é 360° — e isso não é slogan</h2>
            <p className="text-foreground/55 text-sm max-w-xl leading-relaxed">
              Antes de qualquer recomendação, mapeamos sua operação completa de marketing e vendas. Sete pilares analisados de forma integrada.
            </p>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <RevealSection key={p.title} delay={i * 70}>
                <div className="border border-border p-6 bg-background h-full">
                  <Icon className="h-5 w-5 text-primary mb-4" />
                  <h3 className="font-bold text-sm mb-2">{p.title}</h3>
                  <p className="text-foreground/55 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </RevealSection>
            );
          })}

          {/* Card de fechamento */}
          <RevealSection delay={pillars.length * 70}>
            <div className="border border-primary bg-primary text-primary-foreground p-6 h-full flex flex-col justify-between">
              <p className="text-primary-foreground/70 text-xs leading-relaxed">
                Tudo isso integrado em um único diagnóstico executivo — não sete análises isoladas, mas uma visão do sistema como um todo.
              </p>
              <a href="#formulario" className="mt-6 text-xs font-mono uppercase tracking-widest text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-2">
                Solicitar diagnóstico <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Para Quem É — lista editorial ─── */
function ParaQuemE() {
  const criteria = [
    "Sua empresa fatura acima de R$500k/ano ou possui funding confirmado",
    "Você tem produto ou serviço já validado no mercado",
    "Você investe em tráfego pago (Meta Ads, Google Ads) mas o retorno não está claro ou não é consistente",
    "Você sente que entrega mais do que cobra, mas ainda assim perde para concorrentes mais baratos",
    "Seu time de vendas e marketing não têm clareza sobre qual é o ICP e como o funil deve funcionar",
    "Você quer reposicionar para atrair clientes de maior valor com processos mais previsíveis",
    "Você tem equipe interna ou budget para implementar estratégia",
    "Você está disposto a investir 90-120 dias num processo estruturado",
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Esta Consultoria É Para Você Se:</h2>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="divide-y divide-border mb-10">
            {criteria.map((c, i) => (
              <div key={c} className="flex items-start gap-4 py-5">
                <span
                  className="font-mono text-sm font-bold text-foreground/20 flex-shrink-0 pt-0.5"
                  style={{ minWidth: "1.5rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground/75 leading-relaxed text-sm md:text-base">{c}</span>
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 ml-auto" />
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="border-l-2 border-accent pl-5 space-y-1">
            <p className="text-sm text-foreground/70 leading-relaxed">
              <strong className="text-foreground">Importante:</strong>{" "}
              Trabalhamos com capacidade limitada de{" "}
              <strong className="text-primary">6 empresas por trimestre</strong> para garantir imersão total em cada projeto. Se seu perfil se enquadra, recomendamos agendar conversa o quanto antes.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Metodologia — timeline editorial ─── */
function Metodologia() {
  const phases = [
    {
      icon: ClipboardList,
      num: "01",
      title: "Auditoria Estratégica",
      duration: "Semanas 1–3",
      items: [
        "Auditoria de campanhas Meta Ads e Google Ads: estrutura, performance histórica e gaps de otimização",
        "Mapeamento do fluxo de leads: da captação ao fechamento, identificando perdas por etapa",
        "Análise de alinhamento entre posicionamento de marca, comunicação e processo comercial",
        "Mapeamento de percepção externa e identidade interna (pesquisa qualitativa com stakeholders)",
      ],
      deliverable: "Diagnóstico Executivo (40-60 páginas)",
    },
    {
      icon: Lightbulb,
      num: "02",
      title: "Desenvolvimento Estratégico",
      duration: "Semanas 4–8",
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
      duration: "Semanas 8–10",
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
      duration: "Semanas 11–12",
      items: [
        "Planejamento detalhado de implementação",
        "Priorização de iniciativas por impacto",
        "Definição de responsáveis e cronograma",
        "Alinhamento com equipe interna",
      ],
      deliverable: "Roadmap com Quick Wins e Long-term",
    },
    {
      icon: Eye,
      num: "05",
      title: "Acompanhamento de Resultados",
      duration: "30–90 dias pós-entrega (opcional)",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Nossa Metodologia de Consultoria</h2>
        </RevealSection>

        <div className="space-y-8">
          {phases.map((p, i) => (
            <RevealSection key={p.num} delay={i * 100}>
              <div className="relative pl-16 md:pl-20">
                {/* Timeline connector */}
                {i < phases.length - 1 && (
                  <div className="absolute left-[1.35rem] md:left-[1.6rem] top-14 bottom-0 w-px bg-border" />
                )}

                {/* Number badge — sharp */}
                <div className="absolute left-0 top-0 w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center font-bold font-mono text-sm">
                  {p.num}
                </div>

                <div className="border border-border p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-primary border border-primary/30 px-3 py-1 w-fit">
                      {p.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {p.items.map((item) => (
                      <li key={item} className="text-foreground/65 text-sm flex items-start gap-2">
                        <span className="text-accent mt-1.5 flex-shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-foreground/80 border-t border-border pt-4 mt-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/40 mr-2">Entregável</span>
                    {p.deliverable}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Modalidades de Consultoria</h2>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="overflow-x-auto border border-border">
            <table className="w-full bg-background text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 md:p-5 text-left text-foreground/40 font-mono text-xs uppercase tracking-widest" />
                  <th className="p-4 md:p-5 text-left font-bold text-base">Remota</th>
                  <th className="p-4 md:p-5 text-left font-bold text-base">Híbrida</th>
                  <th className="p-4 md:p-5 text-left font-bold text-base text-primary">Imersão Presencial</th>
                </tr>
              </thead>
              <tbody className="text-foreground/65 divide-y divide-border">
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-foreground text-sm">Workshops</td>
                  <td className="p-4 md:p-5">Online (4–6h)</td>
                  <td className="p-4 md:p-5">Online + 1 visita</td>
                  <td className="p-4 md:p-5">Presencial (16–24h)</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-foreground text-sm">Alinhamento</td>
                  <td className="p-4 md:p-5">Calls estruturadas</td>
                  <td className="p-4 md:p-5">Calls + imersão</td>
                  <td className="p-4 md:p-5">Workshops in-loco</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-foreground text-sm">Implementação</td>
                  <td className="p-4 md:p-5">Roadmap</td>
                  <td className="p-4 md:p-5">Roadmap + check-ins</td>
                  <td className="p-4 md:p-5">Hands-on com equipe SM</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-foreground text-sm">Ideal para</td>
                  <td className="p-4 md:p-5">Empresas com time para executar</td>
                  <td className="p-4 md:p-5">Validação presencial desejada</td>
                  <td className="p-4 md:p-5">Projetos complexos ou múltiplos stakeholders</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <p className="text-foreground/55 text-sm leading-relaxed mt-6 max-w-3xl pl-4 border-l-2 border-border">
            Nossa experiência com mais de 100 projetos mostra que imersões presenciais aceleram o processo em 40–60% e reduzem resistência interna, capturando nuances culturais que não aparecem em calls.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Investimento — três planos ─── */
function Investimento() {
  const plans = [
    {
      title: "Essencial",
      subtitle: "Diagnóstico + Posicionamento + Roadmap",
      modality: "100% remota",
      duration: "60–90 dias",
      price: "R$35.000 – R$48.000",
      featured: false,
    },
    {
      title: "Completa",
      subtitle: "Diagnóstico + Posicionamento + Performance + Funil + Acompanhamento",
      modality: "Híbrida (remoto + 2 imersões)",
      duration: "90–120 dias",
      price: "R$55.000 – R$75.000",
      featured: true,
    },
    {
      title: "Hands-On",
      subtitle: "Escopo completo + Equipe SM executando implementação",
      modality: "Imersão presencial + acompanhamento",
      duration: "120–180 dias",
      price: "R$85.000 – R$140.000",
      featured: false,
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Investimento e Escopo</h2>
            <p className="text-foreground/55 max-w-2xl text-sm leading-relaxed">
              A consultoria é montada sob medida. O investimento varia conforme escopo, modalidade e duração do projeto.
            </p>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <RevealSection key={p.title} delay={i * 150}>
              <div
                className={`p-8 h-full flex flex-col border ${
                  p.featured
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border"
                }`}
              >
                <div className="space-y-3 flex-1">
                  <p className={`text-xs font-mono uppercase tracking-widest ${p.featured ? "opacity-60" : "text-foreground/40"}`}>
                    Consultoria
                  </p>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${p.featured ? "text-primary-foreground/70" : "text-foreground/60"}`}>
                    {p.subtitle}
                  </p>

                  <div className={`space-y-1 text-xs font-mono pt-2 ${p.featured ? "text-primary-foreground/50" : "text-foreground/40"}`}>
                    <p>Modalidade: {p.modality}</p>
                    <p>Duração: {p.duration}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 pt-6 border-t border-current/10">
                  <p className={`text-2xl font-bold font-serif ${p.featured ? "" : "text-primary"}`}>{p.price}</p>
                  <Button
                    asChild
                    className={`w-full rounded-none ${
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
          <p className="text-xs text-foreground/40 mt-6 font-mono">
            * Valores finais definidos após conversa de diagnóstico inicial com mapeamento de necessidades.
          </p>
        </RevealSection>

        {/* Accordion precificação */}
        <RevealSection delay={400}>
          <div className="mt-10">
            <Accordion type="single" collapsible>
              <AccordionItem value="pricing" className="border border-border px-6">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  Como é calculado o investimento?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5 text-sm text-foreground/65 leading-relaxed divide-y divide-border">
                    {[
                      { title: "Diagnóstico e Auditoria (incluído em todos)", desc: "Análise competitiva, auditoria de comunicação, pesquisa qualitativa com stakeholders.", detail: "40–80 horas | 2–3 semanas" },
                      { title: "Estratégia de Posicionamento (incluído em todos)", desc: "Plataforma de marca, proposta de valor, narrativa, territórios de comunicação.", detail: "60–100 horas | 3–4 semanas" },
                      { title: "Estratégia de Performance (opcional)", desc: "Mapeamento de jornada, KPIs, budget allocation.", detail: "+R$12.000 – R$18.000" },
                      { title: "Arquitetura de Funil (opcional)", desc: "Funil completo, estratégia de nutrição, automações.", detail: "+R$15.000 – R$22.000" },
                      { title: "Implementação Hands-On (opcional)", desc: "Identidade visual aplicada, campanhas de lançamento, setup de automações.", detail: "+R$30.000 – R$60.000" },
                    ].map((item) => (
                      <div key={item.title} className="pt-4 first:pt-0">
                        <p className="font-semibold text-foreground mb-1">{item.title}</p>
                        <p>{item.desc}</p>
                        <p className="text-xs text-foreground/35 font-mono mt-1">{item.detail}</p>
                      </div>
                    ))}
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
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-16 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-primary">Supervisão direta dos fundadores</p>
            <h2 className="text-3xl md:text-4xl font-bold">Quem Conduz Sua Consultoria</h2>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
          <RevealSection>
            <div className="flex flex-col space-y-7">
              <img src={ana1} alt="Ana Santos" className="w-full object-cover object-top aspect-[3/4] shadow-lg" />
              <div className="space-y-4">
                <div>
                  <div className="h-px w-10 bg-primary mb-4" />
                  <h3 className="text-2xl font-bold font-serif">Ana Santos</h3>
                  <p className="text-primary font-medium text-xs tracking-widest uppercase mt-1.5 font-mono">
                    Co-fundadora · Estratégia de Branding
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/30">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary"><AnimatedNumber value="10+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Anos de mercado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary"><AnimatedNumber value="100+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Marcas lideradas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary"><AnimatedNumber value="15+" /></p>
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
              <img src={thiago1} alt="Thiago Castro" className="w-full object-cover object-top aspect-[3/4] shadow-lg" />
              <div className="space-y-4">
                <div>
                  <div className="h-px w-10 bg-primary mb-4" />
                  <h3 className="text-2xl font-bold font-serif">Thiago Castro</h3>
                  <p className="text-primary font-medium text-xs tracking-widest uppercase mt-1.5 font-mono">
                    Co-fundador · Performance e Crescimento
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-border/30">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary"><AnimatedNumber value="15+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Anos de mercado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary"><AnimatedNumber value="6+" /></p>
                    <p className="text-xs text-foreground/45 mt-0.5 leading-tight">Países de atuação</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-serif text-primary"><AnimatedNumber value="99+" /></p>
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

/* ─── Cases ─── */
function CasesConsultoria() {
  const cases = [
    {
      img: stdiCase,
      name: "STDI",
      challenge: "Empresa B2B investindo em marketing sem processo estruturado de geração e acompanhamento de leads — posicionamento genérico e pipeline sem previsibilidade",
      actions: ["Diagnóstico estratégico completo", "Reposicionamento de marca B2B", "Arquitetura comercial e funil de vendas"],
      result: "100% dos leads com acompanhamento estruturado e posicionamento consolidado",
      links: {
        linkedin: "https://www.linkedin.com/company/stdi-investiga%C3%A7%C3%A3o-intelig%C3%AAncia/posts/?feedView=all",
        site: "https://www.stdiinteligencia.com.br/",
      },
    },
    {
      img: startCase,
      name: "Start Imobiliário",
      challenge: "Investimento em mídia e captação sem funil estruturado — leads chegavam mas sem processo claro de qualificação para o segmento premium",
      actions: ["Diagnóstico de posicionamento", "Estratégia de marca para mercado imobiliário", "Funil de captação de leads qualificados"],
      result: "Entrada no segmento premium com autoridade de marca",
      links: {
        instagram: "https://www.instagram.com/startimobiliario/",
        site: "https://www.startimobiliario.com",
      },
    },
    {
      img: likeBrandP20,
      name: "LIKE. Brand",
      challenge: "Marca operando no atacado sem posicionamento, sem estratégia de canal e sem alinhamento entre identidade, comunicação e processo de vendas",
      actions: [
        "Diagnóstico estratégico e reposicionamento completo",
        "Encerramento do atacado e elevação para premium",
        "Estruturação de processos, liderança e abertura de loja física",
      ],
      result: "420% de crescimento em faturamento e abertura da primeira loja B2C",
      links: {
        instagram: "https://www.instagram.com/likebrand.oficial/",
        site: "https://www.likeadoll.com.br/",
      },
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Empresas que Transformamos</h2>
        </RevealSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <RevealSection key={c.name} delay={i * 150}>
              <div className="group border border-border overflow-hidden h-full flex flex-col hover:border-primary/40 transition-colors">
                <div className="aspect-[16/9] overflow-hidden bg-secondary">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 inline-block">
                    Consultoria Estratégica
                  </span>
                  <h3 className="font-bold text-lg mb-2">{c.name}</h3>
                  <p className="text-foreground/50 text-sm mb-4">{c.challenge}</p>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {c.actions.map((a) => (
                      <li key={a} className="text-foreground/65 text-xs flex items-start gap-2">
                        <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-primary font-semibold text-sm">{c.result}</p>
                    <div className="flex items-center gap-3">
                      {c.links.instagram && (
                        <a href={c.links.instagram} target="_blank" rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors" aria-label="Instagram">
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {c.links.linkedin && (
                        <a href={c.links.linkedin} target="_blank" rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors" aria-label="LinkedIn">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {c.links.site && (
                        <a href={c.links.site} target="_blank" rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors" aria-label="Site">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
    { q: "A consultoria inclui análise das nossas campanhas de tráfego pago?", a: "Sim. A auditoria de Meta Ads e Google Ads é parte central do diagnóstico. Analisamos estrutura de campanhas, segmentações, histórico de performance e alocação de orçamento — identificando o que está gerando ROI e o que está desperdiçando investimento." },
    { q: "Vocês trabalham o alinhamento entre marketing e vendas?", a: "É um dos pontos mais críticos que avaliamos. Grande parte das empresas tem um gap real entre o que o marketing comunica e o que vendas precisa fechar. Mapeamos esse gap e estruturamos os processos para que as duas áreas operem com os mesmos objetivos e o mesmo ICP." },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Perguntas Frequentes</h2>
        </RevealSection>

        <RevealSection delay={100}>
          <Accordion type="single" collapsible className="space-y-2">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border px-6 bg-background">
                <AccordionTrigger className="text-sm md:text-base font-semibold hover:no-underline text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground/65 text-sm leading-relaxed">{item.a}</p>
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
  const { submitLead, isLoading } = useSubmitLead('consultoria-estrategica');
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const result = await submitLead({
      full_name: formData.get('name') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('phone') as string,
      company: formData.get('company') as string,
      website: formData.get('website') as string,
      role: formData.get('role') as string,
      notes: formData.get('challenge') as string,
      revenue: formData.get('revenue') as string,
      budget: formData.get('budget') as string,
      scope: selectedScopes,
      modality: formData.get('modality') as string,
      timeline: formData.get('timeline') as string,
    });

    if (result.success) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="formulario" className="section-spacing bg-background">
        <div className="container-sm max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Solicitação Enviada!</h2>
          <p className="text-foreground/60">Entraremos em contato em até 48h úteis para agendar sua conversa de qualificação.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-spacing bg-background">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Qualificação</p>
            <h2 className="text-3xl md:text-4xl font-bold">Pronto para Transformar sua Estratégia?</h2>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Agende uma conversa de qualificação de 30 minutos. Vamos entender seu contexto e validar se faz sentido trabalharmos juntos.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 border border-border p-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" name="name" required placeholder="Seu nome" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email corporativo *</Label>
                <Input id="email" name="email" type="email" required placeholder="seu@empresa.com" className="rounded-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" name="phone" required placeholder="(11) 99999-9999" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Nome da empresa *</Label>
                <Input id="company" name="company" required placeholder="Sua empresa" className="rounded-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Site da empresa *</Label>
                <Input id="website" name="website" required placeholder="www.suaempresa.com" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Seu cargo *</Label>
                <Input id="role" name="role" required placeholder="CEO, Diretor, etc." className="rounded-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">Qual o principal desafio estratégico? *</Label>
              <Textarea id="challenge" name="challenge" required placeholder="Descreva brevemente o desafio que sua empresa enfrenta..." rows={3} className="rounded-none" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Faturamento anual aproximado *</Label>
                <select
                  id="revenue"
                  name="revenue"
                  required
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="Até R$500k/ano">Até R$500k/ano</option>
                  <option value="R$500k – R$2M/ano">R$500k – R$2M/ano</option>
                  <option value="R$2M – R$10M/ano">R$2M – R$10M/ano</option>
                  <option value="R$10M+/ano">R$10M+/ano</option>
                  <option value="Empresa com funding">Empresa com funding</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Faixa de investimento disponível *</Label>
                <select
                  id="budget"
                  name="budget"
                  required
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="Até R$35.000">Até R$35.000</option>
                  <option value="R$35.000 – R$55.000">R$35.000 – R$55.000</option>
                  <option value="R$55.000 – R$85.000">R$55.000 – R$85.000</option>
                  <option value="R$85.000 – R$140.000">R$85.000 – R$140.000</option>
                  <option value="Acima de R$140.000">Acima de R$140.000</option>
                  <option value="Budget flexível">Budget flexível</option>
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
                    <Checkbox
                      id={`scope-${scope}`}
                      checked={selectedScopes.includes(scope)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedScopes([...selectedScopes, scope]);
                        } else {
                          setSelectedScopes(selectedScopes.filter((s) => s !== scope));
                        }
                      }}
                    />
                    <Label htmlFor={`scope-${scope}`} className="text-sm font-normal text-foreground/75 cursor-pointer">
                      {scope}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modality">Modalidade preferencial</Label>
                <select
                  id="modality"
                  name="modality"
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="100% Remota">100% Remota</option>
                  <option value="Híbrida">Híbrida</option>
                  <option value="Imersão Presencial">Imersão Presencial</option>
                  <option value="Flexível">Flexível</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline desejado</Label>
                <select
                  id="timeline"
                  name="timeline"
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="Urgente (menos de 30 dias)">Urgente (menos de 30 dias)</option>
                  <option value="30–90 dias">30–90 dias</option>
                  <option value="90+ dias">90+ dias</option>
                  <option value="Flexível">Flexível</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Como conheceu a SM Agency?</Label>
              <Input id="source" name="source" placeholder="Google, indicação, redes sociais..." className="rounded-none" />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-none text-base h-12" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Solicitar Conversa de Qualificação'}
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
      <Helmet>
        <title>Consultoria de Marketing Estratégico | SM Agency</title>
        <meta name="description" content="Diagnóstico 360° de marketing: Meta Ads, Google Ads, funil de conversão, posicionamento de marca e alinhamento marketing+vendas. Identifique os gargalos que impedem seu crescimento." />
        <link rel="canonical" href="https://sourcemkt.com.br/consultoria-estrategica" />
        <meta property="og:title" content="Consultoria de Marketing Estratégico | SM Agency" />
        <meta property="og:description" content="Diagnóstico 360° de marketing: Meta Ads, Google Ads, funil de conversão, posicionamento de marca e alinhamento marketing+vendas." />
        <meta property="og:url" content="https://sourcemkt.com.br/consultoria-estrategica" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Consultoria de Marketing Estratégico",
          "description": "Diagnóstico 360° de marketing: Meta Ads, Google Ads, funil de conversão, posicionamento de marca e alinhamento marketing+vendas. Identifique os gargalos que impedem seu crescimento.",
          "url": "https://sourcemkt.com.br/consultoria-estrategica",
          "provider": { "@type": "Organization", "name": "SM Agency", "url": "https://sourcemkt.com.br" },
          "areaServed": { "@type": "Country", "name": "Brazil" },
          "serviceType": "Consultoria de Marketing"
        })}</script>
      </Helmet>
      <Hero />
      <Sintomas />
      <OQueAnalisamos />
      <ParaQuemE />
      <Metodologia />
      <Modalidades />
      {/* <Investimento /> — preço oculto, backup em src/_pricing-backup/investimento-consultoria-estrategica.tsx */}
      <Lideranca />
      <CasesConsultoria />
      <FAQ />
      <FormularioQualificacao />
    </>
  );
}
