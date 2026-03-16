import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type Variant = "up" | "down" | "left" | "right" | "fade" | "scale";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: Variant;
  threshold?: number;
}

const hiddenClasses: Record<Variant, string> = {
  up:    "opacity-0 translate-y-12",
  down:  "opacity-0 -translate-y-12",
  left:  "opacity-0 translate-x-12",
  right: "opacity-0 -translate-x-12",
  fade:  "opacity-0",
  scale: "opacity-0 scale-95",
};

const visibleClasses: Record<Variant, string> = {
  up:    "opacity-100 translate-y-0",
  down:  "opacity-100 translate-y-0",
  left:  "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  fade:  "opacity-100",
  scale: "opacity-100 scale-100",
};

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function RevealSection({
  children,
  className,
  delay = 0,
  duration = 700,
  variant = "up",
  threshold = 0.1,
}: Props) {
  const { ref, isVisible } = useScrollReveal(threshold);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-auto",
        hiddenClasses[variant],
        isVisible && visibleClasses[variant],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
