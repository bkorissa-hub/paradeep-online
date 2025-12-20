import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Play, 
  Monitor, 
  Wrench, 
  Cpu, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    id: 1,
    title: "Complete Computer Solutions",
    subtitle: "For Home & Business",
    description: "Expert computer sales, repair, and services. Your one-stop shop for all technology needs.",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1920&q=80",
    cta: { text: "Explore Products", href: "/sales" },
  },
  {
    id: 2,
    title: "Professional Repair Services",
    subtitle: "Fast & Reliable",
    description: "Same-day repairs by certified technicians. We fix laptops, desktops, and all computer hardware.",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1920&q=80",
    cta: { text: "View Services", href: "/services" },
  },
  {
    id: 3,
    title: "Custom PC Builds",
    subtitle: "Built for Performance",
    description: "Get a custom-built PC tailored to your needs. Gaming, workstation, or everyday use.",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1920&q=80",
    cta: { text: "Get Started", href: "/services" },
  },
];

const features = [
  { icon: Monitor, text: "Quality Products" },
  { icon: Wrench, text: "Expert Repairs" },
  { icon: Cpu, text: "Custom Builds" },
  { icon: Headphones, text: "24/7 Support" },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);

  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Slider */}
      <div className="relative h-[600px] lg:h-[700px]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 gradient-hero opacity-90" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl">
                <span 
                  className={cn(
                    "inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-4",
                    "opacity-0 animate-fade-in-up",
                    index === currentSlide && "opacity-100"
                  )}
                  style={{ animationDelay: "100ms" }}
                >
                  {slide.subtitle}
                </span>
                <h1 
                  className={cn(
                    "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4",
                    "opacity-0 animate-fade-in-up",
                    index === currentSlide && "opacity-100"
                  )}
                  style={{ animationDelay: "200ms" }}
                >
                  {slide.title}
                </h1>
                <p 
                  className={cn(
                    "text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg",
                    "opacity-0 animate-fade-in-up",
                    index === currentSlide && "opacity-100"
                  )}
                  style={{ animationDelay: "300ms" }}
                >
                  {slide.description}
                </p>
                <div 
                  className={cn(
                    "flex flex-wrap gap-4",
                    "opacity-0 animate-fade-in-up",
                    index === currentSlide && "opacity-100"
                  )}
                  style={{ animationDelay: "400ms" }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    <Link to={slide.cta.href}>
                      {slide.cta.text}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Link to="/support">
                      Get Support
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-primary-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-primary-foreground" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentSlide 
                  ? "w-8 bg-primary-foreground" 
                  : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-8 right-8 z-20 p-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 transition-colors"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          <Play className={cn("h-4 w-4 text-primary-foreground", isPlaying && "opacity-50")} />
        </button>
      </div>

      {/* Features Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={feature.text}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
