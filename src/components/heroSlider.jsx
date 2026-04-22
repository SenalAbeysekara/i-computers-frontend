import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/slider/slide-1.png",
    title: "Upgrade your setup with better tech.",
    highlight: "Modern laptops and accessories",
    description:
      "Discover sleek laptops, reliable accessories, and a premium shopping experience designed to feel fast, simple, and clean.",
    primaryCta: { label: "Shop Laptops", to: "/products" },
    secondaryCta: { label: "Contact Us", to: "/contact" },
    imageClass: "object-cover object-center scale-100",
  },
  {
    image: "/slider/slide-2.png",
    title: "Powerful desktop setups for every desk.",
    highlight: "Gaming and productivity PCs",
    description:
      "Find desktop PCs, monitors, and peripherals that look premium, perform smoothly, and fit your daily workflow or gaming needs.",
    primaryCta: { label: "Browse Products", to: "/products" },
    secondaryCta: { label: "About Store", to: "/about" },
    imageClass: "object-cover object-center scale-100",
  },
  {
    image: "/slider/slide-3.png",
    title: "Complete your build with trusted components.",
    highlight: "GPUs, motherboards, SSDs, and more",
    description:
      "Shop the parts and accessories you need in one place, with a cleaner storefront and a modern premium look.",
    primaryCta: { label: "View Components", to: "/products" },
    secondaryCta: { label: "Get Support", to: "/contact" },
    imageClass: "object-cover object-center scale-100",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  return (
    <section className="section-shell pb-12 pt-10 md:pt-14">
      <div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-gradient-to-br from-[#0d1f3a] via-[#0a1730] to-[#081425] shadow-[0_24px_80px_rgba(2,8,23,0.55),0_0_0_1px_rgba(255,255,255,0.04),0_0_60px_rgba(59,130,246,0.12)]">
        <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-white/8" />
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 bg-gradient-to-b from-white/6 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`h-full w-full transition-transform duration-700 ${slide.imageClass}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#03101e]/90 via-[#061423]/70 to-[#0b1830]/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/88 via-transparent to-transparent" />

        <div className="relative z-10 flex min-h-[440px] items-start px-6 pb-20 pt-14 md:min-h-[470px] md:px-10 md:pb-24 md:pt-16 lg:min-h-[490px] lg:px-14 lg:pb-28 lg:pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              {activeSlide.title}
            </h1>

            <p className="mt-5 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
              {activeSlide.highlight}
            </p>

            <p className="mt-6 max-w-xl text-base leading-8 text-secondary/75 md:text-lg">
              {activeSlide.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={activeSlide.primaryCta.to}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
              >
                {activeSlide.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to={activeSlide.secondaryCta.to}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.18)] active:scale-[0.98]"
              >
                <span className="text-white transition-colors duration-300 group-hover:text-slate-900">
                  {activeSlide.secondaryCta.label}
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-6 right-6 z-20 flex items-center justify-between md:left-10 md:right-10 lg:left-14 lg:right-14">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex
                  ? "w-10 bg-accent"
                  : "w-2.5 bg-white/45 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevious}
              className="rounded-full border border-white/15 bg-black/30 p-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-white/10 hover:text-accent hover:shadow-[0_10px_24px_rgba(59,130,246,0.18)] active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="rounded-full border border-white/15 bg-black/30 p-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-white/10 hover:text-accent hover:shadow-[0_10px_24px_rgba(59,130,246,0.18)] active:scale-[0.98]"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}