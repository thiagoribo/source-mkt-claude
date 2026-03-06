// BACKUP — Seção de Investimento: Naming
// Preço: R$5.000 | Prazo: 2 a 4 semanas
//
// Para restaurar: descomente {/* <Investimento /> */} em Naming.tsx
// (a função já está no arquivo, só comentar o uso)

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RevealSection from "@/components/shared/RevealSection";

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

export default Investimento;
