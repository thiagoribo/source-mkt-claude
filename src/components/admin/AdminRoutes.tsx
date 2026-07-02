import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminLayout from "./AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminTeamMembers = lazy(() => import("@/pages/admin/TeamMembers"));
const AdminTestimonials = lazy(() => import("@/pages/admin/Testimonials"));
const AdminCases = lazy(() => import("@/pages/admin/Cases"));
const AdminMedia = lazy(() => import("@/pages/admin/Media"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const AdminBlogPosts = lazy(() => import("@/pages/admin/BlogPosts"));
const AdminBlogPostEditor = lazy(() => import("@/pages/admin/BlogPostEditor"));
const AdminBlogCategories = lazy(() => import("@/pages/admin/BlogCategories"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export default function AdminRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Sonner />
        <Suspense fallback={null}>
          <Routes>
            <Route index element={<AdminLogin />} />
            <Route
              path="*"
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
          </Routes>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}
