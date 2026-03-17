import { lazy, Suspense } from "react";
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
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Blog Pages
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminTeamMembers = lazy(() => import("./pages/admin/TeamMembers"));
const AdminTestimonials = lazy(() => import("./pages/admin/Testimonials"));
const AdminCases = lazy(() => import("./pages/admin/Cases"));
const AdminMedia = lazy(() => import("./pages/admin/Media"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminBlogPosts = lazy(() => import("./pages/admin/BlogPosts"));
const AdminBlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const AdminBlogCategories = lazy(() => import("./pages/admin/BlogCategories"));

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
            <Suspense fallback={null}>
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
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
