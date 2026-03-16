import React from "react";
import { motion } from "framer-motion";

// --- Imports de fotos de clientes ---
import sabrinaKeller from "@/assets/clientes/sabrina-keller.webp";
import giuliaCloss from "@/assets/clientes/giulia-closs.webp";
import renataImaoka from "@/assets/clientes/renata-imaoka.webp";
import andressaFraga from "@/assets/clientes/andressa-fraga.webp";
import anaPriscia from "@/assets/clientes/ana-priscia.webp";
import jaquelineVieira from "@/assets/clientes/jaqueline-vieira.webp";
import indyZimmer from "@/assets/clientes/indy-zimmer.webp";
import beatrizGarcia from "@/assets/clientes/beatriz-garcia.webp";
import thatianeOliveira from "@/assets/clientes/thatiane-oliveira.webp";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  company: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Atribuo minha posição atual ao apoio na gestão de redes sociais e orientação de posicionamento. Recebo mensagens diárias de interessadas. Faturamento aumentado em 150%.",
    image: sabrinaKeller,
    name: "Sabrina Keller",
    role: "Mentora de Mulheres",
    company: "Palestrante",
  },
  {
    text: "O processo superou as expectativas. A equipe capturou a essência da minha marca desde o início. Fechei projetos de R$ 20.000 no primeiro mês após a mentoria.",
    image: giuliaCloss,
    name: "Giulia Closs",
    role: "Arquiteta",
    company: "@giucloss",
  },
  {
    text: "Cliente há 4 anos. Me emocionei com a leitura perfeita da minha identidade transformada em marca. Ana enxerga além da superfície.",
    image: renataImaoka,
    name: "Renata Imaoka",
    role: "CEO",
    company: "HM Tour & ELO8",
  },
  {
    text: "Ana possui maestria em traduzir desejos que o cliente não consegue expressar com exatidão. O processo é uma escuta profunda que transforma histórias de vida em marcas estratégicas.",
    image: andressaFraga,
    name: "Andressa Fraga",
    role: "Advogada",
    company: "Mestre em Neurociência",
  },
  {
    text: "Ana deu rumo ao meu navio. Antes eu tinha força mas remava em círculos. O processo trouxe equilíbrio e direcionamento através de questionamentos e estratégias sólidas.",
    image: anaPriscia,
    name: "Dra. Ana Príscia",
    role: "Médica Alergista",
    company: "@papodealergista",
  },
  {
    text: "A SM. Agency acerta em cheio onde grandes players do mercado erram. Pontualidade e cumprimento do calendário são diferenciais reais.",
    image: jaquelineVieira,
    name: "Jaqueline Vieira",
    role: "Proprietária",
    company: "Franquia de Seguros",
  },
  {
    text: "A equipe captou exatamente quem eu sou e superou as expectativas em 1 milhão de vezes. Descobri meu propósito e mudei completamente a visão do negócio.",
    image: indyZimmer,
    name: "Indy Zimmer",
    role: "Mentora de Mentalidade",
    company: "@indyzimmer",
  },
  {
    text: "O resultado superou todas as expectativas e combinou perfeitamente com minha identidade. Agora sinto que posso dominar o mundo! O time cresceu 200%.",
    image: beatrizGarcia,
    name: "Beatriz Garcia",
    role: "Advogada",
    company: "@beatrizgarciadv",
  },
  {
    text: "A mentoria trouxe confiança e a sensação de merecimento. Investir em imagem e comunicação foi uma das minhas melhores decisões. Hoje trabalho com grandes nomes do mercado digital.",
    image: thatianeOliveira,
    name: "Thatiane Nascimento",
    role: "Assessora Administrativa",
    company: "@thatianeassessora",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Column ---
function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5 list-none m-0 p-0"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, company }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: "6px 6px 0 rgba(20, 30, 48, 0.09)",
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                }}
                whileFocus={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: "6px 6px 0 rgba(20, 30, 48, 0.09)",
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                }}
                className="p-7 border border-border max-w-xs w-full bg-background cursor-default select-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <blockquote className="m-0 p-0">
                  <p className="text-foreground/70 leading-relaxed text-sm m-0">
                    &ldquo;{text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3 mt-6 pt-5 border-t border-border/40">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Foto de ${name}`}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <cite className="font-semibold not-italic text-sm text-foreground leading-tight">
                        {name}
                      </cite>
                      <span className="text-xs text-foreground/45 mt-0.5 truncate">
                        {role}, {company}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))]}
      </motion.ul>
    </div>
  );
}

// --- Section ---
export default function TestimonialV2() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-spacing bg-secondary relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container-sm"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16 text-center space-y-5">
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            Depoimentos
          </div>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold leading-tight"
          >
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-foreground/55 text-base leading-relaxed max-w-sm">
            Empresas que transformaram sua posição de mercado com estratégia e branding.
          </p>
        </div>

        <div
          className="flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[720px] overflow-hidden"
          role="region"
          aria-label="Depoimentos em rolagem"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  );
}
