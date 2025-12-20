import { useState } from "react";
import { X, Zap } from "lucide-react";

interface ScrollingHeadlineProps {
  enabled?: boolean;
}

const headlines = [
  "🔥 Special Offer: 20% off on all laptop repairs this week!",
  "💻 New arrivals: Latest gaming laptops now in stock",
  "🛠️ Free diagnostics on all hardware issues",
  "⚡ Same-day repair service available",
  "🎮 Custom PC builds starting from ₹35,000",
  "📞 24/7 Support hotline: +91 98765 43210",
];

export function ScrollingHeadline({ enabled = true }: ScrollingHeadlineProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!enabled || !isVisible) return null;

  return (
    <div className="bg-tech-blue text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 py-2 flex items-center">
        <div className="flex items-center gap-2 shrink-0 pr-4">
          <Zap className="h-4 w-4" />
          <span className="font-medium text-sm hidden sm:inline">Updates</span>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left whitespace-nowrap flex">
            {[...headlines, ...headlines].map((headline, index) => (
              <span key={index} className="text-sm px-8 inline-block">
                {headline}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 p-1 hover:bg-primary-foreground/10 rounded transition-colors ml-4"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
