import { Link } from "react-router-dom";
import {
  Monitor,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Sales", href: "/sales" },
  { name: "Services", href: "/services" },
  { name: "Support", href: "/support" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

const services = [
  "Computer & Laptop Repair",
  "Software Installation & Support",
  "Custom PC Builds",
  "On-site IT Support",
  "Network & Wi‑Fi Setup",
  "CCTV & Security Solutions",
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/paradiponline",
    label: "Facebook",
  },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-950 text-slate-100 mt-10">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand / About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="h-6 w-6 text-blue-400" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  Paradeep Online Computer Service
                </span>
                <span className="text-[11px] text-slate-400">
                  Your IT partner in Paradip, Odisha
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We provide end‑to‑end computer sales & service, AMC, networking,
              CCTV and IT support for homes and businesses in and around Paradip
              and Jagatsinghpur.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-xs text-slate-300">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="hover:text-blue-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Our Services</h3>
            <ul className="space-y-1 text-xs text-slate-300">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact & social */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-[2px] h-4 w-4 text-blue-400" />
                <span>
                  Friends Colony / Kujang,
                  <br />
                  Paradip, Jagatsinghpur,
                  <br />
                  Odisha, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:+919853839432" className="hover:text-blue-300">
                  +91-9853839432
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a
                  href="mailto:info@paradiponline.com"
                  className="hover:text-blue-300 break-all"
                >
                  info@paradiponline.com
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <h4 className="text-xs font-semibold mb-2">Follow us</h4>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-slate-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-400">
            © {year} Paradeep Online Computer Service. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Powered by Paradeep Online · IT &amp; Automation Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
