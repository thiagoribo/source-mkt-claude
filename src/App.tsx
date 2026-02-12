import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ConsultoriaEstrategica from "./pages/ConsultoriaEstrategica";
import BrandingEmpresarial from "./pages/BrandingEmpresarial";
import BrandingPessoal from "./pages/BrandingPessoal";
import QuemSomos from "./pages/QuemSomos";
import IdentidadeVisual from "./pages/IdentidadeVisual";
import GestaoRedesSociais from "./pages/GestaoRedesSociais";
import Naming from "./pages/Naming";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
