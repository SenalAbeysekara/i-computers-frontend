import { Clock3, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="section-shell py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] glass p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-5xl">
              Let customers reach you easily
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-secondary/70">
              Use this page to show your store contact details clearly. Replace
              the sample information below with your real phone number, email,
              address, WhatsApp, and opening hours.
            </p>

            <div className="mt-8 space-y-4">
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value="+94 77 000 0000"
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value="info@isuricomputer.lk"
              />
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Location"
                value="Sri Lanka"
              />
              <ContactRow
                icon={<Clock3 className="h-5 w-5" />}
                label="Business Hours"
                value="Mon - Sat | 9:00 AM - 6:00 PM"
              />
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-accent/15 to-white/5 p-8 md:p-10">
            <h2 className="text-2xl font-black">Quick message</h2>
            <p className="mt-2 text-secondary/65">
              This section can later be connected to email, WhatsApp, or a
              contact form backend.
            </p>

            <div className="mt-6 space-y-4">
              <input
                placeholder="Your Name"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none transition-all duration-300 hover:border-white/20 hover:bg-white/8 focus:border-accent"
              />
              <input
                placeholder="Your Email"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none transition-all duration-300 hover:border-white/20 hover:bg-white/8 focus:border-accent"
              />
              <textarea
                placeholder="Your Message"
                rows="6"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none transition-all duration-300 hover:border-white/20 hover:bg-white/8 focus:border-accent"
              />
              <button className="rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
      <div className="mt-1 text-accent">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-secondary/45">
          {label}
        </p>
        <p className="mt-2 font-medium text-secondary/85">{value}</p>
      </div>
    </div>
  );
}