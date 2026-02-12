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
  Target,
  MessageSquare,
  BookOpen,
  Award,
  Compass,
  Palette,
  Volume2,
  FileText,
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
              Branding Empresarial{" "}
              <span className="text-primary">Estratégico</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Construímos a base estratégica que transforma empresas em marcas com significado, diferenciação e valor percebido no mercado.
            </p>
            <p className="text-foreground/70 leading-relaxed max-w-2xl">
              Branding empresarial é o DNA da sua marca: propósito, posicionamento, valores, narrativa e arquitetura estratégica que guiam todas as decisões de comunicação e negócio.
            </p>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Conversar Sobre Minha Marca</a>
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
            O Que É Branding Empresarial
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Branding empresarial é o processo de construir o DNA estratégico da sua marca — não apenas o que você vende, mas o que você representa no mercado. É aqui que nascem o propósito, a visão e a narrativa que sustentam sua presença e guiam cada decisão de comunicação.
            </p>
            <p>
              Na SM Agency, construímos marcas com alma e estratégia. Definimos os pilares que atraem o público certo, criam diferenciação real no mercado e transformam negócios em marcas com significado, autoridade e valor percebido.
            </p>
            <p>
              Este não é um projeto cosmético de redesign. É trabalho estratégico profundo que redefine como sua empresa se posiciona, comunica e compete.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois ─── */
function AntesDepois() {
  const sem = [
    "Comunicação desconectada e sem personalidade",
    "Marca sem diferenciação clara no mercado",
    "Dificuldade de conectar com o público certo",
    "Ausência de clareza sobre missão, visão e valores",
    "Marca que vende, mas não se posiciona",
    "Competição apenas por preço ou conveniência",
  ];
  const com = [
    "Tom de voz único e alinhado com valores",
    "Posicionamento claro que destaca seu negócio",
    "Narrativa que inspira, conecta e engaja",
    "Pilares estratégicos bem definidos e aplicáveis",
    "Marca com propósito, cultura e conexão verdadeira",
    "Justificativa para preços premium",
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Antes e Depois do Branding Estratégico
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-8">
          <RevealSection>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 h-full">
              <h3 className="font-bold font-serif text-lg mb-6 text-destructive">Sem Branding Estratégico</h3>
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
              <h3 className="font-bold font-serif text-lg mb-6 text-primary">Com Branding Estratégico</h3>
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
    { icon: Search, title: "Diagnóstico e Imersão", text: "Entendemos o mercado, o negócio e oportunidades de posicionamento", duration: "2 semanas" },
    { icon: Layers, title: "Estruturação Estratégica", text: "Definição de propósito, missão, visão, valores, arquétipo e atributos de marca", duration: "3 semanas" },
    { icon: Target, title: "Posicionamento e Diferenciação", text: "Criamos a proposta de valor, a narrativa e a promessa da marca", duration: "2 semanas" },
    { icon: MessageSquare, title: "Tom de Voz e Personalidade", text: "Definimos como a marca fala, se expressa e se relaciona", duration: "1 semana" },
    { icon: BookOpen, title: "Manual de Marca", text: "Você recebe documento completo e aplicável com toda a base estratégica", duration: "Entrega final" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nosso Processo de Branding
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <RevealSection key={s.title} delay={i * 100}>
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                  Etapa {i + 1}
                </div>
                <h3 className="font-bold font-serif text-sm leading-snug">{s.title}</h3>
                <p className="text-foreground/60 text-xs leading-relaxed">{s.text}</p>
                <p className="text-xs text-muted-foreground">{s.duration}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── O Que Recebe ─── */
function Entregaveis() {
  const items = [
    { icon: Award, title: "Plataforma de Marca Completa" },
    { icon: Compass, title: "Propósito, Missão, Visão e Valores" },
    { icon: Target, title: "Arquétipo e Personalidade de Marca" },
    { icon: Layers, title: "Posicionamento e Proposta de Valor" },
    { icon: Volume2, title: "Tom de Voz e Territórios de Comunicação" },
    { icon: FileText, title: "Manual de Marca (60-80 páginas)" },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O Que Você Recebe
          </h2>
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
function InvestimentoBranding() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="bg-background rounded-xl p-8 md:p-12 shadow-sm border border-border/50 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Investimento em Branding Empresarial
            </h2>
            <p className="text-4xl font-bold font-serif text-primary">A partir de R$25.000</p>
            <div className="text-sm text-foreground/70 space-y-2 max-w-md mx-auto text-left">
              <p className="font-semibold text-foreground text-center mb-4">O que influencia o valor:</p>
              <ul className="space-y-2">
                {[
                  "Complexidade do mercado e competição",
                  "Necessidade de pesquisa primária com stakeholders",
                  "Arquitetura de marca (marca única vs. portfólio de marcas)",
                  "Inclusão de identidade visual integrada",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">Duração típica: 6-8 semanas</p>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Solicitar Proposta Personalizada</a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Branding vs Consultoria ─── */
function Comparacao() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="bg-secondary rounded-xl p-8 md:p-10 border border-border/50">
            <h3 className="text-xl font-bold font-serif mb-4">
              Branding Empresarial ou Consultoria Estratégica?
            </h3>
            <div className="space-y-4 text-foreground/70 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">Branding Empresarial</strong> foca na construção da plataforma de marca e posicionamento estratégico. É ideal se você precisa definir ou redefinir sua identidade de marca.
              </p>
              <p>
                <strong className="text-foreground">Consultoria Estratégica</strong> é mais abrangente: inclui branding, mas adiciona estratégia de performance, arquitetura de funil, e acompanhamento de implementação. É ideal se você precisa não só de posicionamento, mas também de um roadmap completo para crescer.
              </p>
              <p className="text-foreground/60 italic">
                Não tem certeza qual é melhor para você? Na conversa de diagnóstico, ajudamos você a identificar.
              </p>
            </div>
            <Link to="/consultoria-estrategica" className="text-primary text-sm font-medium hover:underline inline-block mt-4">
              Comparar Serviços →
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Formulário ─── */
function FormularioBranding() {
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Vamos Construir uma Marca Inesquecível?
            </h2>
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
              <Label htmlFor="website">Site da empresa</Label>
              <Input id="website" placeholder="www.suaempresa.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">Seu maior desafio com a marca atual *</Label>
              <Textarea id="challenge" required placeholder="Descreva brevemente..." rows={3} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="has-vi">Você já tem identidade visual?</Label>
                <select id="has-vi" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Faixa de investimento</Label>
                <select id="budget" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="25k-35k">R$25.000 - R$35.000</option>
                  <option value="35k-50k">R$35.000 - R$50.000</option>
                  <option value="50k+">Acima de R$50.000</option>
                  <option value="flexivel">Flexível</option>
                </select>
              </div>
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
export default function BrandingEmpresarial() {
  return (
    <>
      <Hero />
      <OQueE />
      <AntesDepois />
      <Processo />
      <Entregaveis />
      <InvestimentoBranding />
      <Comparacao />
      <FormularioBranding />
    </>
  );
}
