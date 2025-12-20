// Admin Panel
// Manage content and pages for Paradeep Online

import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const ADMIN_PIN = "9238023409" // temporary PIN

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [contentOpen, setContentOpen] = useState(true)
  const [catalogOpen, setCatalogOpen] = useState(true)
  const [blogOpen, setBlogOpen] = useState(true)
  const [pin, setPin] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const location = useLocation()

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ]

  const contentNavItems = [
    { icon: Type, label: "Header", path: "/admin/content/header" },
    { icon: Image, label: "Hero Section", path: "/admin/content/hero" },
    { icon: Megaphone, label: "Headlines", path: "/admin/content/headlines" },
    { icon: FileText, label: "Banners", path: "/admin/content/banners" },
    { icon: PanelRight, label: "Sidebar", path: "/admin/content/sidebar" },
    { icon: Home, label: "Footer", path: "/admin/content/footer" },
  ]

  // New groups for managers
  const catalogNavItems = [
    { icon: ShoppingBag, label: "Products", path: "/admin/products" },
    { icon: Wrench, label: "Services", path: "/admin/services" },
  ]

  const blogNavItems = [
    { icon: BookOpen, label: "Blog", path: "/admin/blog" },
  ]

  const pageNavItems = [
    { icon: Home, label: "Home Page", path: "/admin/pages/home" },
    { icon: ShoppingBag, label: "Sales Page", path: "/admin/pages/sales" },
    { icon: Wrench, label: "Services Page", path: "/admin/pages/services" },
    { icon: HeadphonesIcon, label: "Support Page", path: "/admin/pages/support" },
    { icon: Users, label: "About Page", path: "/admin/pages/about" },
    { icon: BookOpen, label: "Blog Page", path: "/admin/pages/blog" },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleSubmitPin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      setAuthenticated(true)
      setError("")
    } else {
      setError("Invalid PIN. Please try again.")
    }
  }

  const NavLinkRow = ({
    icon: Icon,
    label,
    path,
  }: {
    icon: React.ComponentType<any>
    label: string
    path: string
  }) => (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
        isActive(path)
          ? "bg-gray-800 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )

  // PIN gate: show this until authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-gray-700" />
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          </div>
          <p className="text-gray-600 mb-6">
            This section is restricted. Enter the admin PIN to continue.
          </p>

          <form onSubmit={handleSubmitPin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>

          <div className="mt-6 text-xs text-gray-500">
            Manage content and pages for Paradeep Online
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative z-10 w-72 bg-gray-900 text-gray-100 flex flex-col",
          "transition-all duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <div className={cn("flex items-center gap-2", !sidebarOpen && "md:hidden")}>
            <div className="h-8 w-8 rounded bg-gray-800 flex items-center justify-center">
              <span className="text-lg">🏨</span>
            </div>
            <span className="font-semibold">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          {/* Main */}
          <div>
            <div className="px-3 text-xs uppercase tracking-wider text-gray-400 mb-2">
              Main
            </div>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLinkRow key={item.path} icon={item.icon} label={item.label} path={item.path} />
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
              <div className="flex items-center justify-between px-3 mb-2">
                <div className="text-xs uppercase tracking-wider text-gray-400">Content</div>
                <CollapsibleTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-200">
                    {contentOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="space-y-1">
                  {contentNavItems.map((item) => (
                    <NavLinkRow key={item.path} icon={item.icon} label={item.label} path={item.path} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Catalog (Products/Services) */}
          <div>
            <Collapsible open={catalogOpen} onOpenChange={setCatalogOpen}>
              <div className="flex items-center justify-between px-3 mb-2">
                <div className="text-xs uppercase tracking-wider text-gray-400">Catalog</div>
                <CollapsibleTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-200">
                    {catalogOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="space-y-1">
                  {catalogNavItems.map((item) => (
                    <NavLinkRow key={item.path} icon={item.icon} label={item.label} path={item.path} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Blog */}
          <div>
            <Collapsible open={blogOpen} onOpenChange={setBlogOpen}>
              <div className="flex items-center justify-between px-3 mb-2">
                <div className="text-xs uppercase tracking-wider text-gray-400">Blog</div>
                <CollapsibleTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-200">
                    {blogOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="space-y-1">
                  {blogNavItems.map((item) => (
                    <NavLinkRow key={item.path} icon={item.icon} label={item.label} path={item.path} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Pages */}
          <div>
            <div className="px-3 text-xs uppercase tracking-wider text-gray-400 mb-2">
              Pages
            </div>
            <div className="space-y-1">
              {pageNavItems.map((item) => (
                <NavLinkRow key={item.path} icon={item.icon} label={item.label} path={item.path} />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-base font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
          <div className="text-xs text-gray-500">Paradeep Online CMS</div>
        </header>

        {/* Routed pages */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
