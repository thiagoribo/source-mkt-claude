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
  ArrowRight,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ServiceMockupCard from "@/components/shared/ServiceMockupCard";
import ComparisonTable from "@/components/shared/ComparisonTable";
import { brandingPessoalResults } from "@/data/serviceMockups";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { useTestimonialsByService } from "@/hooks/queries/useTestimonials";

// Fotos dos clientes - Branding Pessoal (fallback images)
import sabrinaKeller from "@/assets/clientes/sabrina-keller.jpeg";
import giuliaCloss from "@/assets/clientes/giulia-closs.jpeg";
import andressaFraga from "@/assets/clientes/andressa-fraga.png";
import anaPriscia from "@/assets/clientes/ana-priscia.jpeg";
import indyZimmer from "@/assets/clientes/indy-zimmer.jpg";
import thatianeOliveira from "@/assets/clientes/thatiane-oliveira.jpg";
import stephanytizziani from "@/assets/clientes/stephany-tizziani.jpg";

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
              BP
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
                Você já tem o conteúdo.{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  Falta a marca
                </em>
                <br />
                <span className="text-primary">que o comunica.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Construa autoridade autêntica e torne-se referência no seu segmento com posicionamento estratégico e identidade visual consistente.
              </p>

              <p className="text-sm text-foreground/50 max-w-lg leading-relaxed">
                Sua marca pessoal é um ativo de negócio, não apenas presença digital. Tratamos ela com a mesma profundidade estratégica que uma marca corporativa.
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Quero Construir Minha Autoridade</a>
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
    { num: "01", icon: User, title: "Imersão na História e Essência", text: "Entendemos trajetória, valores, diferenciais e impacto desejado", duration: "1 semana" },
    { num: "02", icon: Search, title: "Mapeamento de Posicionamento", text: "Definimos como sua marca deve se comunicar e posicionar no mercado", duration: "2 semanas" },
    { num: "03", icon: Palette, title: "Identidade Visual Pessoal", text: "Desenvolvemos elementos visuais que expressam sua essência e estilo", duration: "3 semanas" },
    { num: "04", icon: MessageSquare, title: "Narrativa e Direcionamento", text: "Criamos pilares, frases e abordagens para canais digitais", duration: "1 semana" },
    { num: "05", icon: FileText, title: "Guia de Marca Pessoal", text: "Material completo com identidade e direção estratégica aplicável", duration: "Entrega final" },
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
      </div>
    </section>
  );
}

/* ─── Resultados Simulados ─── */
function ResultadosSimulados() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Resultados Simulados</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Cases fictícios para visualizar o tipo de impacto esperado em branding pessoal.
            </p>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {brandingPessoalResults.map((item, i) => (
            <RevealSection key={item.title} delay={i * 100}>
              <ServiceMockupCard
                title={item.title}
                subtitle={item.subtitle}
                tag={item.tag}
                evidence={item.evidence}
                imageSrc={item.imageSrc}
                ratio={item.ratio}
                theme={item.theme}
              />
            </RevealSection>
          ))}
        </div>
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

/* ─── Formulário ─── */
function FormularioPessoal() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section id="formulario" className="section-spacing bg-secondary">
        <div className="container-sm max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Solicitação Enviada!</h2>
          <p className="text-foreground/60">Entraremos em contato em até 48h úteis.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-spacing bg-secondary">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Orçamento</p>
            <h2 className="text-3xl md:text-4xl font-bold">Vamos Construir Sua Autoridade?</h2>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-6 bg-background border border-border p-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" required placeholder="Seu nome" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required placeholder="seu@email.com" className="rounded-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" required placeholder="(11) 99999-9999" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área de atuação *</Label>
                <Input id="area" required placeholder="Consultoria, Medicina, Tecnologia..." className="rounded-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">Seu maior desafio com marca pessoal *</Label>
              <Textarea id="challenge" required placeholder="Descreva brevemente..." rows={3} className="rounded-none" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="presence">Presença digital atual</Label>
                <select
                  id="presence"
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="nenhuma">Não tenho presença digital</option>
                  <option value="basica">Básica (perfis sem estratégia)</option>
                  <option value="ativa">Ativa mas inconsistente</option>
                  <option value="forte">Forte, quero profissionalizar</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Faixa de investimento</Label>
                <select
                  id="budget"
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="18k-25k">R$18.000 - R$25.000</option>
                  <option value="25k-35k">R$25.000 - R$35.000</option>
                  <option value="35k+">Acima de R$35.000</option>
                  <option value="flexivel">Flexível</option>
                </select>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-none text-base h-12">
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
      <ResultadosSimulados />
      <InvestimentoPessoal />
      <Depoimento />
      <FormularioPessoal />
    </>
  );
}
