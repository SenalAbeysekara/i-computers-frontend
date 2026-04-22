import { Cpu, ShieldCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="section-shell py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[36px] glass p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
            About Us
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-black md:text-5xl">
                Built for modern computer shopping
              </h1>
              <p className="mt-5 max-w-3xl leading-8 text-secondary/70 text-justify">
                Isuri Computer is a modern computer store focused on laptops,
                desktops, components, accessories, and reliable customer
                support. This new design gives your brand a cleaner and more
                professional online presence.
              </p>
              <p className="mt-4 max-w-3xl leading-8 text-secondary/70 text-justify">
                Whether customers are shopping for work, study, or gaming, the
                goal is to make product discovery, ordering, and support feel
                smooth and trustworthy.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <div className="flex justify-center">
                <img
                  src="/logo.png"
                  alt="Isuri Computer"
                  className="h-15 w-auto object-contain"
                />
              </div>
              <div className="mt-6 space-y-4">
                <Highlight
                  icon={<Sparkles className="h-5 w-5" />}
                  title="Clean shopping experience"
                  text="Simple, eye-catching pages that feel modern and premium."
                />
                <Highlight
                  icon={<Cpu className="h-5 w-5" />}
                  title="Tech-focused product range"
                  text="Perfect for laptops, desktops, parts, peripherals, and accessories."
                />
                <Highlight
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Trust and support"
                  text="A store design that feels reliable before and after each purchase."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Highlight({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="mb-3 text-accent">{icon}</div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-secondary/70">{text}</p>
    </div>
  );
}