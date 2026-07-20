import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;

      // Only show after scrolling past 500px
      if (scrollY < 500) {
        setVisible(false);
        return;
      }

      // Hide if the form/candidatura section is on screen
      const target = document.querySelector<HTMLElement>("#formulario, #candidatura");
      if (target) {
        const rect = target.getBoundingClientRect();
        const onScreen = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        setVisible(!onScreen);
        return;
      }

      setVisible(true);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleClick = () => {
    const form = document.querySelector<HTMLElement>("#formulario, #candidatura");
    form?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-semibold tracking-wider"
        style={{
          minHeight: "52px",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        Candidatar meu projeto
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
