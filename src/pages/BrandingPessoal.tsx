import { Helmet } from "react-helmet-async";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubmitLead } from "@/hooks/useSubmitLead";
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
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { useTestimonialsByService } from "@/hooks/queries/useTestimonials";

// Fotos dos clientes - Branding Pessoal (fallback images)
import sabrinaKeller from "@/assets/clientes/sabrina-keller.webp";
import giuliaCloss from "@/assets/clientes/giulia-closs.webp";
import andressaFraga from "@/assets/clientes/andressa-fraga.webp";
import anaPriscia from "@/assets/clientes/ana-priscia.webp";
import indyZimmer from "@/assets/clientes/indy-zimmer.webp";
import thatianeOliveira from "@/assets/clientes/thatiane-oliveira.webp";
import stephanytizziani from "@/assets/clientes/stephany-tizziani.webp";

// Map client names to their local images
const clientImageMap: Record<string, string> = {
  "Sabrina Keller": sabrinaKeller,
  "Giulia Closs": giuliaCloss,
  "Andressa Fraga": andressaFraga,
  "Dra. Ana Príscia": anaPriscia,
  "Indy Zimmer": indyZimmer,
  "Thatiane Nascimento": thatianeOliveira,
  "Stephany Tizziani": stephanytizziani,
};

// Fallback testimonials for when Supabase is unavailable
const fallbackTestimonials = [
  {
    id: 1,
    name: "Sabrina Keller",
    role: "Mentora de Mulheres e Palestrante",
    quote: "Atribuo minha posição atual ao apoio na gestão de redes sociais e orientação de posicionamento. Recebo mensagens diárias de interessadas.",
    result: "+150% faturamento",
    imageSrc: sabrinaKeller,
    thumbnailSrc: sabrinaKeller,
  },
  {
    id: 2,
    name: "Giulia Closs",
    role: "Arquiteta",
    quote: "O processo superou as expectativas. A equipe capturou a essência da minha marca desde o início.",
    result: "R$ 20.000 no 1º mês",
    imageSrc: giuliaCloss,
    thumbnailSrc: giuliaCloss,
  },
  {
    id: 3,
    name: "Andressa Fraga",
    role: "Advogada e Mestre em Neurociência",
    quote: "Ana possui maestria em traduzir desejos que o cliente não consegue expressar com exatidão. O processo é uma escuta profunda que transforma histórias de vida em marcas estratégicas.",
    result: "3 empresas + Podcast Neuro4you",
    imageSrc: andressaFraga,
    thumbnailSrc: andressaFraga,
  },
  {
    id: 4,
    name: "Dra. Ana Príscia",
    role: "Médica Alergista e Imunologista",
    quote: "Ana deu rumo ao meu navio. Antes eu tinha força mas remava em círculos. O processo trouxe equilíbrio e direcionamento através de questionamentos e estratégias sólidas.",
    result: "Parcerias e projetos de destaque",
    imageSrc: anaPriscia,
    thumbnailSrc: anaPriscia,
  },
  {
    id: 5,
    name: "Indy Zimmer",
    role: "Mentora de Mentalidade",
    quote: "A equipe captou exatamente quem eu sou e superou as expectativas em 1 milhão de vezes. Descobri meu propósito e mudei completamente a visão do negócio.",
    result: "Propósito descoberto",
    imageSrc: indyZimmer,
    thumbnailSrc: indyZimmer,
  },
  {
    id: 6,
    name: "Thatiane Nascimento",
    role: "Assessora Administrativa & Financeira",
    quote: "A mentoria trouxe confiança e a sensação de merecimento. Investir em imagem e comunicação foi uma das minhas melhores decisões.",
    result: "Trabalha com grandes nomes do mercado digital",
    imageSrc: thatianeOliveira,
    thumbnailSrc: thatianeOliveira,
  },
  {
    id: 7,
    name: "Stephany Tizziani",
    role: "Mentora de Nail Designers",
    quote: "Melhor investimento da minha carreira. A agência me deu um norte e evitou muitos tropeços.",
    result: "Aumento na procura pela mentoria",
    imageSrc: stephanytizziani,
    thumbnailSrc: stephanytizziani,
  },
];

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

/* ─── Hero ─── */
function Hero() {
  const profiles = ["Empreendedores", "Executivos", "Consultores", "Especialistas"];

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
              <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Branding Pessoal
              </div>

              {/* Target profiles */}
              <div className="flex flex-wrap gap-2">
                {profiles.map((p) => (
                  <span
                    key={p}
                    className="text-xs font-mono border border-border px-3 py-1.5 text-foreground/50"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
                Especialistas cobram menos{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  do que valem.
                </em>
                <br />
                <span className="text-primary">O problema raramente é a competência.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Construímos o posicionamento estratégico e a identidade visual que fazem líderes, consultores e especialistas serem percebidos pelo que realmente valem.
              </p>

              <p className="text-sm text-foreground/50 max-w-lg leading-relaxed">
                Não é presença digital. É autoridade de mercado construída com método — do posicionamento à identidade visual aplicada em todos os seus pontos de contato.
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Quero Ser Percebido pelo Meu Valor</a>
              </Button>
            </div>
          </div>
        </RevealSection>
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

/* ─── Depoimento — editorial ─── */
function Depoimento() {
  const { data: supabaseTestimonials } = useTestimonialsByService('branding-pessoal');

  // Transform Supabase data to match TestimonialSlider format, or use fallback
  const testimonials = supabaseTestimonials && supabaseTestimonials.length > 0
    ? supabaseTestimonials.map((t, i) => ({
        id: i + 1,
        name: t.name,
        role: t.role || '',
        quote: t.quote,
        result: t.result || '',
        imageSrc: t.image_url || clientImageMap[t.name] || sabrinaKeller,
        thumbnailSrc: t.image_url || clientImageMap[t.name] || sabrinaKeller,
      }))
    : fallbackTestimonials;

  return (
    <TestimonialSlider
      reviews={testimonials}
      title="Clientes que Transformaram suas Carreiras"
      subtitle="Profissionais que investiram em branding pessoal e colheram resultados extraordinários"
    />
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

/* ─── Formulário ─── */
function FormularioPessoal() {
  const [submitted, setSubmitted] = useState(false);
  const { submitLead, isLoading } = useSubmitLead('branding-pessoal');
  const formRef = useRef<HTMLFormElement>(null);

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
    });

    if (result.success) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="formulario" className="section-spacing bg-secondary">
        <div className="container-sm max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Análise Solicitada!</h2>
          <p className="text-foreground/60">Entraremos em contato em até 48h úteis para agendar sua conversa estratégica.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-spacing bg-secondary">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="mb-8 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Conversa Estratégica</p>
            <h2 className="text-3xl md:text-4xl font-bold">Vamos Analisar Seu Posicionamento Atual — Sem Compromisso</h2>
            <p className="text-sm text-foreground/55 leading-relaxed">
              Atendemos no máximo 3 novos projetos de Branding Pessoal por mês — para manter a qualidade de imersão que cada marca exige.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 bg-background border border-border p-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" name="name" required placeholder="Seu nome" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="seu@email.com" className="rounded-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp *</Label>
                <Input id="phone" name="phone" required placeholder="(11) 99999-9999" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área de atuação *</Label>
                <Input id="area" name="area" required placeholder="Consultoria, Medicina, Tecnologia..." className="rounded-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">Qual seu maior desafio de autoridade hoje? *</Label>
              <Textarea id="challenge" name="challenge" required placeholder="Ex: não consigo cobrar o que realmente valho, minha presença não reflete minha experiência..." rows={3} className="rounded-none" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="presence">Presença digital atual</Label>
              <select
                id="presence"
                name="presence"
                className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Selecione</option>
                <option value="Não tenho presença digital">Não tenho presença digital</option>
                <option value="Básica (perfis sem estratégia)">Básica (perfis sem estratégia)</option>
                <option value="Ativa mas inconsistente">Ativa mas inconsistente</option>
                <option value="Forte, quero profissionalizar">Forte, quero profissionalizar</option>
              </select>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-none text-base h-12" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Quero Iniciar Meu Processo'}
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
      <Hero />
      <OQueE />
      <AntesDepois />
      <Processo />
      <ParaQuemE />
      <ResultadosSimulados />
      {/* <InvestimentoPessoal /> — preço oculto, backup em src/_pricing-backup/investimento-branding-pessoal.tsx */}
      <Depoimento />
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
      <FormularioPessoal />
    </>
  );
}
