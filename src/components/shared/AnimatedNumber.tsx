import { useState, useEffect, useRef } from "react";

interface AnimatedNumberProps {
  value: string; // e.g. "100+", "3×", "95%", "6"
  duration?: number;
  className?: string;
}

function parseValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+)([^\d]*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return {
    prefix: match[1],
    number: parseInt(match[2], 10),
    suffix: match[3],
  };
}

export default function AnimatedNumber({ value, duration = 1200, className }: AnimatedNumberProps) {
  const { prefix, number, suffix } = parseValue(value);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          const steps = 36;
          const stepDuration = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(number * eased));
            if (step >= steps) {
              clearInterval(timer);
              setCount(number);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [number, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
