import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import { useUtmParams } from "@/hooks/useUtmParams";
import { trackFormStart, trackLead } from "@/lib/analytics";
import type { FormSource } from "@/types/lead";
import { cn } from "@/lib/utils";

type QualificationFormProps = {
  service: FormSource;
  compact?: boolean;
};

const STEP_LABELS = ["Você", "Projeto", "Detalhes", "Contexto"];
const TOTAL_STEPS = 4;

type FormFields = {
  name: string;
  email: string;
  phone: string;
  selectedService: FormSource;
  company: string;
  website: string;
  stage: string;
  decision_role: string;
  offer_audience: string;
  area_experience: string;
  client_base: string;
  business_model: string;
  brand_strategy_status: string;
  brand_materials_url: string;
  branding_origin: string;
  brand_link: string;
  platforms: string;
  branding_date: string;
  timeline: string;
  availability: string;
  budget: string;
  why_now: string;
  commitment_confirmed: boolean;
};

const INITIAL: FormFields = {
  name: "",
  email: "",
  phone: "",
  selectedService: "candidatura-geral",
  company: "",
  website: "",
  stage: "operacao",
  decision_role: "decisor",
  offer_audience: "",
  area_experience: "",
  client_base: "recorrente",
  business_model: "",
  brand_strategy_status: "parcial",
  brand_materials_url: "",
  branding_origin: "source",
  brand_link: "",
  platforms: "",
  branding_date: "",
  timeline: "agora",
  availability: "disponivel",
  budget: "",
  why_now: "",
  commitment_confirmed: false,
};

/* ─── Sub-components ─── */

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-7">
      {/* Progress bar */}
      <div className="h-[2px] bg-border/40 mb-5">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${((current - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
        />
      </div>
      {/* Step dots */}
      <div className="flex items-center">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1;
          const isDone = step < current;
          const isCurrent = step === current;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div
                  className={cn(
                    "w-6 h-6 flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300",
                    isDone && "bg-primary text-primary-foreground",
                    isCurrent && "bg-accent text-accent-foreground ring-2 ring-accent/30 ring-offset-1 ring-offset-background",
                    !isDone && !isCurrent && "border border-border/50 text-foreground/25"
                  )}
                >
                  {isDone ? <Check className="w-3 h-3" /> : step}
                </div>
                <span
                  className={cn(
                    "text-[9px] font-mono uppercase tracking-widest leading-none",
                    isCurrent ? "text-foreground/60" : "text-foreground/25"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 mx-2 mb-4 transition-all duration-300",
                    step < current ? "bg-primary/30" : "bg-border/30"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  required = true,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs text-foreground/65">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}

/* Prevents iOS auto-zoom (font-size must be ≥16px) */
const INPUT_STYLE = { fontSize: "16px" } as const;

function Select({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={INPUT_STYLE}
      className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-none"
    >
      {children}
    </select>
  );
}

/* ─── Main component ─── */

export default function QualificationForm({ service }: QualificationFormProps) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<FormFields>({
    ...INITIAL,
    selectedService: service,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const { submitLead, isLoading, error: submitError } = useSubmitLead(service);
  const navigate = useNavigate();
  const utm = useUtmParams();
  const formStarted = useRef(false);

  const set = (key: keyof FormFields, value: string | boolean) => {
    if (!formStarted.current) {
      trackFormStart(service);
      formStarted.current = true;
    }
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  /* Derived service flags */
  const isGeneral = service === "candidatura-geral";
  const effective = isGeneral ? fields.selectedService : service;
  const isPersonal = effective === "branding-pessoal";
  const isBusiness = effective === "branding-empresarial";
  const isVisual = effective === "identidade-visual";
  const isSocial = effective === "gestao-redes-sociais";
  const isGeneralUnresolved = isGeneral && effective === "candidatura-geral";

  /* Step 3 field visibility */
  const showPersonal = isPersonal || isGeneralUnresolved;
  const showBusiness = isBusiness || isGeneralUnresolved;
  const showVisual = isVisual;
  const showSocial = isSocial;

  /* Validate current step before advancing */
  const validate = (s: number): boolean => {
    const e: Partial<Record<keyof FormFields, string>> = {};

    if (s === 1) {
      if (!fields.name.trim()) e.name = "Nome é obrigatório.";
      if (!fields.email.trim() || !fields.email.includes("@"))
        e.email = "Informe um email válido.";
      if (fields.phone.trim().replace(/\D/g, "").length < 8)
        e.phone = "Informe seu WhatsApp.";
    }
    if (s === 2) {
      if (!fields.company.trim()) e.company = "Informe a empresa ou marca.";
      if (!fields.offer_audience.trim())
        e.offer_audience = "Descreva sua oferta e público.";
    }
    if (s === 4) {
      if (!fields.why_now.trim()) e.why_now = "Conte por que agora.";
      if (!fields.commitment_confirmed)
        e.commitment_confirmed = "Confirme sua disponibilidade para prosseguir.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = async () => {
    if (!validate(4)) return;

    const result = await submitLead({
      full_name: fields.name,
      email: fields.email,
      whatsapp: fields.phone,
      company: fields.company,
      website: fields.website,
      notes: fields.why_now,
      qualification_data: {
        stage: fields.stage,
        decision_role: fields.decision_role,
        offer_audience: fields.offer_audience,
        area_experience: fields.area_experience,
        client_base: fields.client_base,
        business_model: fields.business_model,
        brand_strategy_status: fields.brand_strategy_status,
        brand_materials_url: fields.brand_materials_url,
        branding_origin: fields.branding_origin,
        brand_link: fields.brand_link,
        platforms: fields.platforms,
        branding_date: fields.branding_date,
        timeline: fields.timeline,
        availability: fields.availability,
        budget: fields.budget,
        commitment_confirmed: fields.commitment_confirmed ? "sim" : "nao",
      },
      requested_service: effective === "candidatura-geral" ? undefined : effective,
      utm_source: utm.utm_source ?? undefined,
      utm_medium: utm.utm_medium ?? undefined,
      utm_campaign: utm.utm_campaign ?? undefined,
      utm_content: utm.utm_content ?? undefined,
      utm_term: utm.utm_term ?? undefined,
    });

    if (result.success) {
      trackLead(effective === "candidatura-geral" ? service : effective);
      navigate(`/obrigado?service=${effective}`);
    }
  };

  return (
    <div>
      <StepIndicator current={step} />

      {/* ── Step 1: Você ── */}
      {step === 1 && (
        <div key="step1" className="space-y-4">
          {isGeneral && (
            <Field id="selectedService" label="Qual serviço parece mais próximo?" required={false}>
              <Select id="selectedService" value={fields.selectedService} onChange={(v) => set("selectedService", v as FormSource)}>
                <option value="branding-empresarial">Branding Empresarial</option>
                <option value="branding-pessoal">Branding Pessoal</option>
                <option value="identidade-visual">Identidade Visual</option>
                <option value="gestao-redes-sociais">Gestão de Redes Sociais</option>
                <option value="candidatura-geral">Ainda não sei — quero orientação</option>
              </Select>
            </Field>
          )}

          <Field id="name" label="Seu nome" error={errors.name}>
            <Input
              id="name"
              value={fields.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Nome completo"
              autoComplete="name"
              className="rounded-none"
              style={INPUT_STYLE}
            />
          </Field>

          <Field id="email" label="Email" error={errors.email}>
            <Input
              id="email"
              type="email"
              inputMode="email"
              value={fields.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              className="rounded-none"
              style={INPUT_STYLE}
            />
          </Field>

          <Field id="phone" label="WhatsApp" error={errors.phone}>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              value={fields.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="(11) 99999-9999"
              autoComplete="tel"
              className="rounded-none"
              style={INPUT_STYLE}
            />
          </Field>
        </div>
      )}

      {/* ── Step 2: Projeto ── */}
      {step === 2 && (
        <div key="step2" className="space-y-4">
          <Field id="company" label="Empresa ou marca" error={errors.company}>
            <Input
              id="company"
              value={fields.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder={isPersonal ? "Seu nome ou marca pessoal" : "Nome da empresa"}
              autoComplete="organization"
              className="rounded-none"
              style={INPUT_STYLE}
            />
          </Field>

          <Field id="website" label="Site ou perfil profissional" required={false}>
            <Input
              id="website"
              type="url"
              inputMode="url"
              value={fields.website}
              onChange={(e) => set("website", e.target.value)}
              placeholder="https://"
              autoComplete="url"
              className="rounded-none"
              style={INPUT_STYLE}
            />
          </Field>

          <Field id="stage" label="Em que estágio o projeto está?">
            <Select id="stage" value={fields.stage} onChange={(v) => set("stage", v)}>
              <option value="operacao">Já está em operação e tem clientes</option>
              <option value="pre_lancamento">Pré-lançamento com oferta e público definidos</option>
              <option value="ideia">Ainda é uma ideia inicial</option>
            </Select>
          </Field>

          <Field id="decision_role" label="Qual é seu papel na decisão?">
            <Select id="decision_role" value={fields.decision_role} onChange={(v) => set("decision_role", v)}>
              <option value="decisor">Sou a pessoa que decide</option>
              <option value="decisao_conjunta">A decisão será tomada com sócios ou liderança</option>
              <option value="pesquisa">Estou pesquisando para outra pessoa</option>
            </Select>
          </Field>

          <Field id="offer_audience" label="O que você vende e para quem?" error={errors.offer_audience}>
            <Textarea
              id="offer_audience"
              value={fields.offer_audience}
              onChange={(e) => set("offer_audience", e.target.value)}
              rows={3}
              placeholder="Descreva sua oferta e o público que deseja atender."
              className="rounded-none"
              style={INPUT_STYLE}
            />
          </Field>
        </div>
      )}

      {/* ── Step 3: Detalhes (service-specific) ── */}
      {step === 3 && (
        <div key="step3" className="space-y-4">
          {showPersonal && (
            <>
              <Field id="area_experience" label="Área e tempo de atuação" required={false}>
                <Input
                  id="area_experience"
                  value={fields.area_experience}
                  onChange={(e) => set("area_experience", e.target.value)}
                  placeholder="Ex.: medicina, 8 anos"
                  className="rounded-none"
                  style={INPUT_STYLE}
                />
              </Field>
              <Field id="client_base" label="Sua atuação hoje" required={false}>
                <Select id="client_base" value={fields.client_base} onChange={(v) => set("client_base", v)}>
                  <option value="recorrente">Tenho clientes ou contratos recorrentes</option>
                  <option value="ativa">Tenho atuação ativa, ainda sem recorrência</option>
                  <option value="sem_clientes">Ainda não tenho clientes</option>
                </Select>
              </Field>
            </>
          )}

          {showBusiness && (
            <Field id="business_model" label="Como funciona o modelo de negócio?" required={false}>
              <Textarea
                id="business_model"
                value={fields.business_model}
                onChange={(e) => set("business_model", e.target.value)}
                rows={3}
                placeholder="Conte brevemente como a empresa entrega e gera receita."
                className="rounded-none"
                style={INPUT_STYLE}
              />
            </Field>
          )}

          {showVisual && (
            <>
              <Field id="brand_strategy_status" label="Como está a estratégia de marca?">
                <Select id="brand_strategy_status" value={fields.brand_strategy_status} onChange={(v) => set("brand_strategy_status", v)}>
                  <option value="completa">Completa e documentada</option>
                  <option value="parcial">Parcialmente definida</option>
                  <option value="inexistente">Ainda não existe</option>
                </Select>
              </Field>
              <Field id="brand_materials_url" label="Link para estratégia ou materiais" required={false}>
                <Input
                  id="brand_materials_url"
                  type="url"
                  inputMode="url"
                  value={fields.brand_materials_url}
                  onChange={(e) => set("brand_materials_url", e.target.value)}
                  placeholder="Drive, Notion ou site"
                  className="rounded-none"
                  style={INPUT_STYLE}
                />
              </Field>
            </>
          )}

          {showSocial && (
            <>
              <Field id="branding_origin" label="Quem desenvolveu o projeto de marca?">
                <Select id="branding_origin" value={fields.branding_origin} onChange={(v) => set("branding_origin", v)}>
                  <option value="source">A Source</option>
                  <option value="outra_empresa">Outro estúdio ou consultoria</option>
                  <option value="interno">Equipe interna</option>
                  <option value="nao_possui">Ainda não temos projeto de marca</option>
                </Select>
              </Field>
              <Field id="brand_link" label="Link para manual ou diretrizes" required={false}>
                <Input
                  id="brand_link"
                  type="url"
                  inputMode="url"
                  value={fields.brand_link}
                  onChange={(e) => set("brand_link", e.target.value)}
                  placeholder="Drive, Notion ou site"
                  className="rounded-none"
                  style={INPUT_STYLE}
                />
              </Field>
              <Field id="platforms" label="Plataformas atuais" required={false}>
                <Input
                  id="platforms"
                  value={fields.platforms}
                  onChange={(e) => set("platforms", e.target.value)}
                  placeholder="Instagram, LinkedIn..."
                  className="rounded-none"
                  style={INPUT_STYLE}
                />
              </Field>
              <Field id="branding_date" label="Quando o branding foi concluído?" required={false}>
                <Input
                  id="branding_date"
                  value={fields.branding_date}
                  onChange={(e) => set("branding_date", e.target.value)}
                  placeholder="Mês e ano"
                  className="rounded-none"
                  style={INPUT_STYLE}
                />
              </Field>
            </>
          )}

          {!showPersonal && !showBusiness && !showVisual && !showSocial && (
            <p className="text-sm text-foreground/50 py-4">
              Sem campos adicionais para este serviço. Continue para o próximo passo.
            </p>
          )}
        </div>
      )}

      {/* ── Step 4: Contexto ── */}
      {step === 4 && (
        <div key="step4" className="space-y-4">
          <Field id="timeline" label="Quando pretende começar?">
            <Select id="timeline" value={fields.timeline} onChange={(v) => set("timeline", v)}>
              <option value="agora">Assim que houver aderência</option>
              <option value="30_60">Em 30 a 60 dias</option>
              <option value="60_90">Em 60 a 90 dias</option>
              <option value="pesquisa">Sem prazo definido</option>
            </Select>
          </Field>

          <Field id="availability" label="Disponibilidade no processo">
            <Select id="availability" value={fields.availability} onChange={(v) => set("availability", v)}>
              <option value="disponivel">Consigo participar e aprovar nos prazos</option>
              <option value="delegar">Preciso delegar a participação</option>
              <option value="incerto">Ainda não sei</option>
            </Select>
          </Field>

          <Field id="budget" label={isSocial ? "Investimento mensal previsto" : "Investimento previsto"} required={false}>
            <Select id="budget" value={fields.budget} onChange={(v) => set("budget", v)}>
              <option value="">Selecione</option>
              {isSocial ? (
                <>
                  <option value="ate_2k">Até R$2 mil/mês</option>
                  <option value="2_4k">R$2 a R$4 mil/mês</option>
                  <option value="acima_4k">Acima de R$4 mil/mês</option>
                </>
              ) : (
                <>
                  <option value="ate_5k">Até R$5 mil</option>
                  <option value="5_10k">R$5 a R$10 mil</option>
                  <option value="10_20k">R$10 a R$20 mil</option>
                  <option value="acima_20k">Acima de R$20 mil</option>
                </>
              )}
              <option value="nao_definido">Ainda não defini</option>
            </Select>
          </Field>

          <Field id="why_now" label="Por que este projeto precisa acontecer agora?" error={errors.why_now}>
            <Textarea
              id="why_now"
              value={fields.why_now}
              onChange={(e) => set("why_now", e.target.value)}
              rows={4}
              placeholder="Conte o que mudou, qual objetivo precisa alcançar e por que este é o momento de agir."
              className="rounded-none"
              style={INPUT_STYLE}
            />
          </Field>

          <label className="flex items-start gap-3 text-xs text-foreground/60 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              checked={fields.commitment_confirmed}
              onChange={(e) => set("commitment_confirmed", e.target.checked)}
              className="mt-0.5 accent-primary flex-shrink-0"
            />
            <span>Entendo que esta é uma candidatura sujeita à análise e que o projeto exige participação, decisões e aprovações dentro dos prazos.</span>
          </label>
          {errors.commitment_confirmed && (
            <p className="text-[11px] text-red-600">{errors.commitment_confirmed}</p>
          )}

          {submitError && (
            <p role="alert" className="text-sm text-red-600 p-3 bg-red-50 border border-red-200">
              {submitError}
            </p>
          )}
        </div>
      )}

      {/* ── Navigation ── */}
      <div className={cn("flex items-center mt-6 pt-5 border-t border-border/40", step === 1 ? "justify-end" : "justify-between")}>
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-1.5 text-sm text-foreground/45 hover:text-foreground/70 transition-colors min-h-[44px] px-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={next}
            className="rounded-none h-11 px-7 flex items-center gap-2"
          >
            Continuar
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={submit}
            disabled={isLoading}
            className="rounded-none h-11 px-7 flex items-center gap-2"
          >
            {isLoading ? "Enviando..." : (
              <>
                Enviar candidatura
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>

      {step === TOTAL_STEPS && (
        <p className="text-[11px] text-foreground/40 text-center mt-3 leading-relaxed">
          Analisamos cada contexto antes de convidar para uma conversa.<br />
          Retorno em até 48h úteis.
        </p>
      )}
    </div>
  );
}
