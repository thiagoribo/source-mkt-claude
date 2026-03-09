import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";

// Public Pages
import Index from "./pages/Index";
import ConsultoriaEstrategica from "./pages/ConsultoriaEstrategica";
import BrandingEmpresarial from "./pages/BrandingEmpresarial";
import BrandingPessoal from "./pages/BrandingPessoal";
import QuemSomos from "./pages/QuemSomos";
import IdentidadeVisual from "./pages/IdentidadeVisual";
import GestaoRedesSociais from "./pages/GestaoRedesSociais";
import Naming from "./pages/Naming";
import CaseDetail from "./pages/CaseDetail";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import NotFound from "./pages/NotFound";

// Blog Pages
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPost from "./pages/blog/BlogPost";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTeamMembers from "./pages/admin/TeamMembers";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminCases from "./pages/admin/Cases";
import AdminMedia from "./pages/admin/Media";
import AdminSettings from "./pages/admin/Settings";
import AdminBlogPosts from "./pages/admin/BlogPosts";
import AdminBlogPostEditor from "./pages/admin/BlogPostEditor";
import AdminBlogCategories from "./pages/admin/BlogCategories";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SpeedInsights />
          <Analytics />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="team" element={<AdminTeamMembers />} />
                        <Route path="testimonials" element={<AdminTestimonials />} />
                        <Route path="cases" element={<AdminCases />} />
                        <Route path="media" element={<AdminMedia />} />
                        <Route path="settings" element={<AdminSettings />} />
                        <Route path="blog" element={<AdminBlogPosts />} />
                        <Route path="blog/new" element={<AdminBlogPostEditor />} />
                        <Route path="blog/:id" element={<AdminBlogPostEditor />} />
                        <Route path="blog/categories" element={<AdminBlogCategories />} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Blog Routes (use their own Layout) */}
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

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
                      <Route path="/cases/:slug" element={<CaseDetail />} />
                      <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
