import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Headphones, 
  MessageSquare, 
  FileText, 
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Phone,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does a typical repair take?",
    answer: "Most repairs are completed within 24-48 hours. Complex repairs like motherboard replacements may take 3-5 business days. We'll provide an estimate when you bring in your device.",
  },
  {
    question: "Do you offer warranty on repairs?",
    answer: "Yes! All our repairs come with a 90-day warranty covering parts and labor. If the same issue occurs within this period, we'll fix it at no additional cost.",
  },
  {
    question: "Can you recover data from a damaged hard drive?",
    answer: "In most cases, yes. Our data recovery service has a high success rate. The complexity depends on the type of damage. We provide a free assessment before any recovery attempt.",
  },
  {
    question: "Do you provide on-site support for businesses?",
    answer: "Absolutely! We offer on-site support for businesses including network setup, system maintenance, and emergency repairs. Contact us to discuss a support plan.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit/debit cards, UPI payments, and bank transfers. For businesses, we also offer invoice-based payments with NET 30 terms.",
  },
  {
    question: "Can I track the status of my repair?",
    answer: "Yes! When you submit a repair request, you'll receive a ticket number. Use this to track your repair status through our support system or by contacting us directly.",
  },
];

const Support = () => {
  const { toast } = useToast();
  const [ticketSearch, setTicketSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ticket Submitted!",
      description: "We'll get back to you within 24 hours. Check your email for the ticket number.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Support Center
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Need help? We're here for you. Create a support ticket or browse our FAQ section.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <a 
              href="tel:+919876543210"
              className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Call Us</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </a>
            <a 
              href="mailto:support@paradeeponline.com"
              className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email Support</p>
                <p className="text-sm text-muted-foreground">support@paradeeponline.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Response Time</p>
                <p className="text-sm text-muted-foreground">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Ticket */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">Track Your Ticket</h2>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your ticket number (e.g., TKT-12345)"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
              />
              <Button className="shrink-0">
                Track
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Create Ticket Form */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">Create Support Ticket</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="repair">Repair Issue</SelectItem>
                        <SelectItem value="product">Product Inquiry</SelectItem>
                        <SelectItem value="service">Service Request</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please provide details about your issue or inquiry..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gradient-primary">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Ticket
                </Button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
