import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logoHeader from "@/assets/logo-header.svg";

const navItems = [
  { label: "Consultoria", href: "/consultoria-estrategica", bold: true },
  {
    label: "Branding",
    children: [
      { label: "Empresarial", href: "/branding-empresarial" },
      { label: "Pessoal", href: "/branding-pessoal" },
    ],
  },
  { label: "Quem Somos", href: "/quem-somos" },
  {
    label: "Serviços",
    children: [
      { label: "Identidade Visual", href: "/identidade-visual" },
      { label: "Gestão de Redes", href: "/gestao-redes-sociais" },
      { label: "Naming", href: "/naming" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isActive = (href: string) => location.pathname === href;
  const isDropdownActive = (children: { href: string }[]) =>
    children.some((c) => location.pathname === c.href);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setScrolled(currentY > 20);

      if (currentY < 80) {
        setVisible(true);
      } else if (diff > 4) {
        setVisible(false);
      } else if (diff < -4) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-brand-navy shadow-[0_1px_0_rgba(240,236,227,0.08)]"
          : "bg-brand-navy"
      }`}
    >
      <div className="container-sm flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 group">
          <img
            src={logoHeader}
            alt="SM Agency"
            className="h-9 md:h-11 w-auto transition-opacity duration-200 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === item.label ? null : item.label);
                    }
                    if (e.key === "Escape") setOpenDropdown(null);
                  }}
                  className={`flex items-center gap-1 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 py-3 min-h-[44px] ${
                    isDropdownActive(item.children)
                      ? "text-brand-offwhite"
                      : "text-brand-offwhite/60 hover:text-brand-offwhite"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 pt-3 z-50 transition-all duration-200 ${
                    openDropdown === item.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="bg-brand-navy border border-brand-offwhite/10 py-2 min-w-[200px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-5 py-3 min-h-[44px] flex items-center text-xs font-medium tracking-wider uppercase hover:bg-brand-offwhite/5 transition-colors duration-150 ${
                          isActive(child.href)
                            ? "text-brand-offwhite border-l-2 border-brand-gold pl-[18px]"
                            : "text-brand-offwhite/60 hover:text-brand-offwhite"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                to={item.href!}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 relative ${
                  isActive(item.href!)
                    ? "text-brand-offwhite after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-gold"
                    : item.bold
                    ? "text-brand-offwhite hover:text-brand-offwhite/80"
                    : "text-brand-offwhite/60 hover:text-brand-offwhite"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5511937292921"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center h-9 px-6 text-xs font-semibold tracking-widest uppercase bg-brand-offwhite text-brand-navy transition-all duration-300 hover:bg-white"
          >
            Diagnóstico Gratuito
          </a>
          <button
            className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-brand-offwhite/80 hover:text-brand-offwhite transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden bg-brand-navy border-t border-brand-offwhite/10 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen py-8" : "max-h-0 py-0"
        }`}
      >
        <nav className="container-sm flex flex-col gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-col">
                <span className="text-xs font-semibold tracking-widest uppercase text-brand-offwhite/40 py-3">
                  {item.label}
                </span>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium py-2.5 pl-4 transition-all ${
                      isActive(child.href)
                        ? "text-brand-offwhite border-l-2 border-brand-gold pl-[14px]"
                        : "text-brand-offwhite/70 hover:text-brand-offwhite border-l border-brand-offwhite/10 hover:border-brand-offwhite/40"
                    }`}
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
                className={`text-sm font-semibold tracking-wider uppercase py-3 transition-colors ${
                  isActive(item.href!)
                    ? "text-brand-offwhite border-l-2 border-brand-gold pl-3"
                    : "text-brand-offwhite/80 hover:text-brand-offwhite"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <a
            href="https://wa.me/5511937292921"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex items-center justify-center h-11 text-xs font-semibold tracking-widest uppercase bg-brand-offwhite text-brand-navy"
          >
            Diagnóstico Gratuito
          </a>
        </nav>
      </div>
    </header>
  );
}
