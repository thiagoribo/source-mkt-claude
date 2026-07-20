import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealSection from "@/components/shared/RevealSection";
import { casesData } from "@/data/casesData";

export default function Cases() {
  const featured = casesData[0];
  const others = casesData.slice(1);

  return (
    <>
      <Helmet>
        <title>Cases | Source — Transformações reais de branding e posicionamento</title>
        <meta
          name="description"
          content="Cases da Source: LIKE. Brand, Clínica Petra e Start Imobiliário. Como estratégia, identidade e aplicação transformaram cada negócio."
        />
        <link rel="canonical" href="https://sourcemkt.com.br/cases" />
        <meta property="og:title" content="Cases | Source" />
        <meta
          property="og:description"
          content="Transformações reais em branding, posicionamento e aplicação de marca."
        />
        <meta property="og:url" content="https://sourcemkt.com.br/cases" />
      </Helmet>

      {/* ─── Hero ─── */}
      <section className="section-spacing bg-background">
        <div className="container-sm max-w-5xl">
          <RevealSection>
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-14 items-end">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">
                  Cases
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.05] tracking-tight">
                  Transformações<br />
                  <span className="text-primary italic font-serif">reais em números.</span>
                </h1>
              </div>
              <p className="text-foreground/65 leading-relaxed md:pb-2">
                Cada case abaixo é um projeto em que a Source construiu — ou reconstruiu — a base estratégica e visual de um negócio. Clique para ler a narrativa completa de cada transformação.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── Grid de cases ─── */}
      <section className="pb-20 md:pb-28 bg-background">
        <div className="container-sm max-w-5xl">
          {/* Case destaque */}
          {featured && (
            <RevealSection>
              <Link
                to={`/cases/${featured.id}`}
                className="group block bg-primary text-primary-foreground mb-4 md:mb-6 relative overflow-hidden hover:shadow-[8px_8px_0_0_rgba(220,180,100,0.2)] transition-shadow duration-500"
              >
                <span
                  aria-hidden
                  className="absolute top-4 right-4 md:top-8 md:right-10 font-bold font-serif leading-none text-primary-foreground/[0.06] select-none pointer-events-none"
                  style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
                >
                  {featured.results[0]?.metric}
                </span>

                <div className="relative p-8 md:p-12 lg:p-14">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary-foreground/35 mb-5 block">
                    {featured.category}
                  </span>

                  <p className="text-xl md:text-2xl lg:text-3xl font-bold font-serif max-w-xl mb-10 leading-snug">
                    {featured.tagline}
                  </p>

                  <div className="flex flex-wrap items-end gap-8 md:gap-12 pt-8 border-t border-primary-foreground/10">
                    {featured.results.map((r) => (
                      <div key={r.label}>
                        <p className="text-2xl md:text-3xl font-bold font-serif text-accent">
                          {r.metric}
                        </p>
                        <p className="text-[11px] text-primary-foreground/35 mt-0.5 font-mono uppercase tracking-wide">
                          {r.label}
                        </p>
                      </div>
                    ))}
                    <div className="ml-auto flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all duration-300">
                      <span className="hidden sm:inline">{featured.client}</span>
                      <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </RevealSection>
          )}

          {/* Outros cases */}
          {others.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {others.map((c, i) => (
                <RevealSection key={c.id} delay={i * 100}>
                  <Link
                    to={`/cases/${c.id}`}
                    className="group flex flex-col h-full border border-border/50 hover:border-primary/40 transition-colors duration-300"
                  >
                    <div className="flex-1 bg-secondary/50 flex flex-col justify-between p-7 min-h-[220px]">
                      <span className="text-primary text-[10px] font-mono font-semibold tracking-widest uppercase">
                        {c.category}
                      </span>
                      <p className="text-lg font-semibold text-foreground leading-snug mt-6">
                        {c.tagline}
                      </p>
                    </div>

                    <div className="px-7 py-5 border-t border-border/30 grid grid-cols-3 gap-4">
                      {c.results.slice(0, 3).map((r) => (
                        <div key={r.label}>
                          <p className="text-base md:text-lg font-bold font-serif text-primary leading-none">
                            {r.metric}
                          </p>
                          <p className="text-[10px] text-foreground/40 mt-1 font-mono uppercase tracking-wide leading-tight line-clamp-2">
                            {r.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="px-7 py-4 flex items-center justify-between border-t border-border/30">
                      <h3 className="font-medium text-sm text-foreground/70">{c.client}</h3>
                      <span className="text-primary text-xs font-medium group-hover:underline">
                        Ver case completo →
                      </span>
                    </div>
                  </Link>
                </RevealSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-spacing bg-secondary">
        <div className="container-sm max-w-4xl">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-lg">
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                  Próximo case
                </p>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                  Quero uma transformação assim.
                </h2>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Candidaturas analisadas em 48h úteis. Projetos completos em dois meses.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="rounded-none text-base px-8 bg-primary hover:shadow-lg transition-shadow min-h-[52px] flex-shrink-0"
              >
                <Link to="/#candidatura" className="flex items-center gap-2">
                  Candidatar meu projeto <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
