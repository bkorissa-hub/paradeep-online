import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  X, 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Clock, 
  Star,
  ArrowRight,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  enabled?: boolean;
}

const quickLinks = [
  { name: "Track Your Ticket", href: "/support", icon: Headphones },
  { name: "Request Service", href: "/services", icon: ArrowRight },
  { name: "View Products", href: "/sales", icon: ArrowRight },
];

export function Sidebar({ enabled = true }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!enabled) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed right-0 top-1/2 -translate-y-1/2 z-40",
          "bg-primary text-primary-foreground",
          "px-2 py-4 rounded-l-lg shadow-lg",
          "hover:px-3 transition-all duration-200",
          "flex flex-col items-center gap-2",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <ChevronRight className="h-5 w-5 rotate-180" />
        <span className="text-xs font-medium writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
          Quick Help
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-lg z-50",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-display font-semibold text-lg text-foreground">Quick Help</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Contact Options */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Contact Us
              </h3>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Call Us</p>
                  <p className="text-xs text-muted-foreground">+91 98765 43210</p>
                </div>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Chat with us now</p>
                </div>
              </a>
            </div>

            {/* Business Hours */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Business Hours
              </h3>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground text-sm">Opening Hours</span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground ml-8">
                  <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Quick Links
              </h3>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
                  >
                    <span className="font-medium text-foreground text-sm">{link.name}</span>
                    <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="p-4 bg-tech-blue-light rounded-lg">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm font-medium text-foreground">4.9/5 Customer Rating</p>
              <p className="text-xs text-muted-foreground">Based on 500+ reviews</p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button className="w-full gradient-primary" asChild>
              <Link to="/support" onClick={() => setIsOpen(false)}>
                Create Support Ticket
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
