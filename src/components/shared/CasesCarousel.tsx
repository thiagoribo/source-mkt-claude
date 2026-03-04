import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceMockupCard from "./ServiceMockupCard";
import type { ServiceMockupItem } from "@/data/serviceMockups";
import { cn } from "@/lib/utils";

interface CasesCarouselProps {
  items: ServiceMockupItem[];
  className?: string;
}

export default function CasesCarousel({ items, className }: CasesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4 md:-ml-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="pl-4 md:pl-6 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <ServiceMockupCard
                title={item.title}
                subtitle={item.subtitle}
                tag={item.tag}
                evidence={item.evidence}
                imageSrc={item.imageSrc}
                ratio={item.ratio}
                theme={item.theme}
                fit={item.fit}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="text-xs font-mono text-foreground/40">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="w-10 h-10 border border-border hover:border-primary/40 flex items-center justify-center disabled:opacity-25 transition-colors"
            aria-label="Case anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center disabled:opacity-25 transition-colors"
            aria-label="Próximo case"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
