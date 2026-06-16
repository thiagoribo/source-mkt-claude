import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { trackConversion } from "@/lib/analytics";
import type { FormSource } from "@/lib/analytics";

const SERVICE_LABELS: Partial<Record<FormSource, string>> = {
  "consultoria-estrategica": "Consultoria Estratégica",
  "branding-empresarial": "Branding Empresarial",
  "branding-pessoal": "Branding Pessoal",
  "identidade-visual": "Identidade Visual",
  "gestao-redes-sociais": "Gestão de Redes Sociais",
  "naming": "Naming Estratégico",
};

export default function Obrigado() {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") as FormSource | null;
  const serviceLabel = service ? SERVICE_LABELS[service] : null;

  useEffect(() => {
    trackConversion(service ?? undefined);
  }, []);

  return (
    <>
      <Helmet>
        <title>Solicitação Enviada — SM Agency</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Layout>
        <section className="section-spacing bg-background min-h-[70vh] flex items-center">
          <div className="container-sm max-w-2xl text-center space-y-8">
            <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase text-foreground/40">
                {serviceLabel ?? "Formulário"} — Recebido
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                Solicitação enviada.
              </h1>
              <p className="text-foreground/60 text-lg max-w-md mx-auto">
                Nosso time entrará em contato em até <strong className="text-foreground">48h úteis</strong> para dar continuidade.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511937292921?text=Ol%C3%A1%2C%20acabei%20de%20enviar%20uma%20solicita%C3%A7%C3%A3o%20pelo%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Falar pelo WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-border text-sm font-medium hover:bg-secondary transition-colors"
              >
                Voltar ao site
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
