type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

function push(payload: DataLayerEvent) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(payload);
}

export type FormSource =
  | "candidatura-geral"
  | "branding-empresarial"
  | "branding-pessoal"
  | "identidade-visual"
  | "gestao-redes-sociais";

const serviceNames: Record<FormSource, string> = {
  "candidatura-geral": "Candidatura Geral",
  "branding-empresarial": "Branding Empresarial",
  "branding-pessoal": "Branding Pessoal",
  "identidade-visual": "Identidade Visual",
  "gestao-redes-sociais": "Gestão de Redes Sociais",
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

export function trackConversion(source?: FormSource) {
  push({ event: "conversion", ...(source ? { form_source: source, service: serviceNames[source] } : {}) });
  (window as any).fbq?.("track", "Lead", source ? { content_name: source } : {});
}
