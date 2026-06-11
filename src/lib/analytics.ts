type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

function push(payload: DataLayerEvent) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(payload);
}

export type FormSource =
  | "consultoria-estrategica"
  | "consultoria-360"
  | "branding-empresarial"
  | "branding-pessoal"
  | "identidade-visual"
  | "gestao-redes-sociais"
  | "naming";

const serviceNames: Record<FormSource, string> = {
  "consultoria-estrategica": "Consultoria Estratégica",
  "consultoria-360": "Consultoria Estratégica 360°",
  "branding-empresarial": "Branding Empresarial",
  "branding-pessoal": "Branding Pessoal",
  "identidade-visual": "Identidade Visual",
  "gestao-redes-sociais": "Gestão de Redes Sociais",
  naming: "Naming Estratégico",
};

export function trackLead(source: FormSource) {
  push({
    event: "generate_lead",
    form_source: source,
    service: serviceNames[source],
  });
  // Meta Pixel
  (window as any).fbq?.("track", "Lead", { content_name: source });
}

export function trackCtaClick(label: string, destination: string, page: string) {
  push({ event: "cta_click", cta_label: label, cta_destination: destination, page });
}

export function trackFormStart(source: FormSource) {
  push({ event: "form_start", form_source: source });
}
