import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Services from "./pages/Services";
import Support from "./pages/Support";
import About from "./pages/About";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import HeaderContent from "./pages/admin/content/HeaderContent";
import HeroContent from "./pages/admin/content/HeroContent";
import HeadlinesContent from "./pages/admin/content/HeadlinesContent";
import BannersContent from "./pages/admin/content/BannersContent";
import SidebarContent from "./pages/admin/content/SidebarContent";
import FooterContent from "./pages/admin/content/FooterContent";

import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/services" element={<Services />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Route>

          {/* Admin routes with admin layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="content/header" element={<HeaderContent />} />
            <Route path="content/hero" element={<HeroContent />} />
            <Route path="content/headlines" element={<HeadlinesContent />} />
            <Route path="content/banners" element={<BannersContent />} />
            <Route path="content/sidebar" element={<SidebarContent />} />
            <Route path="content/footer" element={<FooterContent />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
