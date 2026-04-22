import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/loadingAnimation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import HeroSlider from "../components/heroSlider";

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [dealsIndex, setDealsIndex] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products")
      .then((response) => {
        setProducts(
          Array.isArray(response.data)
            ? response.data.filter((item) => item.isVisible !== false)
            : []
        );
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => products.slice(0, 12), [products]);

  const deals = useMemo(
    () =>
      products.filter(
        (item) => Number(item?.labelledPrice) > Number(item?.price)
      ),
    [products]
  );

  const specialDeals = deals.length ? deals : featured;

  const featuredChunks = useMemo(() => chunkProducts(featured, 4), [featured]);
  const dealsChunks = useMemo(() => chunkProducts(specialDeals, 4), [specialDeals]);

  useEffect(() => {
    if (featuredIndex > featuredChunks.length - 1) setFeaturedIndex(0);
  }, [featuredChunks, featuredIndex]);

  useEffect(() => {
    if (dealsIndex > dealsChunks.length - 1) setDealsIndex(0);
  }, [dealsChunks, dealsIndex]);

  return (
    <div>
      <HeroSlider />

      <section className="section-shell py-8">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-accent/15 to-white/5 p-8 md:p-10">
          <SectionHeader
            title="Featured Products"
            desc="Fresh picks from your catalog in the new premium layout."
            action="Browse all"
          />

          {loading ? (
            <LoadingAnimation />
          ) : (
            <CardCarousel
              chunks={featuredChunks}
              activeIndex={featuredIndex}
              setActiveIndex={setFeaturedIndex}
            />
          )}
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-accent/15 to-white/5 p-8 md:p-10">
          <SectionHeader
            title="Special Deals"
            desc="Highlighted discounts and best-value products for customers."
            action="View products"
          />

          {loading ? (
            <LoadingAnimation />
          ) : (
            <CardCarousel
              chunks={dealsChunks}
              activeIndex={dealsIndex}
              setActiveIndex={setDealsIndex}
            />
          )}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, desc, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-3xl font-black">{title}</h2>
        <p className="mt-2 text-secondary/65">{desc}</p>
      </div>

      <Link
        to="/products"
        className="inline-flex items-center gap-2 font-semibold text-white transition-all duration-200 hover:translate-x-1 hover:text-accent"
      >
        {action}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function CardCarousel({ chunks, activeIndex, setActiveIndex }) {
  if (!chunks.length) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-secondary/60">
        No products available.
      </div>
    );
  }

  const canSlide = chunks.length > 1;

  function prevSlide() {
    setActiveIndex((prev) => (prev === 0 ? chunks.length - 1 : prev - 1));
  }

  function nextSlide() {
    setActiveIndex((prev) => (prev === chunks.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="space-y-5">
      <div className="relative px-6 md:px-8">
        {canSlide && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0f172a]/90 text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-accent hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0f172a]/90 text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-accent hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {chunks[activeIndex].map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </div>

      {canSlide && (
        <div className="flex items-center justify-center gap-2">
          {chunks.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-accent"
                  : "w-2.5 bg-white/35 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function chunkProducts(products, size) {
  const chunks = [];
  for (let i = 0; i < products.length; i += size) {
    chunks.push(products.slice(i, i + size));
  }
  return chunks;
}