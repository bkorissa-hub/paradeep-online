import { Link } from "react-router-dom";
import { 
  Wrench, 
  Monitor, 
  Cpu, 
  Truck, 
  HardDrive, 
  Network,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Wrench,
    title: "Hardware Repair",
    description: "Expert diagnosis and repair for laptops, desktops, and peripherals.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Monitor,
    title: "Software Services",
    description: "OS installation, virus removal, software setup, and optimization.",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Cpu,
    title: "Custom Builds",
    description: "Custom PC builds for gaming, workstation, or everyday computing.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Truck,
    title: "On-site Support",
    description: "We come to you. On-site repairs and installations available.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Recover your precious data from damaged or corrupted drives.",
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: Network,
    title: "Network Setup",
    description: "Complete network solutions for home and business environments.",
    color: "bg-cyan-500/10 text-cyan-600",
  },
];

export function ServicesHighlight() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Computer Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From repairs to custom builds, we provide comprehensive services for all your technology needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to="/services"
              className={cn(
                "group p-6 bg-card rounded-xl border border-border",
                "hover:shadow-card hover:border-primary/20 transition-all duration-300",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center mb-4", service.color)}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
