import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoHeader from "@/assets/logo-header.svg";

const navItems = [
  { label: "Consultoria Estratégica", href: "/consultoria-estrategica", bold: true },
  {
    label: "Branding",
    children: [
      { label: "Empresarial", href: "/branding-empresarial" },
      { label: "Pessoal", href: "/branding-pessoal" },
    ],
  },
  { label: "Quem Somos", href: "/quem-somos" },
  {
    label: "Serviços Especializados",
    children: [
      { label: "Identidade Visual", href: "/identidade-visual" },
      { label: "Gestão de Redes Sociais", href: "/gestao-redes-sociais" },
      { label: "Naming", href: "/naming" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary backdrop-blur-sm border-b border-white/10">
      <div className="container-sm flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logoHeader} alt="SM Agency" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-primary rounded-lg border border-white/20 shadow-lg py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                to={item.href!}
                className={`text-sm transition-colors hover:text-white ${
                  item.bold ? "font-semibold text-white" : "font-medium text-white/80"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:inline-flex rounded-[6px] text-sm bg-white text-primary hover:bg-white/90">
            <a href="#diagnostico">Agendar Diagnóstico</a>
          </Button>
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 py-6 px-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-white/70 pl-4 hover:text-white transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-white hover:text-white/80 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <Button asChild className="mt-4 w-full rounded-[6px] bg-white text-primary hover:bg-white/90">
              <a href="#diagnostico" onClick={() => setMobileOpen(false)}>
                Agendar Diagnóstico
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
