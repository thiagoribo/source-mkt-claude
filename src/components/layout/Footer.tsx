import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Phone } from "lucide-react";
import logoFooter from "@/assets/logo-footer.svg";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-sm py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 */}
          <div className="space-y-5">
            <img src={logoFooter} alt="SM Agency" className="h-24 w-auto" />
            <p className="text-sm text-background/70 leading-relaxed max-w-xs">
              Consultoria estratégica e branding para empresas estabelecidas.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-background/60 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-background/60 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-background/60 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/5511937292921" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-background/60 hover:text-accent transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Links Rápidos</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/consultoria-estrategica" className="text-sm text-background/70 hover:text-accent transition-colors">Consultoria Estratégica</Link>
              <Link to="/branding-empresarial" className="text-sm text-background/70 hover:text-accent transition-colors">Branding Empresarial</Link>
              <Link to="/branding-pessoal" className="text-sm text-background/70 hover:text-accent transition-colors">Branding Pessoal</Link>
              <Link to="/quem-somos" className="text-sm text-background/70 hover:text-accent transition-colors">Quem Somos</Link>
            </nav>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <a href="mailto:contato@sourcemkt.com.br" className="hover:text-accent transition-colors">
                contato@sourcemkt.com.br
              </a>
              <a href="https://wa.me/5511937292921" className="hover:text-accent transition-colors">
                (11) 93729-2921
              </a>
              <span>Atendimento em todo Brasil</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-background/10">
        <div className="container-sm py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/50">
          <span>© 2025 SM Agency. CNPJ: 49.800.040/0001-07</span>
          <a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
