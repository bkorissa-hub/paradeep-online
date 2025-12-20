
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Monitor, 
  Cpu, 
  Truck, 
  HardDrive, 
  Network,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Wrench,
    title: "Hardware Repair",
    description: "Expert diagnosis and repair for laptops, desktops, and all peripherals. We fix screens, keyboards, motherboards, and more.",
    features: ["Screen replacement", "Keyboard repair", "Battery replacement", "Motherboard repair", "Port repairs"],
    color: "bg-blue-500/10 text-blue-600",
    price: "Starting ₹500",
  },
  {
    icon: Monitor,
    title: "Software Services",
    description: "Complete software solutions including OS installation, virus removal, driver updates, and system optimization.",
    features: ["OS installation", "Virus removal", "Software setup", "Driver updates", "Performance tuning"],
    color: "bg-green-500/10 text-green-600",
    price: "Starting ₹300",
  },
  {
    icon: Cpu,
    title: "Custom PC Builds",
    description: "Build your dream PC with our expert guidance. Gaming rigs, workstations, or everyday computers tailored to your needs.",
    features: ["Component selection", "Assembly & testing", "Cable management", "BIOS optimization", "Warranty support"],
    color: "bg-purple-500/10 text-purple-600",
    price: "Starting ₹2,000",
  },
  {
    icon: Truck,
    title: "On-site Support",
    description: "Can't bring your computer to us? We'll come to you! On-site repairs and installations for homes and businesses.",
    features: ["Home visits", "Office support", "Network setup", "System migration", "Training"],
    color: "bg-orange-500/10 text-orange-600",
    price: "Starting ₹800",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Lost your precious data? Our experts can recover files from damaged, corrupted, or formatted drives.",
    features: ["HDD recovery", "SSD recovery", "Flash drive recovery", "RAID recovery", "Deleted file recovery"],
    color: "bg-red-500/10 text-red-600",
    price: "Starting ₹1,500",
  },
  {
    icon: Network,
    title: "Network Setup",
    description: "Complete networking solutions for home and business. WiFi setup, LAN installation, and security configuration.",
    features: ["WiFi setup", "LAN cabling", "Router config", "Security setup", "VPN configuration"],
    color: "bg-cyan-500/10 text-cyan-600",
    price: "Starting ₹1,000",
  },
];

const whyChooseUs = [
  { icon: Shield, title: "Certified Technicians", description: "All our technicians are certified and experienced" },
  { icon: Zap, title: "Fast Turnaround", description: "Most repairs completed within 24-48 hours" },
  { icon: Clock, title: "Flexible Hours", description: "Open 7 days a week for your convenience" },
  { icon: CheckCircle, title: "Quality Guarantee", description: "90-day warranty on all repairs" },
];

const Services = () => {
  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Services
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Complete computer services for all your technology needs. From repairs to custom builds, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={cn(
                  "p-6 bg-card rounded-xl border border-border",
                  "hover:shadow-card hover:border-primary/20 transition-all duration-300",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center mb-4", service.color)}>
                  <service.icon className="h-7 w-7" />
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="font-semibold text-primary">{service.price}</span>
                  <Button size="sm" variant="outline">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Your Trusted Tech Partner
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us today for a free consultation. Our experts are ready to help with all your computer needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary" asChild>
                <a href="tel:+919876543210">
                  <Phone className="mr-2 h-5 w-5" />
                  Call: +91 98765 43210
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
