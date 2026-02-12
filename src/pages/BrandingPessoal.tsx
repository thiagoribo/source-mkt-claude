import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  User,
  Search,
  Palette,
  MessageSquare,
  FileText,
  Quote,
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
              Branding Pessoal para{" "}
              <span className="text-primary">Líderes e Especialistas</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
              Construa autoridade autêntica e torne-se referência no seu segmento através de posicionamento estratégico e identidade visual consistente.
            </p>
            <p className="text-foreground/70 leading-relaxed max-w-2xl">
              Para empreendedores, executivos, consultores e criadores que sabem que sua marca pessoal é um ativo de negócio, não apenas presença digital.
            </p>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Quero Construir Minha Autoridade</a>
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
            Branding Pessoal Estratégico
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Branding pessoal é sobre comunicar quem você é de forma intencional, estratégica e memorável. Não se trata de criar uma persona falsa, mas de traduzir sua essência, valores e diferenciais em uma marca forte e reconhecida no mercado.
            </p>
            <p>
              Na SM Agency, ajudamos líderes e especialistas a construírem autoridade com autenticidade, conectando propósito, imagem e posicionamento para que você seja lembrado não apenas pelo que faz, mas por quem você é e o valor único que traz.
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
    "Comunicação genérica e inconsistente",
    "Baixa percepção de autoridade",
    "Falta de clareza sobre o que comunicar",
    "Identidade visual desconectada da proposta",
    '"Mais um" no mercado, sem diferenciação',
  ];
  const com = [
    "Posicionamento claro e autêntico",
    "Imagem que transmite confiança e expertise",
    "Mensagem direcionada ao público certo",
    "Visual coerente com estilo e propósito",
    "Marca pessoal memorável e diferenciada",
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Antes e Depois do Branding Pessoal
          </h2>
        </RevealSection>
        <div className="grid md:grid-cols-2 gap-8">
          <RevealSection>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 h-full">
              <h3 className="font-bold font-serif text-lg mb-6 text-destructive">Sem Branding Pessoal</h3>
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
              <h3 className="font-bold font-serif text-lg mb-6 text-primary">Com Branding Pessoal</h3>
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
    { icon: User, title: "Imersão na História e Essência", text: "Entendemos trajetória, valores, diferenciais e impacto desejado", duration: "1 semana" },
    { icon: Search, title: "Mapeamento de Posicionamento", text: "Definimos como sua marca deve se comunicar e posicionar", duration: "2 semanas" },
    { icon: Palette, title: "Identidade Visual Pessoal", text: "Desenvolvemos elementos visuais que expressam sua essência", duration: "3 semanas" },
    { icon: MessageSquare, title: "Narrativa e Direcionamento", text: "Criamos pilares, frases e abordagens para canais digitais", duration: "1 semana" },
    { icon: FileText, title: "Guia de Marca Pessoal", text: "Material completo com identidade e direção estratégica", duration: "Entrega final" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Como Funciona
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

/* ─── Para Quem É ─── */
function ParaQuemE() {
  const criteria = [
    "Você é empreendedor, executivo, consultor ou especialista",
    "Quer ser reconhecido como autoridade no seu segmento",
    "Precisa atrair clientes, oportunidades ou parceiros certos",
    "Sua presença digital não reflete seu nível de expertise",
    "Você tem conteúdo para compartilhar mas falta clareza na comunicação",
    "Quer se diferenciar em mercados competitivos",
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Este Serviço É Para Você Se:
          </h2>
        </RevealSection>
        <RevealSection delay={100}>
          <ul className="space-y-5">
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
      </div>
    </section>
  );
}

/* ─── Investimento ─── */
function InvestimentoPessoal() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="bg-background rounded-xl p-8 md:p-12 shadow-sm border border-border/50 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Investimento em Branding Pessoal
            </h2>
            <p className="text-4xl font-bold font-serif text-primary">A partir de R$18.000</p>
            <p className="text-sm text-muted-foreground">Duração típica: 5-7 semanas</p>
            <Button size="lg" className="rounded-md text-base px-8 h-12" asChild>
              <a href="#formulario">Solicitar Proposta</a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Depoimento ─── */
function Depoimento() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="bg-secondary rounded-xl p-8 md:p-12 text-center space-y-6">
            <Quote className="h-10 w-10 text-primary/20 mx-auto" />
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed italic font-serif">
              "A SM Agency entendeu exatamente quem eu sou e traduziu isso em uma marca pessoal que comunica autoridade e autenticidade. O resultado foi transformador para minha carreira e meu posicionamento no mercado."
            </p>
            <div>
              <p className="font-semibold">Thatiane Oliveira</p>
              <p className="text-sm text-muted-foreground">Consultora de Negócios</p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Formulário ─── */
function FormularioPessoal() {
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
              Vamos Construir Sua Autoridade?
            </h2>
          </div>
        </RevealSection>
        <RevealSection delay={100}>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6 bg-background rounded-xl p-8 border border-border/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" required placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required placeholder="seu@email.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" required placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área de atuação *</Label>
                <Input id="area" required placeholder="Consultoria, Medicina, etc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">Seu maior desafio com marca pessoal *</Label>
              <Textarea id="challenge" required placeholder="Descreva brevemente..." rows={3} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="presence">Presença digital atual</Label>
                <select id="presence" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="nenhuma">Não tenho presença digital</option>
                  <option value="basica">Básica (perfis sem estratégia)</option>
                  <option value="ativa">Ativa mas inconsistente</option>
                  <option value="forte">Forte, quero profissionalizar</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Faixa de investimento</Label>
                <select id="budget" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Selecione</option>
                  <option value="18k-25k">R$18.000 - R$25.000</option>
                  <option value="25k-35k">R$25.000 - R$35.000</option>
                  <option value="35k+">Acima de R$35.000</option>
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
export default function BrandingPessoal() {
  return (
    <>
      <Hero />
      <OQueE />
      <AntesDepois />
      <Processo />
      <ParaQuemE />
      <InvestimentoPessoal />
      <Depoimento />
      <FormularioPessoal />
    </>
  );
}
