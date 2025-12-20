import { useState } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PromotionalBannerProps {
  enabled?: boolean;
}

export function PromotionalBanner({ enabled = true }: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!enabled || !isVisible) return null;

  return (
    <div className="relative gradient-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
              <Gift className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-display font-bold text-primary-foreground text-lg">
                New Year Sale!!!
              </h3>
              <p className="text-primary-foreground/90 text-sm">
                Get up to 30% off on selected laptops and accessories. Limited time offer!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to="/sales">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              aria-label="Close banner"
            >
              <X className="h-5 w-5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
