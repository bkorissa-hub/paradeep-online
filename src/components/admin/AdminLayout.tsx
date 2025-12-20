import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  Menu,
  X,
  Megaphone,
  PanelRight,
  Type,
  ChevronDown,
  ChevronRight,
  Home,
  ShoppingBag,
  Wrench,
  HeadphonesIcon,
  Users,
  BookOpen,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ADMIN_PIN = "9238023409"; // temporary PIN

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contentOpen, setContentOpen] = useState(true);
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const contentNavItems = [
    { icon: Type, label: "Header", path: "/admin/content/header" },
    { icon: Image, label: "Hero Section", path: "/admin/content/hero" },
    { icon: Megaphone, label: "Headlines", path: "/admin/content/headlines" },
    { icon: FileText, label: "Banners", path: "/admin/content/banners" },
    { icon: PanelRight, label: "Sidebar", path: "/admin/content/sidebar" },
    { icon: Home, label: "Footer", path: "/admin/content/footer" },
  ];

  const pageNavItems = [
    { icon: Home, label: "Home Page", path: "/admin/pages/home" },
    { icon: ShoppingBag, label: "Sales Page", path: "/admin/pages/sales" },
    { icon: Wrench, label: "Services Page", path: "/admin/pages/services" },
    {
      icon: HeadphonesIcon,
      label: "Support Page",
      path: "/admin/pages/support",
    },
    { icon: Users, label: "About Page", path: "/admin/pages/about" },
    { icon: BookOpen, label: "Blog Page", path: "/admin/pages/blog" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSubmitPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  // PIN gate: show this until authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="bg-white border border-slate-200 rounded-xl shadow-md px-6 py-8 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-blue-600" />
            <h1 className="text-lg font-semibold text-slate-900">
              Admin Access
            </h1>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            This section is restricted. Enter the admin PIN to continue.
          </p>
          <form onSubmit={handleSubmitPin} className="space-y-3">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter admin PIN"
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-600" aria-live="polite">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Normal admin layout once PIN is validated
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r border-border bg-card transition-all duration-200",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="text-sm font-semibold">Admin Panel</span>
            )}
          </Link>
          <button
            type="button"
            className="p-1 rounded-md hover:bg-secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Menu className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        <nav className="px-2 py-4 space-y-4 text-sm">
          {/* Main navigation */}
          <div>
            {sidebarOpen && (
              <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Main
              </p>
            )}
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Content navigation */}
          <Collapsible
            open={contentOpen}
            onOpenChange={setContentOpen}
            className="space-y-1"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground">
              <span className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                {sidebarOpen && <span>Content</span>}
              </span>
              {sidebarOpen && (
                <span>
                  {contentOpen ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </span>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-1 space-y-1">
                {contentNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition-colors",
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Page navigation */}
          <div>
            {sidebarOpen && (
              <p className="px-2 mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Pages
              </p>
            )}
            <div className="space-y-1">
              {pageNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen bg-gradient-subtle">
        <div className="border-b border-border bg-card/80 backdrop-blur">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-foreground">
                Admin Panel
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage content and pages for Paradeep Online
              </p>
            </div>
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              ← Back to website
            </Link>
          </div>
        </div>

        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
