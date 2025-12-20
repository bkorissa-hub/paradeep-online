
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Award, 
  Clock, 
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { value: "14+", label: "Years Experience" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "5,000+", label: "Repairs Completed" },
  { value: "500+", label: "Custom Builds" },
];

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "We never compromise on quality. Every product we sell and every repair we do meets our high standards.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We listen, understand, and deliver solutions that work for you.",
  },
  {
    icon: Award,
    title: "Expertise",
    description: "Our certified technicians bring years of experience and continuous training to every job.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Count on us for timely service, honest advice, and support you can trust.",
  },
];

const team = [
  {
    name: "Rakesh Mohanty",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    description: "15+ years in computer hardware with a passion for customer service.",
  },
  {
    name: "Sunita Das",
    role: "Service Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    description: "Expert in repair management and customer relations.",
  },
  {
    name: "Amit Sahoo",
    role: "Senior Technician",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    description: "Specializes in data recovery and custom PC builds.",
  },
];

const milestones = [
  { year: "2010", event: "Founded Paradeep Online Computer Services" },
  { year: "2013", event: "Expanded to custom PC building services" },
  { year: "2016", event: "Opened second service center" },
  { year: "2019", event: "Launched on-site support services" },
  { year: "2022", event: "Reached 10,000 satisfied customers" },
  { year: "2024", event: "Launched new website and online support" },
];

const About = () => {
  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About Us
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Your trusted partner for computer sales, service, and repair since 2010.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building Trust in Technology Since 2010
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Paradeep Online Computer Services started with a simple mission: to provide honest, reliable, and affordable computer services to our community. What began as a small repair shop has grown into a full-service technology center serving thousands of customers.
                </p>
                <p>
                  Our founder, started the business with a vision to bridge the gap between complex technology and everyday users. Today, we continue that mission with a team of dedicated professionals who share the same passion for technology and customer service.
                </p>
                <p>
                  We take pride in our work, standing behind every repair, every sale, and every service we provide. Our customers aren't just clients – they're neighbors, friends, and partners in our journey.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
                alt="Our workshop"
                className="rounded-xl shadow-card"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <p className="font-display font-bold text-3xl">14+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              What Drives Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 bg-card rounded-xl border border-border text-center"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Meet the Experts
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center group"
              >
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Milestones
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-4 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    <Calendar className="h-5 w-5" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-display font-bold text-primary">{milestone.year}</p>
                  <p className="text-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Visit Us
              </span>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Location
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      Paradeep Online, Unit-1, Vijaya Market, Badapadia<br />
                      Paradeep, Odisha - 754142, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">+91 98538 39432</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">mail@paradiponline.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="text-muted-foreground">
                      Monday - Saturday: 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-xl overflow-hidden h-80 lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59772.40252039!2d86.6001!3d20.2644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7a66c2e8beb%3A0x8fba2da5aac6b94!2sParadeep%2C%20Odisha!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
