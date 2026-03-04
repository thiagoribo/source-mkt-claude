import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Instagram, Linkedin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import RevealSection from "@/components/shared/RevealSection";
import { getCaseById } from "@/data/casesData";

export default function CaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const caseData = getCaseById(slug ?? "");

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-serif mb-4">Case não encontrado</h1>
          <Link to="/quem-somos#portfolio" className="text-primary hover:underline">
            Ver todos os cases
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{caseData.client} — Case | Source Marketing</title>
        <meta name="description" content={caseData.tagline} />
      </Helmet>

      {/* ─── Hero ─── */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container-sm max-w-4xl">
          <RevealSection>
            <Link
              to="/quem-somos#portfolio"
              className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm font-mono uppercase tracking-widest mb-10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Todos os cases
            </Link>
            <span className="block text-xs font-mono uppercase tracking-widest text-accent mb-4">
              {caseData.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-bold leading-tight mb-6">
              {caseData.headline}
            </h1>
            <p className="text-primary-foreground/60 text-lg font-medium">
              {caseData.client}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── Tagline ─── */}
      <section className="py-12 border-b border-border/40 bg-background">
        <div className="container-sm max-w-4xl">
          <RevealSection>
            <p className="text-xl md:text-2xl font-serif italic text-foreground/70 leading-relaxed">
              "{caseData.tagline}"
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── Storytelling ─── */}
      <section className="section-spacing bg-background">
        <div className="container-sm max-w-3xl">
          <div className="space-y-6">
            {caseData.storytelling.map((paragraph, i) => (
              <RevealSection key={i} delay={i * 60}>
                <p className="text-foreground/80 text-lg leading-relaxed">{paragraph}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Results ─── */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-sm max-w-4xl">
          <RevealSection>
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent mb-12">
              Resultados
            </h2>
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-10">
            {caseData.results.map((r, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="border-t border-primary-foreground/20 pt-6">
                  <p className="text-5xl md:text-6xl font-serif font-bold text-accent leading-none mb-3">
                    {r.metric}
                  </p>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">
                    {r.label}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quote ─── */}
      {caseData.quote && (
        <section className="section-spacing bg-background">
          <div className="container-sm max-w-3xl">
            <RevealSection>
              <blockquote className="border-l-4 border-accent pl-8">
                <p className="text-xl md:text-2xl font-serif italic text-foreground/80 leading-relaxed mb-6">
                  "{caseData.quote.text}"
                </p>
                <footer>
                  <p className="font-semibold text-foreground">{caseData.quote.author}</p>
                  <p className="text-sm text-foreground/50">{caseData.quote.role}</p>
                </footer>
              </blockquote>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ─── Links + CTA ─── */}
      <section className="py-20 bg-background border-t border-border/30">
        <div className="container-sm max-w-4xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/40">
                Acompanhe o cliente
              </p>
              <div className="flex items-center gap-4">
                {caseData.links.instagram && (
                  <a
                    href={caseData.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                )}
                {caseData.links.linkedin && (
                  <a
                    href={caseData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <Button
              size="lg"
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10 h-13 font-semibold"
              asChild
            >
              <a href="https://wa.me/5511937292921" target="_blank" rel="noopener noreferrer">
                Quero uma transformação assim →
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
