import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Building2, Check, Sparkles } from "lucide-react";
import QualificationForm from "@/components/shared/QualificationForm";
import logoHeader from "@/assets/logo-header.svg";

export default function PosicionamentoDeMarca() {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Projeto de Branding para Empresas e Especialistas | Source</title>
        <meta name="description" content="Estratégia, identidade visual e manual de marca em um projeto de branding de dois meses para empresas e especialistas preparados para avançar." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Projeto de Branding | Source" />
        <meta property="og:description" content="Construa a estratégia e a identidade que vão orientar sua marca." />
        <meta property="og:url" content="https://sourcemkt.com.br/posicionamento-de-marca" />
      </Helmet>

      <header className="bg-brand-navy">
        <div className="container-sm h-[72px] flex items-center justify-between">
          <Link to="/" aria-label="Voltar para a home"><img src={logoHeader} alt="Source" className="h-10 w-auto" /></Link>
          <a href="#candidatura" className="h-10 px-5 inline-flex items-center bg-brand-offwhite text-brand-navy text-xs font-semibold tracking-widest uppercase">Candidatar meu projeto</a>
        </div>
      </header>

      <section className="section-spacing">
        <div className="container-sm max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="text-xs font-mono tracking-[0.25em] uppercase text-primary mb-5">Branding Source</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6">Sua comunicação só funciona quando a marca sabe quem é.</h1>
            <p className="text-lg text-foreground/65 leading-relaxed max-w-2xl">Em dois meses, construímos estratégia, estrutura de marca, identidade visual e manual para orientar as decisões que vêm depois.</p>
            <a href="#candidatura" className="mt-8 inline-flex h-12 items-center bg-primary text-primary-foreground px-7 text-sm font-semibold">Candidatar meu projeto</a>
          </div>
          <div className="bg-secondary border border-border p-7">
            <p className="font-bold mb-5">O projeto inclui</p>
            <ul className="space-y-4">{["Imersão e estratégia de marca", "Posicionamento, narrativa e tom de voz", "Sistema completo de identidade visual", "Manual estratégico e visual"].map(item => <li key={item} className="flex gap-3 text-sm text-foreground/70"><Check className="h-4 w-4 text-primary mt-0.5" />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-secondary">
        <div className="container-sm max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12"><p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">Dois caminhos</p><h2 className="text-3xl md:text-4xl font-bold">A estratégia começa pela realidade da marca.</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/branding-empresarial" className="bg-background border border-border p-8 hover:border-primary transition-colors"><Building2 className="h-7 w-7 text-primary mb-5" /><h3 className="text-xl font-bold mb-3">Branding Empresarial</h3><p className="text-sm text-foreground/60">Para empresas em operação ou negócios em desenvolvimento com oferta, público e decisão definidos.</p></Link>
            <Link to="/branding-pessoal" className="bg-background border border-border p-8 hover:border-primary transition-colors"><Sparkles className="h-7 w-7 text-primary mb-5" /><h3 className="text-xl font-bold mb-3">Branding Pessoal</h3><p className="text-sm text-foreground/60">Para fundadores, executivos, consultores e especialistas com atuação real.</p></Link>
          </div>
        </div>
      </section>

      <section id="candidatura" className="section-spacing scroll-mt-8">
        <div className="container-sm max-w-3xl">
          <div className="mb-10"><p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">Candidatura</p><h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos avaliar se este é o momento certo.</h2><p className="text-foreground/60">A Source analisa maturidade, escopo, participação dos decisores e capacidade de investimento antes de convidar para uma conversa.</p></div>
          <div className="border border-border bg-secondary p-6 md:p-8"><QualificationForm service="candidatura-geral" /></div>
        </div>
      </section>
    </main>
  );
}
