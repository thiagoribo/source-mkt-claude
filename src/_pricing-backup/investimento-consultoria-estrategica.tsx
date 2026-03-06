// BACKUP — Seção de Investimento: Consultoria Estratégica
// Preço: R$35.000–R$140.000 (3 tiers: Essencial, Completa, Hands-On)
//
// Para restaurar: descomente {/* <Investimento /> */} em ConsultoriaEstrategica.tsx
// (a função já está no arquivo, só comentar o uso)
// Requer imports: Button (@/components/ui/button), RevealSection, Accordion/AccordionItem/AccordionTrigger/AccordionContent

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RevealSection from "@/components/shared/RevealSection";

function Investimento() {
  const plans = [
    {
      title: "Essencial",
      subtitle: "Diagnóstico + Posicionamento + Roadmap",
      modality: "100% remota",
      duration: "60–90 dias",
      price: "R$35.000 – R$48.000",
      featured: false,
    },
    {
      title: "Completa",
      subtitle: "Diagnóstico + Posicionamento + Performance + Funil + Acompanhamento",
      modality: "Híbrida (remoto + 2 imersões)",
      duration: "90–120 dias",
      price: "R$55.000 – R$75.000",
      featured: true,
    },
    {
      title: "Hands-On",
      subtitle: "Escopo completo + Equipe SM executando implementação",
      modality: "Imersão presencial + acompanhamento",
      duration: "120–180 dias",
      price: "R$85.000 – R$140.000",
      featured: false,
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">Investimento e Escopo</h2>
            <p className="text-foreground/55 max-w-2xl text-sm leading-relaxed">
              A consultoria é montada sob medida. O investimento varia conforme escopo, modalidade e duração do projeto.
            </p>
          </div>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <RevealSection key={p.title} delay={i * 150}>
              <div
                className={`p-8 h-full flex flex-col border ${
                  p.featured
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border"
                }`}
              >
                <div className="space-y-3 flex-1">
                  <p className={`text-xs font-mono uppercase tracking-widest ${p.featured ? "opacity-60" : "text-foreground/40"}`}>
                    Consultoria
                  </p>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${p.featured ? "text-primary-foreground/70" : "text-foreground/60"}`}>
                    {p.subtitle}
                  </p>

                  <div className={`space-y-1 text-xs font-mono pt-2 ${p.featured ? "text-primary-foreground/50" : "text-foreground/40"}`}>
                    <p>Modalidade: {p.modality}</p>
                    <p>Duração: {p.duration}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 pt-6 border-t border-current/10">
                  <p className={`text-2xl font-bold font-serif ${p.featured ? "" : "text-primary"}`}>{p.price}</p>
                  <Button
                    asChild
                    className={`w-full rounded-none ${
                      p.featured
                        ? "bg-background text-primary hover:bg-background/90"
                        : ""
                    }`}
                    variant={p.featured ? "default" : "outline"}
                  >
                    <a href="#formulario">Solicitar Proposta</a>
                  </Button>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={300}>
          <p className="text-xs text-foreground/40 mt-6 font-mono">
            * Valores finais definidos após conversa de diagnóstico inicial com mapeamento de necessidades.
          </p>
        </RevealSection>

        {/* Accordion precificação */}
        <RevealSection delay={400}>
          <div className="mt-10">
            <Accordion type="single" collapsible>
              <AccordionItem value="pricing" className="border border-border px-6">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  Como é calculado o investimento?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5 text-sm text-foreground/65 leading-relaxed divide-y divide-border">
                    {[
                      { title: "Diagnóstico e Auditoria (incluído em todos)", desc: "Análise competitiva, auditoria de comunicação, pesquisa qualitativa com stakeholders.", detail: "40–80 horas | 2–3 semanas" },
                      { title: "Estratégia de Posicionamento (incluído em todos)", desc: "Plataforma de marca, proposta de valor, narrativa, territórios de comunicação.", detail: "60–100 horas | 3–4 semanas" },
                      { title: "Estratégia de Performance (opcional)", desc: "Mapeamento de jornada, KPIs, budget allocation.", detail: "+R$12.000 – R$18.000" },
                      { title: "Arquitetura de Funil (opcional)", desc: "Funil completo, estratégia de nutrição, automações.", detail: "+R$15.000 – R$22.000" },
                      { title: "Implementação Hands-On (opcional)", desc: "Identidade visual aplicada, campanhas de lançamento, setup de automações.", detail: "+R$30.000 – R$60.000" },
                    ].map((item) => (
                      <div key={item.title} className="pt-4 first:pt-0">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <p className="font-medium text-foreground">{item.title}</p>
                            <p className="mt-1">{item.desc}</p>
                          </div>
                          <p className="text-xs font-mono text-foreground/50 shrink-0 text-right">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

export default Investimento;
