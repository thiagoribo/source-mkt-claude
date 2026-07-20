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
import QualificationForm from "@/components/shared/QualificationForm";
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
                Branding · Posicionamento Pessoal
              </div>

              <div className="flex flex-wrap gap-2">
                {profiles.map((p) => (
                  <span key={p} className="text-xs font-mono border border-border px-3 py-1.5 text-foreground/50">
                    {p}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight">
                Seja escolhido pela{" "}
                <em className="not-italic text-foreground/40 font-normal">sua autoridade,</em>
                <br />
                <span className="text-primary">não pelo seu preço.</span>
              </h1>

              <p className="text-base text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Construímos o posicionamento estratégico e a identidade visual que fazem líderes, consultores e especialistas serem percebidos pelo valor real do que entregam — em dois meses.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Processo completo em dois meses",
                  "Estratégia + identidade visual + manual de marca",
                  "Participação direta em imersões e decisões",
                  "Candidaturas analisadas em até 48h úteis",
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
                <p className="font-bold text-lg">Candidatura para Branding Pessoal</p>
                <p className="text-foreground/55 text-xs mt-1 leading-relaxed">Queremos entender sua atuação, o momento do seu posicionamento e sua disponibilidade para o processo.</p>
              </div>
              <QualificationForm service="branding-pessoal" compact />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─── O Que É Branding Pessoal — seção educacional ─── */
function OQueE() {
  const pilares = [
    {
      num: "01",
      title: "Reputação",
      text: "Sua trajetória, valores e diferenciais — o material bruto que já existe e precisa ser organizado com clareza.",
    },
    {
      num: "02",
      title: "Posicionamento",
      text: "A escolha estratégica de como você quer ser percebido, para quem, e qual território ocupa no seu mercado.",
    },
    {
      num: "03",
      title: "Identidade",
      text: "Sistema visual e narrativo que traduz o posicionamento em uma marca reconhecível, coerente e memorável.",
    },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-start mb-14 md:mb-20">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">O que é branding pessoal</p>
              <blockquote className="text-2xl md:text-3xl font-bold font-serif leading-snug text-foreground/85">
                "Branding pessoal é o<br /><span className="text-primary italic">posicionamento</span> de quem você já é —<br />organizado como marca."
              </blockquote>
              <div className="h-px w-12 bg-accent mt-6" />
            </div>

            <div className="space-y-5 text-foreground/70 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground font-semibold">Branding pessoal</strong> é o processo de posicionar profissionais consolidados como marcas — traduzindo reputação, expertise e valores em uma identidade estratégica reconhecível pelo público certo.
              </p>
              <p>
                Diferente de "gestão de audiência" ou produção de conteúdo, o branding pessoal define <em>o que você representa antes de decidir o que postar</em>. Sem esse posicionamento, cada peça de comunicação puxa a marca para uma direção diferente e a autoridade fica diluída.
              </p>
              <p className="text-foreground/55 text-sm border-l-2 border-accent pl-4 italic">
                Não criamos personas. Não vendemos crescimento de seguidores. Organizamos quem você já é para que o mercado perceba o valor real do que você entrega.
              </p>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="grid md:grid-cols-3 gap-0 border-t border-border/40 pt-10">
            {pilares.map((p, i) => (
              <div
                key={p.num}
                className={`p-2 md:px-6 lg:px-8 ${
                  i > 0 ? "border-t md:border-t-0 md:border-l border-border/30 pt-8 md:pt-2" : ""
                }`}
              >
                <p className="font-mono text-xs text-accent mb-3">{p.num}</p>
                <h3 className="font-bold text-base mb-2 leading-snug">{p.title}</h3>
                <p className="text-foreground/55 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Percepção × Competência — fundo navy para quebrar ritmo ─── */
function PercepcaoVsCompetencia() {
  return (
    <section className="section-spacing bg-primary text-primary-foreground relative overflow-hidden">
      {/* Ghost typographic element */}
      <span
        aria-hidden
        className="absolute -top-6 -right-4 md:top-8 md:right-16 font-bold font-serif leading-none select-none pointer-events-none text-primary-foreground/[0.04]"
        style={{ fontSize: "clamp(8rem, 22vw, 20rem)", letterSpacing: "-0.05em" }}
      >
        ≠
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          {/* Pull quote */}
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary-foreground/40 mb-5">
              O paradoxo
            </p>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif leading-snug text-primary-foreground">
              O mercado não compra competência.<br />
              <span className="text-accent italic">Compra a percepção de competência.</span>
            </blockquote>
            <div className="h-[2px] w-16 bg-accent mt-8" />
          </div>

          {/* Dois estados */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-0">
            {/* Sem branding pessoal */}
            <div className="md:pr-10 lg:pr-16">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-primary-foreground/10">
                <span className="w-2 h-2 border border-primary-foreground/30 rotate-45 inline-block flex-shrink-0" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary-foreground/35">
                  Sem posicionamento
                </p>
              </div>
              <div className="space-y-5">
                {[
                  "Clientes que subestimam o valor cobrado",
                  "Indicações inconsistentes — sem narrativa clara",
                  "Visual desconectado do nível da entrega",
                  "Comunicação que não diferencia do concorrente",
                  "Autoridade percebida menor que a real",
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-baseline">
                    <span className="text-[10px] font-mono text-primary-foreground/20 flex-shrink-0 pt-px">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-primary-foreground/40 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Com branding pessoal Source */}
            <div className="md:pl-10 lg:pl-16 md:border-l md:border-primary-foreground/10">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-accent/30">
                <span className="w-2 h-2 bg-accent inline-block flex-shrink-0" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
                  Com branding pessoal Source
                </p>
              </div>
              <div className="space-y-5">
                {[
                  "Posicionamento que sustenta preços coerentes com a entrega",
                  "Narrativa de autoridade clara, consistente e memorável",
                  "Identidade visual alinhada com o estilo e a proposta",
                  "Diferenciação real — percebida pelo público certo",
                  "Reputação organizada como ativo estratégico da carreira",
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-baseline">
                    <span className="text-[10px] font-mono text-accent/60 flex-shrink-0 pt-px">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-primary-foreground/90 leading-relaxed font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
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
      title: "Manual e Diretrizes de Aplicação",
      text: "Organizamos a estratégia e a identidade em um manual claro para orientar sua comunicação e os próximos pontos de contato.",
      duration: "Semana 8",
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
          label="O processo acontece em dois meses e exige participação ativa em cada decisão."
          cta="Candidatar meu projeto"
        />
      </div>
    </section>
  );
}

/* ─── Para Quem É — lista editorial ─── */
function ParaQuemE() {
  const criteria = [
    "Você é fundador, executivo, consultor ou especialista com atuação comprovada",
    "Já possui uma oferta clara e sabe qual público deseja atender",
    "Sua reputação profissional ainda não está organizada como marca",
    "Pode participar das imersões, validar caminhos e tomar decisões",
    "Está preparado para aplicar a nova marca depois da entrega",
    "Busca autoridade baseada em posicionamento, não apenas crescimento de audiência",
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Este projeto exige de você</h2>
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
          label="Este não é um serviço de assessoria para influenciadores nem de crescimento de audiência."
          cta="Enviar candidatura"
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
              Projetos de clientes que construíram seu branding pessoal com a Source.
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

/* ─── FAQ ─── */
function FAQ() {
  const faqs = [
    {
      q: "Qual a diferença entre branding pessoal e fazer posts no Instagram?",
      a: "Branding pessoal é a estratégia por trás de tudo. Define quem você é, para quem fala, como se posiciona e o que comunica — antes de qualquer post. Sem isso, você produz conteúdo no escuro: muito esforço, pouco resultado. O Instagram é apenas um canal de distribuição.",
    },
    {
      q: "Preciso ter muitos seguidores para esse serviço fazer sentido?",
      a: "Não. Branding pessoal não é sobre quantidade de seguidores, mas sobre clareza de posicionamento e coerência de percepção. O objetivo é ser compreendido pelas pessoas certas.",
    },
    {
      q: "Em quanto tempo começo a perceber resultados?",
      a: "Durante o processo, você já ganha clareza de posicionamento, narrativa e critérios de comunicação. Resultados comerciais dependem da aplicação da marca, do mercado e da operação de cada profissional.",
    },
    {
      q: "Quanto tempo dura e o que preciso disponibilizar?",
      a: "O processo dura dois meses. Você participa das imersões, compartilha contexto, avalia os caminhos apresentados e aprova as entregas dentro dos prazos combinados.",
    },
    {
      q: "E se eu não gostar do resultado?",
      a: "O projeto é construído por etapas, com apresentações, validações e revisões previstas. Sua participação reduz desalinhamentos e garante que as decisões façam sentido para a realidade da marca.",
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
        <title>Branding Pessoal e Posicionamento de Autoridade | Source</title>
        <meta name="description" content="Branding pessoal e posicionamento estratégico para líderes, consultores e especialistas: reputação, identidade visual e narrativa organizadas como marca em dois meses." />
        <link rel="canonical" href="https://sourcemkt.com.br/branding-pessoal" />
        <meta property="og:title" content="Branding Pessoal e Posicionamento de Autoridade | Source" />
        <meta property="og:description" content="Branding pessoal e posicionamento de autoridade — identidade visual, narrativa e reputação organizadas como marca." />
        <meta property="og:url" content="https://sourcemkt.com.br/branding-pessoal" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Branding Pessoal para Líderes e Especialistas",
          "description": "Construa autoridade e influência com branding pessoal estratégico. Posicionamento, identidade visual e narrativa para líderes que querem ser reconhecidos pelo que representam.",
          "url": "https://sourcemkt.com.br/branding-pessoal",
          "provider": { "@type": "Organization", "name": "Source", "url": "https://sourcemkt.com.br" },
          "areaServed": { "@type": "Country", "name": "Brazil" },
          "serviceType": "Branding Pessoal"
        })}</script>
      </Helmet>
      <HeroWithForm />
      <OQueE />
      <PercepcaoVsCompetencia />
      <Processo />
      <ParaQuemE />
      <ResultadosSimulados />
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
                  Candidatar meu projeto <ArrowRight className="h-4 w-4" />
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
