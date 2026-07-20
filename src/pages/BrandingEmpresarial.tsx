import { Helmet } from "react-helmet-async";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUtmParams } from "@/hooks/useUtmParams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import { trackLead, trackFormStart } from "@/lib/analytics";
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
  ArrowRight,
  Instagram,
  Globe,
} from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";
import QualificationForm from "@/components/shared/QualificationForm";
import likeBrandCase from "@/assets/cases/branding/like-brand-p18.webp";
import petraCase from "@/assets/cases/naming/clinica-petra.webp";

/* ─── Hero + Formulário integrado ─── */
function HeroWithForm() {
  const { submitLead, isLoading } = useSubmitLead('branding-empresarial');
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
      company: formData.get('company') as string,
      website: formData.get('website') as string,
      notes: formData.get('challenge') as string,
      has_identity_visual: formData.get('has-vi') as string,
      budget: '',
      utm_source: formData.get('utm_source') as string || undefined,
      utm_medium: formData.get('utm_medium') as string || undefined,
      utm_campaign: formData.get('utm_campaign') as string || undefined,
      utm_content: formData.get('utm_content') as string || undefined,
      utm_term: formData.get('utm_term') as string || undefined,
    });
    if (result.success) {
      trackLead("branding-empresarial");
      navigate('/obrigado?service=branding-empresarial');
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
                Branding · Posicionamento Empresarial
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight">
                A marca que justifica{" "}
                <em className="not-italic text-foreground/40 font-normal">
                  preços premium
                </em>
                <br />
                <span className="text-primary">começa aqui.</span>
              </h1>

              <p className="text-base text-foreground/65 leading-relaxed max-w-xl pl-5 border-l-2 border-accent">
                Construímos a base estratégica que transforma empresas em marcas com significado, diferenciação e valor percebido no mercado.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Processo completo em dois meses",
                  "Estratégia + identidade visual + manual de marca",
                  "Participação dos decisores da empresa",
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
                <p className="font-bold text-lg">Candidatura para Branding Empresarial</p>
                <p className="text-foreground/55 text-xs mt-1 leading-relaxed">Conte sobre o negócio, o estágio do posicionamento e quem participará das decisões.</p>
              </div>
              <QualificationForm service="branding-empresarial" compact />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─── O Que É Branding — seção educacional ─── */
function OQueE() {
  const pilares = [
    {
      num: "01",
      title: "Estratégia e posicionamento",
      text: "O que sua marca representa, para quem existe e por que importa. Define território, promessa e diferenciais defensáveis.",
    },
    {
      num: "02",
      title: "Identidade e expressão",
      text: "Como a marca se apresenta ao mundo — logotipo, paleta, tipografia, tom de voz e territórios visuais coerentes.",
    },
    {
      num: "03",
      title: "Direção e aplicação",
      text: "O manual que orienta cada decisão de comunicação para manter a marca reconhecível em todos os pontos de contato.",
    },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-5xl">
        {/* Definição em destaque */}
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-start mb-14 md:mb-20">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">
                O que é branding
              </p>
              <blockquote className="text-2xl md:text-3xl font-bold font-serif leading-snug text-foreground/85">
                "Branding é o<br /><span className="text-primary italic">posicionamento</span> de uma marca<br />posto em prática."
              </blockquote>
              <div className="h-px w-12 bg-accent mt-6" />
            </div>

            <div className="space-y-5 text-foreground/70 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground font-semibold">Branding empresarial</strong> é o processo de construir o posicionamento estratégico da sua marca — não apenas o que você vende, mas o que você representa no mercado, para quem, e por quê.
              </p>
              <p>
                É onde nascem propósito, visão, narrativa e sistema visual — os pilares que sustentam cada decisão de comunicação da empresa. Sem esse posicionamento, cada peça, campanha e canal comunica algo diferente e a marca perde valor percebido.
              </p>
              <p className="text-foreground/55 text-sm border-l-2 border-accent pl-4 italic">
                Branding não é redesign de logo. É o trabalho estratégico que define como sua empresa se posiciona, comunica e compete no mercado.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Três pilares */}
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

/* ─── Contraste editorial — fundo navy para quebrar ritmo ─── */
function Contraste() {
  const antes = [
    "Comunicação desconectada — cada peça parece vir de uma empresa diferente",
    "Posicionamento indefinido: o mercado não sabe o que diferencia a marca",
    "Competição por preço porque o valor percebido não sustenta margens",
    "Decisões de comunicação tomadas caso a caso, sem critério de marca",
  ];
  const depois = [
    "Tom de voz consistente e alinhado com os valores da empresa",
    "Posicionamento claro que destaca o negócio no mercado certo",
    "Justificativa sólida para preços premium, com valor percebido real",
    "Diretrizes que orientam cada decisão de comunicação com clareza",
  ];

  return (
    <section className="section-spacing bg-primary text-primary-foreground relative overflow-hidden">
      {/* Ghost typographic element */}
      <span
        aria-hidden
        className="absolute -top-6 -right-4 md:top-8 md:right-16 font-bold font-serif leading-none select-none pointer-events-none text-primary-foreground/[0.04]"
        style={{ fontSize: "clamp(8rem, 22vw, 20rem)", letterSpacing: "-0.05em" }}
      >
        ↔
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary-foreground/40 mb-4">
              O antes e o depois
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              O que muda quando uma marca<br />
              <span className="text-accent italic font-serif">tem estratégia</span> por trás.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-0">
            {/* Antes */}
            <div className="md:pr-10 lg:pr-16">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-primary-foreground/10">
                <span className="w-2 h-2 border border-primary-foreground/30 rotate-45 inline-block flex-shrink-0" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary-foreground/35">
                  Sem estratégia de marca
                </p>
              </div>
              <div className="space-y-5">
                {antes.map((item, i) => (
                  <div key={i} className="flex gap-4 items-baseline">
                    <span className="text-[10px] font-mono text-primary-foreground/20 flex-shrink-0 pt-px">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-primary-foreground/40 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Depois — coluna com border-l accent */}
            <div className="md:pl-10 lg:pl-16 md:border-l md:border-primary-foreground/10">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-accent/30">
                <span className="w-2 h-2 bg-accent inline-block flex-shrink-0" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
                  Com branding Source
                </p>
              </div>
              <div className="space-y-5">
                {depois.map((item, i) => (
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
    { num: "01", icon: Search, title: "Diagnóstico e Imersão", text: "Entendemos o mercado, o negócio e oportunidades de posicionamento", duration: "Semana 1" },
    { num: "02", icon: Layers, title: "Estruturação Estratégica", text: "Propósito, missão, visão, valores, arquétipo e atributos de marca", duration: "Semanas 2–3" },
    { num: "03", icon: Target, title: "Posicionamento e Diferenciação", text: "Proposta de valor, narrativa e promessa da marca no mercado", duration: "Semana 4" },
    { num: "04", icon: MessageSquare, title: "Tom de Voz e Personalidade", text: "Como a marca fala, se expressa e se relaciona com o público", duration: "Semana 5" },
    { num: "05", icon: Palette, title: "Identidade Visual", text: "Sistema visual que traduz o posicionamento em logotipo, cores, tipografia e elementos de marca", duration: "Semanas 6–7" },
    { num: "06", icon: BookOpen, title: "Manual de Marca", text: "Documento final com a estratégia, a identidade e as diretrizes de aplicação", duration: "Semana 8" },
  ];

  return (
    <section className="section-spacing bg-secondary">
      <div className="container-sm max-w-4xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Nosso Processo de Branding</h2>
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

/* ─── Entregáveis — lista com tracejados ─── */
function Entregaveis() {
  const items = [
    { icon: Award, title: "Plataforma de Marca Completa" },
    { icon: Compass, title: "Propósito, Missão, Visão e Valores" },
    { icon: Target, title: "Arquétipo e Personalidade de Marca" },
    { icon: Layers, title: "Posicionamento e Proposta de Valor" },
    { icon: Volume2, title: "Tom de Voz e Territórios de Comunicação" },
    { icon: Palette, title: "Sistema de Identidade Visual Completo" },
    { icon: FileText, title: "Manual de Marca Estratégico e Visual" },
  ];

  return (
    <section className="section-spacing bg-background">
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

/* ─── Cases Branding ─── */
function CasesBranding() {
  const cases = [
    {
      img: likeBrandCase,
      name: "LIKE. Brand",
      challenge: "Marca comunicando infantilidade, operando no atacado e sem posicionamento premium definido",
      actions: [
        "Reestruturação de nome e posicionamento de marca",
        "Elevação para mercado premium B2C",
        "Criação de identidade e narrativa consistente",
      ],
      result: "420% de crescimento em faturamento em 6 meses",
      links: {
        instagram: "https://www.instagram.com/likebrand.oficial/",
        site: "https://www.likeadoll.com.br/",
      },
    },
    {
      img: petraCase,
      name: "Clínica Petra",
      challenge: "Clínica integrada nascente sem nome, identidade visual ou posicionamento definido",
      actions: [
        "Criação de naming e identidade visual completa",
        "Posicionamento e narrativa de marca premium",
        "Estruturação de marketing e scripts comerciais",
      ],
      result: "Clínica nasceu pronta para ser referência no segmento integrado",
      links: {
        instagram: "https://www.instagram.com/clinica.petra/",
      },
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Empresas que Transformamos</h2>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <RevealSection key={c.name} delay={i * 150}>
              <div className="group border border-border overflow-hidden h-full flex flex-col hover:border-primary/40 transition-colors">
                <div className="aspect-[16/9] overflow-hidden bg-secondary">
                  <img
                    src={c.img}
                    alt={c.name}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 inline-block">
                    Branding Empresarial
                  </span>
                  <h3 className="font-bold text-lg mb-2">{c.name}</h3>
                  <p className="text-foreground/50 text-sm mb-4">{c.challenge}</p>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {c.actions.map((a) => (
                      <li key={a} className="text-foreground/65 text-xs flex items-start gap-2">
                        <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-primary font-semibold text-sm">{c.result}</p>
                    <div className="flex items-center gap-3">
                      {c.links.instagram && (
                        <a href={c.links.instagram} target="_blank" rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors" aria-label="Instagram">
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {c.links.site && (
                        <a href={c.links.site} target="_blank" rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-primary transition-colors" aria-label="Site">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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

/* ─── Comparação — callout editorial ─── */
function Comparacao() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-3xl">
        <RevealSection>
          <div className="pl-6 border-l-2 border-accent space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">Compromisso compartilhado</p>
            <h3 className="text-xl font-bold">O projeto exige a presença de quem decide.</h3>
            <div className="space-y-3 text-sm text-foreground/65 leading-relaxed">
              <p>
                Ao longo de dois meses, a Source conduz imersões, apresenta caminhos e estrutura a marca. A liderança traz contexto, participa das decisões e valida as entregas dentro dos prazos.
              </p>
              <p>
                Para negócios em desenvolvimento, é necessário já ter oferta, público, modelo de negócio e decisão real de lançamento definidos.
              </p>
            </div>
            <a href="#formulario" className="text-primary text-sm font-medium hover:underline inline-block">Candidatar o projeto →</a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}


/* ─── Page ─── */
export default function BrandingEmpresarial() {
  return (
    <>
      <Helmet>
        <title>Branding e Posicionamento Empresarial | Source</title>
        <meta name="description" content="Branding empresarial e posicionamento estratégico de marca em dois meses: identidade visual, tom de voz e manual completo para empresas que querem vender pelo valor que entregam." />
        <link rel="canonical" href="https://sourcemkt.com.br/branding-empresarial" />
        <meta property="og:title" content="Branding e Posicionamento Empresarial | Source" />
        <meta property="og:description" content="Branding empresarial e posicionamento estratégico de marca — identidade visual, tom de voz e manual completo em dois meses." />
        <meta property="og:url" content="https://sourcemkt.com.br/branding-empresarial" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Branding Empresarial Estratégico",
          "description": "Transforme sua empresa em uma marca reconhecida. Posicionamento, proposta de valor, tom de voz e manual de marca completo para negócios que querem vender pelo valor que entregam.",
          "url": "https://sourcemkt.com.br/branding-empresarial",
          "provider": { "@type": "Organization", "name": "Source", "url": "https://sourcemkt.com.br" },
          "areaServed": { "@type": "Country", "name": "Brazil" },
          "serviceType": "Branding Empresarial"
        })}</script>
      </Helmet>
      <HeroWithForm />
      <OQueE />
      <Contraste />
      <Processo />
      <Entregaveis />
      <CasesBranding />
      <Comparacao />
    </>
  );
}
