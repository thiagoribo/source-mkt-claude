import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubmitLead } from "@/hooks/useSubmitLead";
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
  ArrowRight,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import ComparisonTable from "@/components/shared/ComparisonTable";
import { namingScorecard } from "@/data/serviceMockups";
import likeBrand from "@/assets/cases/naming/like-brand.png";
import clinicaPetra from "@/assets/cases/naming/clinica-petra.png";
import passeiPonto from "@/assets/cases/naming/passei-ponto.png";

/* ─── Hero ─── */
function Hero() {
  // Example name fragments shown as decoration
  const fragments = ["Verb", "Apex", "Nori", "Kado", "Lúme", "Vesta", "Oryn", "Kaelo"];

  return (
    <section className="section-spacing bg-background overflow-hidden relative">
      <div className="container-sm max-w-6xl">
        <RevealSection>
          <div className="relative">
            {/* Floating name fragments — decorative */}
            <div
              aria-hidden
              className="absolute right-0 top-0 w-56 space-y-1.5 hidden lg:block select-none pointer-events-none"
            >
              {fragments.map((frag, i) => (
                <div
                  key={frag}
                  className="font-mono text-sm border border-border/40 px-3 py-1.5 text-foreground/20 text-right"
                  style={{ marginLeft: `${(i % 3) * 12}px`, opacity: 0.3 - i * 0.025 }}
                >
                  {frag}
                </div>
              ))}
            </div>

            <div className="relative max-w-3xl space-y-8">
              {/* Service label */}
              <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Naming Estratégico
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
                O nome certo{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  não aparece
                </em>
                <br />
                <span className="text-primary">por acaso.</span>
              </h1>

              <p className="text-lg text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Criamos nomes únicos, memoráveis e estrategicamente construídos — com disponibilidade legal e digital verificada.
              </p>

              <p className="text-sm text-foreground/50 max-w-lg leading-relaxed">
                Um bom nome comunica valor, é fácil de lembrar e cresce com a marca. Trabalhamos desde empresa até produto, submarca e linha de serviço.
              </p>

              <Button size="lg" className="rounded-none text-base px-8 h-12" asChild>
                <a href="#formulario">Solicitar Orçamento</a>
              </Button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Antes e Depois — tabela comparativa ─── */
const namingRows = [
  { sem: "Nome genérico que não diferencia no mercado", com: "Nome único, posicionado e memorável" },
  { sem: "Conflitos de marca registrada ou domínio", com: "Disponibilidade legal e digital verificada" },
  { sem: "Difícil de pronunciar, soletrar ou lembrar", com: "Fonética simples e retenção imediata" },
  { sem: "Nome que limita o crescimento da empresa", com: "Naming que escala junto com a marca" },
  { sem: "Sem conexão com o propósito ou posicionamento", com: "Alinhamento estratégico com o DNA da marca" },
];

function AntesDepois() {
  return (
    <ComparisonTable
      title="Antes e Depois"
      rows={namingRows}
      beforeLabel="Sem Naming Estratégico"
      afterLabel="Com Naming SM Agency"
      className="bg-secondary"
    />
  );
}

/* ─── Processo — numerado, editorial ─── */
function Processo() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Briefing e Imersão",
      text: "Mapeamos o negócio, mercado, público e os atributos que o nome precisa comunicar e evocar.",
    },
    {
      num: "02",
      icon: Lightbulb,
      title: "Geração Criativa",
      text: "Desenvolvemos dezenas de opções com abordagens distintas: abstratas, descritivas, metafóricas e compostas.",
    },
    {
      num: "03",
      icon: Filter,
      title: "Curadoria e Filtro",
      text: "Selecionamos as melhores opções por critérios estratégicos: fonética, semântica, memorabilidade e posicionamento.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Verificação Legal e Digital",
      text: "Checamos disponibilidade de registro de marca no INPI, domínios e handles nas principais redes sociais.",
    },
    {
      num: "05",
      icon: FileText,
      title: "Apresentação Final",
      text: "Entregamos os nomes finalistas com análise estratégica, fonética e ranking de recomendação.",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Como Funciona</h2>
        </RevealSection>

        <div className="divide-y divide-border">
          {steps.map((s, i) => (
            <RevealSection key={s.title} delay={i * 80}>
              <div className="group flex gap-6 py-8 items-start cursor-default hover:bg-secondary/50 transition-colors -mx-6 px-6">
                <span
                  className="font-mono text-4xl font-bold leading-none flex-shrink-0 w-14 text-right pt-1"
                  style={{ color: "hsl(var(--foreground) / 0.08)" }}
                >
                  {s.num}
                </span>
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-lg leading-snug">{s.title}</h3>
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

/* ─── Entregáveis — lista com tracejados ─── */
function Entregaveis() {
  const items = [
    { icon: Sparkles, title: "3 a 5 opções de nomes finalistas" },
    { icon: FileText, title: "Justificativa estratégica de cada nome" },
    { icon: Globe, title: "Verificação de domínios disponíveis" },
    { icon: ShieldCheck, title: "Pesquisa prévia no INPI (registro de marca)" },
    { icon: Lightbulb, title: "Análise fonética e semântica completa" },
    { icon: Zap, title: "Ranking e recomendação final" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">O Que Você Recebe</h2>
        </RevealSection>

        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 60}>
              <div className="flex items-center gap-4 py-5">
                <item.icon className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="font-semibold text-base">{item.title}</span>
                <div className="flex-1 border-t border-dashed border-border/50 mx-2" />
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Scorecard — matriz de avaliação editorial ─── */
function ScorecardNaming() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <div className="mb-10 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Processo</p>
            <h2 className="text-3xl md:text-4xl font-bold">Matriz de Avaliação</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Exemplo fictício da matriz que usamos para priorizar e ranquear os nomes finalistas.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_1fr] border-b border-border bg-secondary/60 px-5 py-3 gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/40">Critério</span>
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/40 text-right">Nota</span>
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/40">Avaliação</span>
            </div>

            {namingScorecard.map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-[1fr_80px_1fr] px-5 py-4 gap-4 border-b border-border last:border-b-0 items-center hover:bg-secondary/30 transition-colors"
              >
                <span className="text-sm text-foreground/70">{item.label}</span>
                <span className="text-sm font-bold text-primary text-right font-mono">{item.value}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary/70 transition-all duration-700"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-foreground/30 font-mono w-8 text-right">{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Cases Reais ─── */
const namingRealCases = [
  {
    num: "01",
    img: clinicaPetra,
    sector: "Saúde & Estética",
    name: "Clínica Petra",
    description: "Nome estratégico que posiciona sofisticação e cuidado — com verificação INPI e disponibilidade digital.",
  },
  {
    num: "02",
    img: likeBrand,
    sector: "Moda & Lifestyle",
    name: "LIKE. BRAND",
    description: "Naming contemporâneo e memorável construído para se destacar em mercados de moda e identidade de estilo.",
  },
  {
    num: "03",
    img: passeiPonto,
    sector: "Educação & Mobilidade",
    name: "Passei e Ponto",
    description: "Nome com fonética assertiva e posicionamento de resultado — direto, memorável e diferenciado no segmento.",
  },
];

function CasosReaisNaming() {
  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Cases Reais</h2>
            <p className="text-foreground/55 text-sm max-w-xl">
              Nomes criados pela SM Agency — estratégicos, verificados e construídos para durar.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {namingRealCases.map((caso, i) => (
            <RevealSection key={caso.name} delay={i * 100}>
              <div className="group border border-border hover:border-primary/40 transition-colors duration-150 bg-background overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={caso.img}
                    alt={caso.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-2 right-3 font-mono font-bold text-[64px] leading-none select-none pointer-events-none text-white/10"
                  >
                    {caso.num}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">
                    {caso.sector}
                  </p>
                  <h3 className="text-xl font-bold font-serif leading-tight">
                    {caso.name}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {caso.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <div className="h-px w-6 bg-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary/70">
                      Naming Estratégico
                    </span>
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

/* ─── Investimento — secão escura ─── */
function Investimento() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <span
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 font-bold font-serif leading-none select-none pointer-events-none hidden lg:block"
        style={{ opacity: 0.05, fontSize: "160px" }}
      >
        Nm
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="space-y-4">
              <p className="text-xs font-mono tracking-widest uppercase opacity-50">Investimento</p>
              <p className="text-6xl md:text-7xl font-bold font-serif leading-none">
                R$5.000
              </p>
              <p className="text-primary-foreground/50 text-sm">
                A partir de — Prazo: 2 a 4 semanas
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

/* ─── Formulário ─── */
function Formulario() {
  const [submitted, setSubmitted] = useState(false);
  const { submitLead, isLoading } = useSubmitLead('naming');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const result = await submitLead({
      full_name: formData.get('name') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('phone') as string,
      naming_type: formData.get('type') as string,
      notes: formData.get('details') as string,
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
          <p className="text-foreground/60">Entraremos em contato em até 48h úteis.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-spacing bg-background">
      <div className="container-sm max-w-2xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">Orçamento</p>
            <h2 className="text-3xl md:text-4xl font-bold">Precisa de um Nome Estratégico?</h2>
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
                <Label htmlFor="name">Nome *</Label>
                <Input id="name" name="name" required placeholder="Seu nome" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="seu@empresa.com" className="rounded-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" name="phone" required placeholder="(11) 99999-9999" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de naming *</Label>
                <select
                  id="type"
                  name="type"
                  required
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione</option>
                  <option value="Nome de empresa">Nome de empresa</option>
                  <option value="Nome de produto/serviço">Nome de produto/serviço</option>
                  <option value="Submarca ou linha">Submarca ou linha</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Descreva brevemente o projeto *</Label>
              <Textarea
                id="details"
                name="details"
                required
                placeholder="Qual é o negócio, público-alvo e o que o nome precisa comunicar..."
                rows={3}
                className="rounded-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-none text-base h-12" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Solicitar Orçamento'}
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
      <ScorecardNaming />
      <CasosReaisNaming />
      <Investimento />
      <Formulario />
    </>
  );
}
