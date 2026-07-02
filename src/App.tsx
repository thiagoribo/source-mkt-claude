import { lazy, Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";

// Public Pages — lazy loaded (chunk separado por rota)
const Index = lazy(() => import("./pages/Index"));
const ConsultoriaEstrategica = lazy(() => import("./pages/ConsultoriaEstrategica"));
const BrandingEmpresarial = lazy(() => import("./pages/BrandingEmpresarial"));
const BrandingPessoal = lazy(() => import("./pages/BrandingPessoal"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const IdentidadeVisual = lazy(() => import("./pages/IdentidadeVisual"));
const GestaoRedesSociais = lazy(() => import("./pages/GestaoRedesSociais"));
const Naming = lazy(() => import("./pages/Naming"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const Consultoria360 = lazy(() => import("./pages/Consultoria360"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminRoutes = lazy(() => import("./components/admin/AdminRoutes"));

// Blog Pages
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <SpeedInsights />
      <Analytics />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Blog Routes (use their own Layout) */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Conversion Route (uses its own Layout) */}
            <Route path="/obrigado" element={<Obrigado />} />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/consultoria-estrategica" element={<ConsultoriaEstrategica />} />
                    <Route path="/branding-empresarial" element={<BrandingEmpresarial />} />
                    <Route path="/branding-pessoal" element={<BrandingPessoal />} />
                    <Route path="/quem-somos" element={<QuemSomos />} />
                    <Route path="/identidade-visual" element={<IdentidadeVisual />} />
                    <Route path="/gestao-redes-sociais" element={<GestaoRedesSociais />} />
                    <Route path="/naming" element={<Naming />} />
                    <Route path="/consultoria-360" element={<Consultoria360 />} />
                    <Route path="/cases/:slug" element={<CaseDetail />} />
                    <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
