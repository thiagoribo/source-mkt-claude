"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the type for a single review
type Review = {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc: string;
  result?: string;
};

// Define the props for the slider component
interface TestimonialSliderProps {
  reviews: Review[];
  /** Optional class name for the container */
  className?: string;
  /** Optional title for the section */
  title?: string;
  /** Optional subtitle for the section */
  subtitle?: string;
}

/**
 * Slider de testemunhos adaptado ao estilo brutalista do site SM Agency.
 * Usa Framer Motion para animações suaves.
 */
export const TestimonialSlider = ({
  reviews,
  className,
  title = "O Que Nossos Clientes Dizem",
  subtitle = "Resultados reais de quem confiou na SM Agency",
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Get up to 3 thumbnails excluding current
  const thumbnailReviews = reviews
    .map((review, index) => ({ ...review, originalIndex: index }))
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  // Animation variants
  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section
      className={cn(
        "section-spacing bg-secondary relative overflow-hidden",
        className
      )}
    >
      <div className="container-sm max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 bg-accent inline-block" />
            Depoimentos
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-foreground/55 text-sm max-w-md">{subtitle}</p>
          <div className="h-px w-12 bg-accent mt-6" />
        </motion.div>

        {/* Slider Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Meta and Thumbnails */}
          <div className="lg:col-span-3 flex flex-col justify-between order-2 lg:order-1">
            <div className="flex flex-row lg:flex-col justify-between lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4">
              {/* Pagination */}
              <span className="text-sm text-foreground/40 font-mono">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(reviews.length).padStart(2, "0")}
              </span>
              {/* Vertical Text */}
              <h3 className="text-xs font-mono tracking-widest uppercase text-foreground/30 [writing-mode:vertical-rl] lg:rotate-180 hidden lg:block">
                Clientes
              </h3>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex space-x-3 mt-8 lg:mt-0">
              {thumbnailReviews.map((review) => (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(review.originalIndex)}
                  className="overflow-hidden w-16 h-20 md:w-20 md:h-24 border border-border/50 opacity-60 hover:opacity-100 hover:border-primary/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label={`Ver depoimento de ${review.name}`}
                >
                  <img
                    src={review.thumbnailSrc}
                    alt={review.name}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Center Column: Main Image */}
          <div className="lg:col-span-4 relative min-h-[350px] md:min-h-[450px] order-1 lg:order-2">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={activeReview.imageSrc}
                alt={activeReview.name}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-top shadow-lg"
              />
            </AnimatePresence>
          </div>

          {/* Right Column: Text and Navigation */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:pl-4 order-3">
            {/* Text Content */}
            <div className="relative overflow-hidden pt-4 lg:pt-8 min-h-[220px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="text-primary font-mono text-xs tracking-widest uppercase">
                    {activeReview.role}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold font-serif mt-2">
                    {activeReview.name}
                  </h3>
                  {activeReview.result && (
                    <p className="text-accent text-xs font-mono mt-2">
                      {activeReview.result}
                    </p>
                  )}
                  <blockquote className="mt-6 text-lg md:text-xl text-foreground/70 leading-relaxed italic">
                    "{activeReview.quote}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3 mt-8 lg:mt-0">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 border-border hover:border-primary/40 hover:bg-transparent"
                onClick={handlePrev}
                aria-label="Depoimento anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleNext}
                aria-label="Próximo depoimento"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
