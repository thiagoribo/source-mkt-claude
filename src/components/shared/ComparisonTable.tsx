import { X, Check, Sparkles } from "lucide-react";
import RevealSection from "./RevealSection";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  sem: string;
  com: string;
}

interface ComparisonTableProps {
  title: string;
  subtitle?: string;
  rows: ComparisonRow[];
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function ComparisonTable({
  title,
  subtitle,
  rows,
  beforeLabel = "Sem Branding Estratégico",
  afterLabel = "Com Branding Estratégico",
  className,
}: ComparisonTableProps) {
  return (
    <section className={cn("section-spacing bg-background", className)}>
      <div className="container-sm max-w-5xl">
        <RevealSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Transformação
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">{title}</h2>
            {subtitle && (
              <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="relative">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 via-transparent to-primary/5 -z-10" />

            <div className="border-2 border-border bg-background shadow-sm overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-border bg-gradient-to-br from-destructive/10 to-destructive/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="h-4 w-4 text-destructive" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider text-destructive">
                      {beforeLabel}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">
                      {afterLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rows */}
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 border-t border-border group hover:bg-accent/[0.02] transition-colors"
                >
                  {/* Before column */}
                  <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-destructive/20 transition-colors">
                        <X className="h-3 w-3 text-destructive/70" />
                      </div>
                      <p className="text-sm text-foreground/60 leading-relaxed">
                        {row.sem}
                      </p>
                    </div>
                  </div>

                  {/* After column */}
                  <div className="p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                        {row.com}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-destructive via-accent to-primary" />
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
