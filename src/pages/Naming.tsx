import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  Search,
  Lightbulb,
  Filter,
  ShieldCheck,
  FileText,
  Sparkles,
  Globe,
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
              Naming{" "}
              <span className="text-primary">Estratégico</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Criamos nomes únicos, memoráveis e estrategicamente pensados que traduzem o propósito da sua marca e se destacam no mercado.
            </p>
            <p className="text-foreground/70 leading-relaxed max-w-2xl">
              Um bom nome é a primeira impressão da sua marca. Ele precisa comunicar valor, ser fácil de lembrar e ter disponibilidade legal e digital.
            </p>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Solicitar Orçamento</a>
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
    "Nome genérico que não diferencia",
    "Conflitos de marca ou domínio",
    "Dificuldade de memorização",
    "Nome que limita o crescimento",
    "Sem conexão com propósito da marca",
  ];
  const com = [
    "Nome único e memorável",
    "Disponibilidade legal e digital verificada",
    "Fácil de pronunciar e lembrar",
    "Nome que cresce com a marca",
    "Conexão estratégica com posicionamento",
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Antes e Depois</h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-8">
          <RevealSection>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 h-full">
              <h3 className="font-bold font-serif text-lg mb-6 text-destructive">Sem Naming Estratégico</h3>
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
              <h3 className="font-bold font-serif text-lg mb-6 text-primary">Com Naming SM Agency</h3>
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
    { icon: Search, title: "Briefing e Imersão", text: "Entendemos o negócio, mercado, público e atributos desejados" },
    { icon: Lightbulb, title: "Geração Criativa", text: "Desenvolvemos dezenas de opções com diferentes abordagens" },
    { icon: Filter, title: "Curadoria e Filtro", text: "Selecionamos as melhores opções por critérios estratégicos" },
    { icon: ShieldCheck, title: "Verificação Legal", text: "Checamos disponibilidade de registro de marca e domínio" },
    { icon: FileText, title: "Apresentação Final", text: "Entregamos opções finalistas com justificativa estratégica" },
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

/* ─── Entregáveis ─── */
function Entregaveis() {
  const items = [
    { icon: Sparkles, title: "3-5 opções de nomes finalistas" },
    { icon: FileText, title: "Justificativa estratégica de cada nome" },
    { icon: Globe, title: "Verificação de domínio disponível" },
    { icon: ShieldCheck, title: "Pesquisa prévia de registro de marca (INPI)" },
    { icon: Lightbulb, title: "Análise fonética e semântica" },
    { icon: Zap, title: "Recomendação final com ranking" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">O Que Você Recebe</h2>
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
            <p className="text-4xl font-bold font-serif text-primary">A partir de R$5.000</p>
            <p className="text-sm text-muted-foreground">Prazo: 2-4 semanas</p>
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
            <h2 className="text-3xl md:text-4xl font-bold">Precisa de um Nome Estratégico?</h2>
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
                <Label htmlFor="type">Tipo de naming *</Label>
                <select id="type" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="empresa">Nome de empresa</option>
                  <option value="produto">Nome de produto/serviço</option>
                  <option value="marca">Submarca ou linha</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Descreva brevemente o projeto *</Label>
              <Textarea id="details" required placeholder="Qual é o negócio, público-alvo e o que o nome precisa comunicar..." rows={3} />
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
export default function Naming() {
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
