import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  AlertTriangle,
  Search,
  Calendar,
  PenTool,
  BarChart3,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.15] tracking-tight">
              Gestão de Redes Sociais{" "}
              <span className="text-primary">Estratégica</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Transformamos sua presença digital em canal de posicionamento, autoridade e conversão através de conteúdo estratégico alinhado à sua marca.
            </p>
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/80 leading-relaxed">
                <strong>Importante:</strong> Nosso trabalho de social media é focado em marcas que já têm posicionamento estratégico definido. Se sua empresa ainda não tem clareza de marca, recomendamos começar pelo Branding.
                <Link to="/branding-empresarial" className="text-primary font-medium hover:underline ml-1 inline-block">
                  Precisa de posicionamento primeiro? →
                </Link>
              </div>
            </div>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Conversar Sobre Redes Sociais</a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois ─── */
function AntesDepois() {
  const sem = [
    "Posts sem estratégia ou calendário",
    "Conteúdo genérico e sem personalidade",
    "Baixo engajamento e alcance",
    "Sem clareza de métricas ou ROI",
    "Comunicação desalinhada com a marca",
  ];
  const com = [
    "Calendário editorial estratégico",
    "Conteúdo que reflete posicionamento de marca",
    "Crescimento orgânico consistente",
    "Relatórios com métricas claras",
    "Presença digital que gera autoridade e leads",
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Antes e Depois
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-8">
          <RevealSection>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 h-full">
              <h3 className="font-bold font-serif text-lg mb-6 text-destructive">Sem Gestão Estratégica</h3>
              <ul className="space-y-4">
                {sem.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-foreground/70">
                    <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 h-full">
              <h3 className="font-bold font-serif text-lg mb-6 text-primary">Com Gestão SM Agency</h3>
              <ul className="space-y-4">
                {com.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-foreground/70">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {c}
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

/* ─── Processo ─── */
function Processo() {
  const steps = [
    { icon: Search, title: "Análise e Diagnóstico", text: "Mapeamos presença atual, concorrência e oportunidades" },
    { icon: Target, title: "Estratégia de Conteúdo", text: "Definimos pilares, formatos e tom de voz para as redes" },
    { icon: Calendar, title: "Planejamento Editorial", text: "Calendário mensal com datas, formatos e objetivos" },
    { icon: PenTool, title: "Criação e Publicação", text: "Produção de conteúdo visual e textual de alta qualidade" },
    { icon: BarChart3, title: "Análise e Otimização", text: "Relatórios mensais com ajustes baseados em dados" },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Como Funciona</h2>
        </RevealSection>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <RevealSection key={s.title} delay={i * 100}>
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block">Etapa {i + 1}</div>
                <h3 className="font-bold font-serif text-sm leading-snug">{s.title}</h3>
                <p className="text-foreground/60 text-xs leading-relaxed">{s.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── O Que Inclui ─── */
function Entregaveis() {
  const items = [
    { icon: Calendar, title: "Calendário editorial mensal" },
    { icon: PenTool, title: "Criação de conteúdo visual e textual" },
    { icon: MessageSquare, title: "Gestão de comunidade e interações" },
    { icon: TrendingUp, title: "Relatórios de performance mensais" },
    { icon: Users, title: "Estratégia de crescimento orgânico" },
    { icon: Zap, title: "Otimização contínua baseada em dados" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">O Que Está Incluído</h2>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 80}>
              <div className="bg-background rounded-xl p-6 text-center space-y-3 h-full">
                <item.icon className="h-6 w-6 text-primary mx-auto" />
                <p className="font-semibold text-sm">{item.title}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Investimento ─── */
function Investimento() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="bg-secondary rounded-xl p-8 md:p-12 shadow-sm border border-border/50 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Investimento</h2>
            <p className="text-4xl font-bold font-serif text-primary">A partir de R$3.500/mês</p>
            <p className="text-sm text-muted-foreground">Contrato mínimo: 3 meses</p>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Solicitar Proposta</a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Formulário ─── */
function Formulario() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section id="formulario" className="section-spacing bg-secondary">
        <div className="container-sm max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-serif">Solicitação Enviada!</h2>
          <p className="text-foreground/70">Entraremos em contato em até 48h úteis.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-spacing bg-secondary">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Vamos Conversar Sobre Suas Redes?</h2>
          </div>
        </RevealSection>
        <RevealSection delay={100}>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6 bg-background rounded-xl p-8 border border-border/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input id="name" required placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required placeholder="seu@empresa.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" required placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa *</Label>
                <Input id="company" required placeholder="Sua empresa" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="platforms">Quais plataformas utiliza? *</Label>
              <Input id="platforms" required placeholder="Instagram, LinkedIn, Facebook..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">O que espera da gestão de redes?</Label>
              <Textarea id="details" placeholder="Descreva seus objetivos..." rows={3} />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-md text-base h-12">
              Solicitar Proposta
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Ao enviar, você concorda com nossa Política de Privacidade.
            </p>
          </form>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function GestaoRedesSociais() {
  return (
    <>
      <Hero />
      <AntesDepois />
      <Processo />
      <Entregaveis />
      <Investimento />
      <Formulario />
    </>
  );
}
