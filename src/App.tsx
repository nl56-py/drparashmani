
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '@/components/ScrollToTop';

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Expertise from "./pages/Expertise";
import ExpertiseDetail from "./pages/ExpertiseDetail";
import UrologyInfo from "./pages/UrologyInfo";
import UrologyDetail from "./pages/UrologyDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import VideoGallery from "./pages/VideoGallery";
import VideoDetail from "./pages/VideoDetail";
import ContributionToNAUS from "./pages/ContributionToNAUS";
import DrAsTeacher from "./pages/DrAsTeacher";
import LecturesAbroad from "./pages/LecturesAbroad";
import LectureDetail from "./pages/LectureDetail";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBlogs from "./pages/admin/Blogs";
import AdminVideos from "./pages/admin/Videos";
import AdminContacts from "./pages/admin/Contacts";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLecturesAbroad from "./pages/admin/LecturesAbroad";

// Viewer pages
import ViewerLogin from "./pages/viewer/Login";
import ViewerContacts from "./pages/viewer/Contacts";
import ViewerViewed from "./pages/viewer/Viewed";
import ViewerProtectedRoute from "./components/viewer/ViewerProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AdminAuthProvider>
                <ScrollToTop />
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/expertise" element={<Expertise />} />
                  <Route path="/expertise/:slug" element={<ExpertiseDetail />} />
                  <Route path="/urology-info" element={<UrologyInfo />} />
                  <Route path="/urology-info/:slug" element={<UrologyDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/videos" element={<VideoGallery />} />
                  <Route path="/videos/:slug" element={<VideoDetail />} />
                  <Route path="/contribution-to-naus" element={<ContributionToNAUS />} />
                  <Route path="/dr-as-teacher" element={<DrAsTeacher />} />
                  <Route path="/lectures-abroad" element={<LecturesAbroad />} />
                  <Route path="/lectures-abroad/:slug" element={<LectureDetail />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/blogs" element={
                    <ProtectedRoute requiredRole="content">
                      <AdminBlogs />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/videos" element={
                    <ProtectedRoute requiredRole="content">
                      <AdminVideos />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/lectures-abroad" element={
                    <ProtectedRoute requiredRole="content">
                      <AdminLecturesAbroad />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/contacts" element={
                    <ProtectedRoute requiredRole="contacts">
                      <AdminContacts />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <ProtectedRoute requiredRole="super">
                      <AdminUsers />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/settings" element={
                    <ProtectedRoute>
                      <AdminSettings />
                    </ProtectedRoute>
                  } />
                  
                  {/* Viewer routes */}
                  <Route path="/viewer/login" element={<ViewerLogin />} />
                  <Route path="/viewer/contacts" element={
                    <ViewerProtectedRoute>
                      <ViewerContacts />
                    </ViewerProtectedRoute>
                  } />
                  <Route path="/viewer/viewed" element={
                    <ViewerProtectedRoute>
                      <ViewerViewed />
                    </ViewerProtectedRoute>
                  } />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AdminAuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
