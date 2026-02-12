import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  Search,
  Layers,
  PenTool,
  Grid3X3,
  BookOpen,
  Palette,
  Type,
  Shapes,
  Image,
  FileText,
  AlertTriangle,
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
              Identidade Visual para{" "}
              <span className="text-primary">Estratégias Já Definidas</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Transformamos plataformas de marca em sistemas visuais memoráveis, coerentes e aplicáveis em todos os pontos de contato.
            </p>
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/80 leading-relaxed">
                <strong>Importante:</strong> Este serviço é para empresas que já possuem estratégia de marca definida (propósito, posicionamento, valores). Se você ainda não tem clareza estratégica, recomendamos começar pelo Branding Empresarial.
                <Link to="/branding-empresarial" className="text-primary font-medium hover:underline ml-1 inline-block">
                  Precisa de estratégia primeiro? →
                </Link>
              </div>
            </div>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Solicitar Orçamento</a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── O Que É ─── */
function OQueE() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Sistema de Identidade Visual Completo
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <p className="text-foreground/80 leading-relaxed">
            Identidade visual é o conjunto de elementos gráficos que expressam visualmente quem sua marca é: logotipo, paleta de cores, tipografia, padrões, aplicações e diretrizes de uso. Mas na SM, ela vai além da estética — criamos sistemas visuais que comunicam estratégia, geram reconhecimento e constroem valor percebido.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois ─── */
function AntesDepois() {
  const sem = [
    "Logo solto sem aplicação coerente",
    "Marca visualmente genérica",
    "Comunicação desalinhada",
    "Dificuldade em se destacar",
    "Sem manual de diretrizes",
    "Dúvidas constantes na aplicação",
  ];
  const com = [
    "Identidade consistente em todos os pontos",
    "Visual marcante e memorável",
    "Expressão clara do posicionamento",
    "Reconhecimento e valorização",
    "Manual completo e fácil de usar",
    "Clareza, coesão e profissionalismo",
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Antes e Depois
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-8">
          <RevealSection>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 h-full">
              <h3 className="font-bold font-serif text-lg mb-6 text-destructive">Sem Identidade Visual Profissional</h3>
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
              <h3 className="font-bold font-serif text-lg mb-6 text-primary">Com Sistema de Identidade SM</h3>
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
    { icon: Search, title: "Imersão na Marca", text: "Entendemos estratégia, propósito, diferenciais e público" },
    { icon: Layers, title: "Estratégia Visual", text: "Traduzimos a marca em conceitos visuais e referências" },
    { icon: PenTool, title: "Criação do Logotipo", text: "Desenvolvemos símbolo, cores, tipografia e variações" },
    { icon: Grid3X3, title: "Sistema de Identidade", text: "Criamos aplicações e elementos complementares" },
    { icon: BookOpen, title: "Manual Visual", text: "Guia completo para aplicação consistente" },
  ];

  return (
    <section className="section-spacing bg-secondary">
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

/* ─── Entregáveis ─── */
function Entregaveis() {
  const items = [
    { icon: PenTool, title: "Logotipo principal + variações" },
    { icon: Palette, title: "Paleta de cores completa" },
    { icon: Type, title: "Tipografia (primária e secundária)" },
    { icon: Shapes, title: "Padrões e elementos gráficos" },
    { icon: Image, title: "Aplicações mockups" },
    { icon: FileText, title: "Manual de identidade visual (PDF)" },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">O Que Está Incluído</h2>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 80}>
              <div className="bg-secondary rounded-xl p-6 text-center space-y-3 h-full">
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
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="bg-background rounded-xl p-8 md:p-12 shadow-sm border border-border/50 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Investimento</h2>
            <p className="text-4xl font-bold font-serif text-primary">A partir de R$8.000</p>
            <p className="text-sm text-muted-foreground">Prazo: 4-6 semanas</p>
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
      <section id="formulario" className="section-spacing bg-background">
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
    <section id="formulario" className="section-spacing bg-background">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Solicitar Orçamento</h2>
          </div>
        </RevealSection>
        <RevealSection delay={100}>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6 bg-secondary rounded-xl p-8 border border-border/50">
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
              <Label htmlFor="has-strategy">Você já tem estratégia de marca definida? *</Label>
              <select id="has-strategy" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Selecione</option>
                <option value="sim">Sim, já tenho</option>
                <option value="parcial">Parcialmente</option>
                <option value="nao">Não, preciso construir</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Detalhes do projeto</Label>
              <Textarea id="details" placeholder="Descreva brevemente o que precisa..." rows={3} />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-md text-base h-12">
              Solicitar Orçamento
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
export default function IdentidadeVisual() {
  return (
    <>
      <Hero />
      <OQueE />
      <AntesDepois />
      <Processo />
      <Entregaveis />
      <Investimento />
      <Formulario />
    </>
  );
}
