import { Carousel } from "@ark-ui/react/carousel";
import { PlayIcon, PauseIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import img2Sm from "@/assets/resultados/2-800.webp";
import img2Lg from "@/assets/resultados/2-1600.webp";
import img3Sm from "@/assets/resultados/3-800.webp";
import img3Lg from "@/assets/resultados/3-1600.webp";
import img4Sm from "@/assets/resultados/4-800.webp";
import img4Lg from "@/assets/resultados/4-1600.webp";
import img5Sm from "@/assets/resultados/5-800.webp";
import img5Lg from "@/assets/resultados/5-1600.webp";
import img6Sm from "@/assets/resultados/6-800.webp";
import img6Lg from "@/assets/resultados/6-1600.webp";
import img7Sm from "@/assets/resultados/7-800.webp";
import img7Lg from "@/assets/resultados/7-1600.webp";
import img8Sm from "@/assets/resultados/8-800.webp";
import img8Lg from "@/assets/resultados/8-1600.webp";

type Slide = { sm: string; lg: string; alt: string };

const slides: Slide[] = [
  { sm: img2Sm, lg: img2Lg, alt: "Resultado de cliente Source — case 1" },
  { sm: img3Sm, lg: img3Lg, alt: "Resultado de cliente Source — case 2" },
  { sm: img4Sm, lg: img4Lg, alt: "Resultado de cliente Source — case 3" },
  { sm: img5Sm, lg: img5Lg, alt: "Resultado de cliente Source — case 4" },
  { sm: img6Sm, lg: img6Lg, alt: "Resultado de cliente Source — case 5" },
  { sm: img7Sm, lg: img7Lg, alt: "Resultado de cliente Source — case 6" },
  { sm: img8Sm, lg: img8Lg, alt: "Resultado de cliente Source — case 7" },
];

// Autoplay respeita prefers-reduced-motion (acessibilidade)
function useAutoplayDelay(defaultDelay: number): number | undefined {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return enabled ? defaultDelay : undefined;
}

export default function ResultadosCarousel() {
  const delay = useAutoplayDelay(4500);
  const total = slides.length;

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={total}
      autoplay={delay ? { delay } : undefined}
      loop
      className="w-full"
    >
      <Carousel.ItemGroup className="overflow-hidden bg-secondary">
        {slides.map((slide, index) => (
          <Carousel.Item key={index} index={index}>
            <img
              src={slide.lg}
              srcSet={`${slide.sm} 800w, ${slide.lg} 1600w`}
              sizes="(max-width: 1024px) 100vw, 1000px"
              alt={slide.alt}
              width={1600}
              height={900}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              className="w-full h-auto aspect-video object-cover"
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      {/* Controles: mobile empilhados abaixo, desktop em linha */}
      <div className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Indicadores + contador (esquerda) */}
        <div className="flex items-center gap-4">
          <Carousel.IndicatorGroup className="flex items-center gap-1.5">
            {slides.map((_, index) => (
              <Carousel.Indicator
                key={index}
                index={index}
                aria-label={`Ir para o slide ${index + 1}`}
                className="h-1.5 w-6 bg-foreground/15 hover:bg-foreground/30 data-[current]:bg-primary transition-colors cursor-pointer"
              />
            ))}
          </Carousel.IndicatorGroup>
          <Carousel.Context>
            {(api) => (
              <span className="text-xs font-mono text-foreground/40 tabular-nums">
                {String(api.page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            )}
          </Carousel.Context>
        </div>

        {/* Botões nav + play/pause (direita) */}
        <div className="flex items-center gap-2">
          {delay !== undefined && (
            <Carousel.AutoplayTrigger
              aria-label="Pausar ou retomar autoplay"
              className="group inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 border border-border hover:bg-secondary transition-colors"
            >
              <PlayIcon className="w-4 h-4 hidden group-data-[pressed]:block" />
              <PauseIcon className="w-4 h-4 group-data-[pressed]:hidden" />
            </Carousel.AutoplayTrigger>
          )}
          <Carousel.PrevTrigger
            aria-label="Slide anterior"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 border border-border hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
          </Carousel.PrevTrigger>
          <Carousel.NextTrigger
            aria-label="Próximo slide"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4" />
          </Carousel.NextTrigger>
        </div>
      </div>
    </Carousel.Root>
  );
}
