import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import logoFooter from "@/assets/logo-footer.svg";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-offwhite">
      <div className="container-sm pt-20 pb-10 md:pt-24 md:pb-12">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-brand-offwhite/10">
          {/* Brand col */}
          <div className="md:col-span-5 space-y-8">
            <img src={logoFooter} alt="SM Agency" className="h-20 w-auto" />
            <p className="text-sm text-brand-offwhite/50 leading-relaxed max-w-xs font-light">
              Consultoria estratégica e branding para empresas estabelecidas que querem crescer em categorias mais rentáveis.
            </p>
            <div className="flex gap-5 items-center">
              <a
                href="https://www.instagram.com/sm.agencybr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brand-offwhite/40 hover:text-brand-offwhite transition-colors duration-200"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/source-marketingag/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-brand-offwhite/40 hover:text-brand-offwhite transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav cols */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-brand-offwhite/30">
              Serviços
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Consultoria Estratégica", href: "/consultoria-estrategica" },
                { label: "Branding Empresarial", href: "/branding-empresarial" },
                { label: "Branding Pessoal", href: "/branding-pessoal" },
                { label: "Identidade Visual", href: "/identidade-visual" },
                { label: "Gestão de Redes Sociais", href: "/gestao-redes-sociais" },
                { label: "Naming", href: "/naming" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-brand-offwhite/50 hover:text-brand-offwhite transition-colors duration-200 font-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 space-y-5">
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-brand-offwhite/30">
              Contato
            </h4>
            <div className="flex flex-col gap-3 text-sm text-brand-offwhite/50 font-light">
              <a
                href="mailto:contato@sourcemkt.com.br"
                className="hover:text-brand-offwhite transition-colors duration-200"
              >
                contato@sourcemkt.com.br
              </a>
              <a
                href="https://wa.me/5511937292921"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-offwhite transition-colors duration-200"
              >
                (11) 93729-2921
              </a>
              <span className="text-brand-offwhite/30">Atendimento em todo Brasil</span>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/5511937292921"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-10 px-6 text-[10px] font-semibold tracking-widest uppercase bg-brand-offwhite text-brand-black hover:bg-white transition-colors duration-200"
              >
                Agendar Diagnóstico
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-[11px] text-brand-offwhite/25 font-light tracking-wide">
            © 2026 SM Agency — CNPJ: 49.800.040/0001-07
          </span>
          <div className="flex gap-6">
            <Link to="/quem-somos" className="text-[11px] text-brand-offwhite/25 hover:text-brand-offwhite/60 transition-colors tracking-wide">
              Quem Somos
            </Link>
            <Link to="/politica-de-privacidade" className="text-[11px] text-brand-offwhite/25 hover:text-brand-offwhite/60 transition-colors tracking-wide">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
