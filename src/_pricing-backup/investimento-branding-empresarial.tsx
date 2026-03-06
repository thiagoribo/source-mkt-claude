// BACKUP — Seção de Investimento: Branding Empresarial
// Preço: R$25.000 | Duração: 6–8 semanas
//
// Para restaurar: descomente {/* <InvestimentoBranding /> */} em BrandingEmpresarial.tsx
// (a função já está no arquivo, só comentar o uso)

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";

function InvestimentoBranding() {
  const factors = [
    "Complexidade do mercado e da competição",
    "Necessidade de pesquisa primária com stakeholders",
    "Arquitetura de marca (única vs. portfólio)",
    "Inclusão de identidade visual integrada",
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <span
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 font-bold font-serif leading-none select-none pointer-events-none hidden lg:block"
        style={{ opacity: 0.05, fontSize: "160px" }}
      >
        25k
      </span>

      <div className="container-sm max-w-5xl relative">
        <RevealSection>
          <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-end">
            <div className="space-y-6">
              <p className="text-xs font-mono tracking-widest uppercase opacity-50">Investimento</p>
              <p className="text-6xl md:text-7xl font-bold font-serif leading-none">R$25.000</p>
              <p className="text-primary-foreground/50 text-sm">A partir de — Duração: 6–8 semanas</p>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-mono uppercase tracking-widest opacity-50">O que influencia o valor</p>
                <div className="divide-y divide-primary-foreground/10">
                  {factors.map((f) => (
                    <div key={f} className="flex items-start gap-3 py-3">
                      <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                      <span className="text-sm text-primary-foreground/70">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="rounded-none text-base px-8 h-12 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors self-end"
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

export default InvestimentoBranding;
