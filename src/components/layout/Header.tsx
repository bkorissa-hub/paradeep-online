import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, Lock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-paradeep-online.png";

const ADMIN_PIN = "9238023409";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Sales", href: "/sales" },
  { name: "Services", href: "/services" },
  { name: "Support", href: "/support" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [adminError, setAdminError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === ADMIN_PIN) {
      setAdminError("");
      setShowAdminPin(false);
      setAdminPin("");
      navigate("/admin");
    } else {
      setAdminError("Wrong PIN");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar with contact info + location */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex items-center text-sm">
          {/* Left: contact */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+919853839432"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+91 98538 39432</span>
            </a>
            <a
              href="mailto:mail@paradiponline.com"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>mail@paradiponline.com</span>
            </a>
          </div>

          {/* Center: location + GST */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 text-xs text-primary-foreground/90">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                Paradip, Odisha, India - 754142 | GSTIN - 21BYBPK4821R2Z9
              </span>
            </div>
          </div>

          {/* Right: timing */}
          <div className="text-primary-foreground/80 text-xs">
            Mon - Sat: 9:00 AM - 9:00 PM
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo only */}
          <Link to="/" className="flex items-center">
            <div className="h-16 flex items-center">
              <img
                src={logo}
                alt="Paradeep Online Computer Service – Your Trusted IT Navigator"
                className="h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Admin (desktop) */}
          <div className="hidden lg:flex items-center gap-3 relative">
            <Button className="gradient-primary shadow-glow">
              Get Support
            </Button>

            {/* Admin trigger */}
            <button
              type="button"
              onClick={() => {
                setShowAdminPin((v) => !v);
                setAdminError("");
              }}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Lock className="h-3 w-3" />
              <span>Admin</span>
            </button>

            {/* Tiny PIN popup */}
            {showAdminPin && (
              <form
                onSubmit={handleAdminSubmit}
                className="absolute right-0 top-8 mt-1 w-44 rounded-md border border-slate-200 bg-white shadow-md px-2 py-2 text-[11px] space-y-1"
              >
                <label className="text-[10px] uppercase tracking-wide text-slate-500">
                  Enter PIN
                </label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full rounded border border-slate-300 px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={10}
                  autoFocus
                />
                {adminError && (
                  <p className="text-[10px] text-red-600">{adminError}</p>
                )}
                <div className="flex justify-end gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminPin(false);
                      setAdminPin("");
                      setAdminError("");
                    }}
                    className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2 py-1 rounded bg-blue-600 text-white text-[11px] hover:bg-blue-700"
                  >
                    Go
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Button className="mt-4 gradient-primary shadow-glow">
                Get Support
              </Button>

              {/* Inline PIN for mobile */}
              <form
                onSubmit={handleAdminSubmit}
                className="mt-3 px-4 flex items-center gap-2"
              >
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="flex-1 rounded border border-slate-300 px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Admin PIN"
                  maxLength={10}
                />
                <button
                  type="submit"
                  className="rounded bg-blue-600 text-white text-xs px-3 py-2 hover:bg-blue-700"
                >
                  Go
                </button>
              </form>
              {adminError && (
                <p className="mt-1 px-4 text-[11px] text-red-600">
                  {adminError}
                </p>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
