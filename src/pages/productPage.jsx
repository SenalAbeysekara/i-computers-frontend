import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/loadingAnimation";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 8;

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
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category || "Others"))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((item) => {
      const matchesCategory =
        category === "All" || (item.category || "Others") === category;

      const haystack = [
        item.name,
        item.brand,
        item.model,
        item.productId,
        ...(item.altNames || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || haystack.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, category]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const paginatedProducts = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [searchQuery, category]);

  useEffect(() => {
    if (pageNumber > totalPages) {
      setPageNumber(totalPages);
    }
  }, [pageNumber, totalPages]);

  return (
    <div className="section-shell py-10">
      <div className="mb-8 rounded-[34px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-6 shadow-2xl shadow-black/15 md:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
          Product Collection
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Find the right computer product faster
        </h1>

        <p className="mt-3 max-w-2xl text-secondary/65">
          Search by brand, product name, model, product ID, or alternative names.
          Filter by category with a cleaner, more modern layout.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/8">
          <Search className="h-5 w-5 text-secondary/50" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laptops, PCs, GPUs, keyboards..."
            className="w-full bg-transparent outline-none placeholder:text-secondary/40"
          />
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-sm text-secondary/55">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Browse by category</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-accent text-white shadow-[0_10px_24px_rgba(59,130,246,0.30)]"
                      : "border border-white/10 bg-white/5 text-secondary/75 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-secondary/60">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </p>

            <p className="hidden text-sm text-secondary/45 md:block">
              {category === "All" ? "All categories" : category}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-secondary/60">
              No products found for this search.
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber((prev) => prev - 1);
                    }
                  }}
                  disabled={pageNumber === 1}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <span className="min-w-[120px] text-center text-sm text-secondary/65">
                  Page {pageNumber} of {totalPages}
                </span>

                <button
                  onClick={() => {
                    if (pageNumber < totalPages) {
                      setPageNumber((prev) => prev + 1);
                    }
                  }}
                  disabled={pageNumber === totalPages}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.22)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}