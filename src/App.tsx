
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public pages
import Index from "./pages/Index";
import About from "./pages/About";
import Achievements from "./pages/Achievements";
import Teachers from "./pages/Teachers";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

// Admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NewsManagement from "./pages/admin/NewsManagement";
import NewsCreate from "./pages/admin/NewsCreate";
import NewsEdit from "./pages/admin/NewsEdit";
import AdminManagement from "./pages/admin/AdminManagement";
import AdminCreate from "./pages/admin/AdminCreate";
import AdminEdit from "./pages/admin/AdminEdit";
import Profile from "./pages/admin/Profile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/tentang-kami" element={<About />} />
            <Route path="/prestasi" element={<Achievements />} />
            <Route path="/profil-guru" element={<Teachers />} />
            <Route path="/hubungi-kami" element={<Contact />} />
            <Route path="/berita" element={<News />} />
            <Route path="/berita/:slug" element={<NewsDetail />} />
            
            {/* Admin Routes */}
            <Route path="/login-admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/news" element={<NewsManagement />} />
            <Route path="/admin/news/create" element={<NewsCreate />} />
            <Route path="/admin/news/edit/:id" element={<NewsEdit />} />
            <Route path="/admin/manage-admins" element={<AdminManagement />} />
            <Route path="/admin/manage-admins/create" element={<AdminCreate />} />
            <Route path="/admin/manage-admins/edit/:id" element={<AdminEdit />} />
            <Route path="/admin/profile" element={<Profile />} />
            
            {/* Catch All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
