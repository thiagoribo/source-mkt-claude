import { cn } from "@/lib/utils";

export type MockupRatio = "4/3" | "16/10" | "3/4";
export type MockupTheme = "branding" | "social" | "naming" | "visual" | "personal";

interface ServiceMockupCardProps {
  title: string;
  subtitle?: string;
  tag?: string;
  evidence?: string;
  imageSrc?: string;
  ratio?: MockupRatio;
  theme?: MockupTheme;
  className?: string;
}

const ratioClasses: Record<MockupRatio, string> = {
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
};

const themeStyles: Record<MockupTheme, { card: string; badge: string; evidence: string; fallback: string }> = {
  branding: {
    card: "border-primary/20 bg-background",
    badge: "bg-primary/10 text-primary",
    evidence: "text-primary",
    fallback: "from-primary/20 via-primary/5 to-background",
  },
  visual: {
    card: "border-accent/35 bg-background",
    badge: "bg-accent/15 text-foreground",
    evidence: "text-foreground",
    fallback: "from-accent/35 via-background to-secondary",
  },
  social: {
    card: "border-brand-navy/20 bg-background",
    badge: "bg-brand-navy/10 text-brand-navy",
    evidence: "text-brand-navy",
    fallback: "from-brand-navy/25 via-background to-secondary",
  },
  naming: {
    card: "border-border/70 bg-background",
    badge: "bg-secondary text-foreground/85",
    evidence: "text-primary",
    fallback: "from-secondary via-background to-secondary/70",
  },
  personal: {
    card: "border-primary/25 bg-background",
    badge: "bg-primary/10 text-primary",
    evidence: "text-primary",
    fallback: "from-primary/15 via-background to-secondary",
  },
};

export default function ServiceMockupCard({
  title,
  subtitle,
  tag,
  evidence,
  imageSrc,
  ratio = "4/3",
  theme = "branding",
  className,
}: ServiceMockupCardProps) {
  const styles = themeStyles[theme];

  return (
    <div className={cn("group mockup-frame rounded-xl border h-full overflow-hidden transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(20,30,48,0.10)]", styles.card, className)}>
      <div className={cn("relative mockup-noise overflow-hidden", ratioClasses[ratio])}>
        {imageSrc ? (
          <div className="w-full h-full mockup-gloss">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className={cn("w-full h-full bg-gradient-to-br mockup-gloss transition-transform duration-500 group-hover:scale-[1.04]", styles.fallback)} />
        )}
      </div>
      <div className="p-5 space-y-2">
        {tag ? (
          <span className={cn("inline-flex text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full", styles.badge)}>
            {tag}
          </span>
        ) : null}
        <h3 className="font-semibold text-[15px] leading-snug">{title}</h3>
        {subtitle ? <p className="text-sm text-foreground/70 leading-relaxed">{subtitle}</p> : null}
        {evidence ? <p className={cn("text-sm font-semibold", styles.evidence)}>{evidence}</p> : null}
      </div>
    </div>
  );
}
