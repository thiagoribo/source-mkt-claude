import { Helmet } from "react-helmet-async";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUtmParams } from "@/hooks/useUtmParams";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import { trackLead, trackFormStart } from "@/lib/analytics";
import {
  Check,
  User,
  Search,
  Palette,
  Compass,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RevealSection from "@/components/shared/RevealSection";
import ComparisonTable from "@/components/shared/ComparisonTable";
import { brandingPessoalResults } from "@/data/serviceMockups";

/* ─── CTA mid-page reutilizável ─── */
function MidPageCta({ label, cta }: { label: string; cta: string }) {
  return (
    <RevealSection>
      <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-foreground/50 max-w-sm leading-relaxed">{label}</p>
        <Button variant="outline" className="rounded-none flex-shrink-0" asChild>
          <a href="#formulario" className="flex items-center gap-2">
            {cta} <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </RevealSection>
  );
}

/* ─── Hero + Formulário integrado ─── */
function HeroWithForm() {
  const profiles = ["Empreendedores", "Executivos", "Consultores", "Especialistas"];
  const { submitLead, isLoading } = useSubmitLead('branding-pessoal');
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const utmParams = useUtmParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const result = await submitLead({
      full_name: formData.get('name') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('phone') as string,
      area: formData.get('area') as string,
      notes: formData.get('challenge') as string,
      digital_presence: formData.get('presence') as string,
      utm_source: formData.get('utm_source') as string || undefined,
      utm_medium: formData.get('utm_medium') as string || undefined,
      utm_campaign: formData.get('utm_campaign') as string || undefined,
      utm_content: formData.get('utm_content') as string || undefined,
      utm_term: formData.get('utm_term') as string || undefined,
    });
    if (result.success) {
      trackLead("branding-pessoal");
      navigate('/obrigado?service=branding-pessoal');
    }
  };

  return (
    <section id="formulario" className="section-spacing bg-background overflow-hidden relative">
      <div className="container-sm max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">
          {/* ── Left: Copy ── */}
          <RevealSection>
            <div className="relative space-y-8">
              <span
                aria-hidden
                className="absolute -top-8 right-0 text-[180px] leading-none font-bold font-serif select-none pointer-events-none hidden xl:block"
                style={{ opacity: 0.035, letterSpacing: "-0.04em" }}
              >
                SM
              </span>

              <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Branding Pessoal
              </div>

              <div className="flex flex-wrap gap-2">
                {profiles.map((p) => (
                  <span key={p} className="text-xs font-mono border border-border px-3 py-1.5 text-foreground/50">
                    {p}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight">
                Especialistas cobram menos{" "}
                <em className="not-italic text-foreground/40 font-normal">do que valem.</em>
                <br />
                <span className="text-primary">O problema raramente é a competência.</span>
              </h1>

              <p className="text-base text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Construímos o posicionamento estratégico e a identidade visual que fazem líderes, consultores e especialistas serem percebidos pelo que realmente valem.
              </p>

              <ul className="space-y-2.5">
                {[
                  "+100 projetos de branding pessoal",
                  "Posicionamento + identidade visual completa",
                  "Apenas 3 vagas abertas em junho",
                  "Resposta em até 48h úteis",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/65">
                    <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          {/* ── Right: Form Card ── */}
          <RevealSection delay={120}>
            <div className="bg-secondary border border-border p-6 md:p-8">
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  Apenas 3 vagas em junho
                </span>
                <p className="font-bold text-lg">Vamos Analisar Seu Posicionamento?</p>
                <p className="text-foreground/55 text-xs mt-1 leading-relaxed">Preencha abaixo. Entraremos em contato em até 48h úteis.</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">
                <input type="hidden" name="utm_source" value={utmParams.utm_source ?? ''} />
                <input type="hidden" name="utm_medium" value={utmParams.utm_medium ?? ''} />
                <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign ?? ''} />
                <input type="hidden" name="utm_content" value={utmParams.utm_content ?? ''} />
                <input type="hidden" name="utm_term" value={utmParams.utm_term ?? ''} />

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="bp-name" className="text-xs">Nome *</Label>
                    <Input id="bp-name" name="name" required placeholder="Seu nome" className="rounded-none h-9 text-sm" onFocus={() => trackFormStart("branding-pessoal")} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bp-email" className="text-xs">Email *</Label>
                    <Input id="bp-email" name="email" type="email" required placeholder="seu@email.com" className="rounded-none h-9 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="bp-phone" className="text-xs">WhatsApp *</Label>
                    <Input id="bp-phone" name="phone" required placeholder="(11) 99999-9999" className="rounded-none h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bp-area" className="text-xs">Área de atuação *</Label>
                    <Input id="bp-area" name="area" required placeholder="Consultoria, Medicina..." className="rounded-none h-9 text-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bp-challenge" className="text-xs">Seu maior desafio de autoridade hoje *</Label>
                  <Textarea id="bp-challenge" name="challenge" required placeholder="Ex: não consigo cobrar o que realmente valho..." rows={2} className="rounded-none text-sm" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bp-presence" className="text-xs">Presença digital atual</Label>
                  <select
                    id="bp-presence"
                    name="presence"
                    className="flex h-9 w-full border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Selecione</option>
                    <option value="Não tenho presença digital">Não tenho presença digital</option>
                    <option value="Básica (perfis sem estratégia)">Básica (perfis sem estratégia)</option>
                    <option value="Ativa mas inconsistente">Ativa mas inconsistente</option>
                    <option value="Forte, quero profissionalizar">Forte, quero profissionalizar</option>
                  </select>
                </div>

                <Button type="submit" size="lg" className="w-full rounded-none text-sm h-11" disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Quero Iniciar Meu Processo'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Sem compromisso · Resposta em até 48h úteis
                </p>
              </form>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─── O Que É — layout editorial ─── */
function OQueE() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-16 items-start">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">O que é</p>
              <blockquote className="text-2xl md:text-3xl font-bold font-serif leading-snug text-foreground/80">
                "Não criamos personas. Amplificamos quem você já é."
              </blockquote>
              <div className="h-px w-12 bg-accent mt-6" />
            </div>

            <div className="space-y-5 text-foreground/70 leading-relaxed text-sm md:text-base">
              <p>
                Branding pessoal é sobre comunicar quem você é de forma intencional, estratégica e memorável — traduzindo sua essência, valores e diferenciais em uma marca forte e reconhecida.
              </p>
              <p>
                Na SM Agency, ajudamos líderes e especialistas a construírem autoridade com autenticidade, conectando propósito, imagem e posicionamento para que você seja lembrado não apenas pelo que faz, mas por quem você é.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois — tabela comparativa ─── */
const brandingPessoalRows = [
  { sem: "Comunicação genérica e inconsistente", com: "Posicionamento claro e autêntico" },
  { sem: "Baixa percepção de autoridade e expertise", com: "Imagem que transmite confiança e credibilidade" },
  { sem: "Falta de clareza sobre o que comunicar", com: "Mensagem direcionada ao público certo" },
  { sem: "Identidade visual desconectada da proposta", com: "Visual coerente com estilo e propósito" },
  { sem: '"Mais um" no mercado, sem diferenciação real', com: "Marca pessoal memorável e diferenciada" },
];

function AntesDepois() {
  return (
    <ComparisonTable
      title="Antes e Depois do Branding Pessoal"
      rows={brandingPessoalRows}
      beforeLabel="Sem Branding Pessoal"
      afterLabel="Com Branding Pessoal"
    />
  );
}

/* ─── Processo — numerado com duração ─── */
function Processo() {
  const steps = [
    {
      num: "01",
      icon: User,
      title: "Imersão e Diagnóstico",
      text: "Entendemos quem você é, onde quer chegar e como o mercado te percebe hoje — trajetória, valores, diferenciais e análise de concorrência.",
      duration: "1–2 semanas",
    },
    {
      num: "02",
      icon: Search,
      title: "Posicionamento e Narrativa",
      text: "Definimos como sua marca deve se comunicar, qual história construir e os pilares estratégicos que vão diferenciar você no mercado.",
      duration: "2 semanas",
    },
    {
      num: "03",
      icon: Palette,
      title: "Identidade Visual Completa",
      text: "Desenvolvemos o sistema visual que representa quem você é — logotipo, paleta, tipografia, elementos gráficos e manual de marca aplicado em todos os pontos de contato.",
      duration: "3 semanas",
    },
    {
      num: "04",
      icon: Compass,
      title: "Ativação e Direcionamento",
      text: "Entregamos manual completo, jornada do cliente estruturada, ecossistema de serviços organizado e direcionamento estratégico para os seus canais digitais.",
      duration: "Entrega final",
    },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Como Funciona</h2>
        </RevealSection>

        <div className="divide-y divide-border">
          {steps.map((s, i) => (
            <RevealSection key={s.title} delay={i * 80}>
              <div className="group flex gap-6 py-8 items-start cursor-default hover:bg-background/60 transition-colors -mx-6 px-6">
                <span
                  className="font-mono text-4xl font-bold leading-none flex-shrink-0 w-14 text-right pt-1"
                  style={{ color: "hsl(var(--foreground) / 0.08)" }}
                >
                  {s.num}
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-lg leading-snug">{s.title}</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/35 border border-border/50 px-2 py-0.5">
                      {s.duration}
                    </span>
                  </div>
                  <p className="text-foreground/55 text-sm leading-relaxed">{s.text}</p>
                </div>
                <s.icon className="h-5 w-5 text-foreground/15 group-hover:text-accent/60 transition-colors flex-shrink-0 mt-1.5" />
              </div>
            </RevealSection>
          ))}
        </div>

        <MidPageCta
          label="Todo o processo leva menos de 2 meses. Pronto para começar?"
          cta="Quero Iniciar Meu Processo"
        />
      </div>
    </section>
  );
}

/* ─── Para Quem É — lista editorial ─── */
function ParaQuemE() {
  const criteria = [
    "Você é empreendedor, executivo, consultor ou especialista de mercado",
    "Quer ser reconhecido como autoridade no seu segmento",
    "Precisa atrair clientes, oportunidades ou parceiros certos",
    "Sua presença digital não reflete seu nível real de expertise",
    "Você tem conteúdo para compartilhar mas falta clareza na comunicação",
    "Quer se diferenciar em mercados competitivos",
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Este Serviço É Para Você Se:</h2>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="divide-y divide-border">
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

        <MidPageCta
          label="Se você se identificou com 3 ou mais pontos acima, esse serviço é para você."
          cta="Agendar Conversa"
        />
      </div>
    </section>
  );
}

/* ─── Cases Reais — Slideshow ─── */
function ResultadosSimulados() {
  const items = brandingPessoalResults;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Cases Reais</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Resultados reais de clientes que investiram em branding pessoal com a SM Agency.
            </p>
          </div>
        </RevealSection>

        {/* Full-image slideshow */}
        <div className="overflow-hidden rounded-sm">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentIndex}
              src={items[currentIndex].imageSrc}
              alt={`Case de Branding Pessoal ${currentIndex + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-auto"
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? "right" : "left");
                  setCurrentIndex(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentIndex ? "bg-primary w-6" : "bg-border/70 w-1.5"
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-foreground/40">
              {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-border hover:border-primary/40 flex items-center justify-center transition-colors"
                aria-label="Slide anterior"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors"
                aria-label="Próximo slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <MidPageCta
          label="Quer um resultado como esse para sua marca pessoal?"
          cta="Quero Ser o Próximo Case"
        />
      </div>
    </section>
  );
}

/* ─── Investimento — seção escura ─── */
function InvestimentoPessoal() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <span
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 font-bold font-serif leading-none select-none pointer-events-none hidden lg:block"
        style={{ opacity: 0.05, fontSize: "160px" }}
      >
        18k
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase opacity-50">Investimento</p>
              <p className="text-6xl md:text-7xl font-bold font-serif leading-none">R$18.000</p>
              <p className="text-primary-foreground/50 text-sm">
                A partir de — Duração: 5–7 semanas
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none text-base px-8 h-12 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
              asChild
            >
              <a href="#formulario" className="flex items-center gap-2">
                Solicitar Proposta <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const faqs = [
    {
      q: "Qual a diferença entre branding pessoal e fazer posts no Instagram?",
      a: "Branding pessoal é a estratégia por trás de tudo. Define quem você é, para quem fala, como se posiciona e o que comunica — antes de qualquer post. Sem isso, você produz conteúdo no escuro: muito esforço, pouco resultado. O Instagram é apenas um canal de distribuição.",
    },
    {
      q: "Preciso ter muitos seguidores para esse serviço fazer sentido?",
      a: "Não. Branding pessoal não é sobre quantidade de seguidores — é sobre qualidade de percepção. Clientes com 2.000 seguidores fecham contratos maiores do que perfis com 50.000 quando têm posicionamento claro. O objetivo é atrair as pessoas certas, não qualquer pessoa.",
    },
    {
      q: "Em quanto tempo começo a perceber resultados?",
      a: "Os primeiros resultados aparecem já durante o processo — clareza, segurança na comunicação, identidade visual consistente. Contratos e oportunidades concretas geralmente surgem nos primeiros 60 a 90 dias após a implementação.",
    },
    {
      q: "Por que R$18.000? O que justifica esse investimento?",
      a: "Você recebe: posicionamento estratégico completo, identidade visual profissional (que sozinha custa de R$6.000 a R$15.000 no mercado), narrativa de marca, jornada do cliente estruturada e manual completo. Mas mais do que o entregável, o retorno sobre a percepção de valor — que permite cobrar mais pelos mesmos serviços — costuma pagar o investimento no primeiro ou segundo contrato fechado.",
    },
    {
      q: "E se eu não gostar do resultado?",
      a: "Trabalhamos com imersão profunda e co-criação em cada etapa — você aprova antes de avançarmos. Revisões fazem parte do processo. Nosso histórico com mais de 100 projetos mostra que quando o processo é seguido corretamente, o resultado supera as expectativas do cliente.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Dúvidas Frequentes</p>
            <h2 className="text-3xl md:text-4xl font-bold">Perguntas que todo mundo tem antes de investir</h2>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <Accordion type="single" collapsible className="divide-y divide-border border-t border-b border-border">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none">
                <AccordionTrigger className="text-left font-semibold text-base py-6 hover:no-underline hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/65 leading-relaxed text-sm pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealSection>
      </div>
    </section>
  );
}


/* ─── Page ─── */
export default function BrandingPessoal() {
  return (
    <>
      <Helmet>
        <title>Branding Pessoal para Líderes e Especialistas | SM Agency</title>
        <meta name="description" content="Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes que querem ser reconhecidos pelo que representam." />
        <link rel="canonical" href="https://sourcemkt.com.br/branding-pessoal" />
        <meta property="og:title" content="Branding Pessoal para Líderes e Especialistas | SM Agency" />
        <meta property="og:description" content="Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes." />
        <meta property="og:url" content="https://sourcemkt.com.br/branding-pessoal" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Branding Pessoal para Líderes e Especialistas",
          "description": "Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes que querem ser reconhecidos pelo que representam.",
          "url": "https://sourcemkt.com.br/branding-pessoal",
          "provider": { "@type": "Organization", "name": "SM Agency", "url": "https://sourcemkt.com.br" },
          "areaServed": { "@type": "Country", "name": "Brazil" },
          "serviceType": "Branding Pessoal"
        })}</script>
      </Helmet>
      <HeroWithForm />
      <OQueE />
      <AntesDepois />
      <Processo />
      <ParaQuemE />
      <ResultadosSimulados />
      {/* <InvestimentoPessoal /> — preço oculto, backup em src/_pricing-backup/investimento-branding-pessoal.tsx */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-sm max-w-4xl">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2">
                <p className="text-primary-foreground/60 text-sm font-mono uppercase tracking-widest">Próximo passo</p>
                <p className="text-xl md:text-2xl font-bold leading-snug">
                  Pronto para ser percebido pelo que realmente vale?
                </p>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none text-base px-8 h-12 flex-shrink-0 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
                asChild
              >
                <a href="#formulario" className="flex items-center gap-2">
                  Agendar Conversa <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>
      <FAQ />
    </>
  );
}
