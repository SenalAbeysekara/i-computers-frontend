import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-primary">
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <img
              src="/logo.png"
              alt="Isuri Computer"
              className="h-12 w-auto object-contain md:h-14"
            />

            <p className="mt-6 max-w-md text-secondary/70 leading-8">
              Your modern computer store for laptops, desktops, parts, gaming
              gear, accessories, and reliable customer support.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Quick Links</h3>
            <div className="mt-6 space-y-4 text-secondary/85">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/products">Products</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Support</h3>
            <div className="mt-6 space-y-4 text-secondary/85">
              <FooterLink to="/my-orders">My Orders</FooterLink>
              <FooterLink to="/settings">My Account</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms-and-conditions">
                Terms & Conditions
              </FooterLink>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Contact Info</h3>
            <div className="mt-6 space-y-5 text-secondary/85">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <span>Sri Lanka</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span>+94 77 000 0000</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <span>info@isuricomputer.lk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-secondary/55">
          © 2026 Isuri Computer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="block">
      <span className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-accent">
        {children}
      </span>
    </Link>
  );
}