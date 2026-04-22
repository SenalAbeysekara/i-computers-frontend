import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import getFormattedPrice from "../../utils/price-format";
import { CiEdit } from "react-icons/ci";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  PackagePlus,
  Shapes,
} from "lucide-react";
import LoadingAnimation from "../../components/loadingAnimation";
import DeleteModal from "../../components/deleteModal";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    if (!loading) return;

    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProducts(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, [loading]);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

  const paginatedProducts = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [products, pageNumber]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      visible: products.filter((item) => item.isVisible).length,
      hidden: products.filter((item) => !item.isVisible).length,
    };
  }, [products]);

  return (
    <div className="relative space-y-6 pb-24">
      <div className="grid gap-4 md:grid-cols-3">
        <QuickStat label="Catalog Items" value={stats.total} />
        <QuickStat label="Visible" value={stats.visible} />
        <QuickStat label="Hidden" value={stats.hidden} />
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#101b31] via-[#0d1729] to-[#0a1424] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
        <div className="absolute inset-x-0 top-0 h-[6px] bg-gradient-to-r from-blue-400 via-accent to-cyan-400" />

        <div className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Product Catalog
            </h2>
            <p className="mt-1 text-sm text-secondary/60">
              Manage products, pricing, visibility, and quick actions.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-secondary/70">
            Page{" "}
            <span className="font-semibold text-white">{pageNumber}</span> of{" "}
            <span className="font-semibold text-white">{totalPages}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[420px] items-center justify-center">
            <LoadingAnimation />
          </div>
        ) : products.length === 0 ? (
          <div className="px-6 py-16 text-center text-secondary/60">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto hide-scroll-track">
            <table className="min-w-[1180px] w-full text-sm">
              <thead className="bg-white/[0.04] text-secondary/55">
                <tr>
                  {[
                    "Product ID",
                    "Product",
                    "Price",
                    "Labelled",
                    "Category",
                    "Image",
                    "Visibility",
                    "Brand",
                    "Model",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.22em]"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.map((item, index) => (
                  <tr
                    key={item.productId}
                    className={`border-t border-white/10 transition-colors duration-300 hover:bg-white/[0.04] ${index % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"
                      }`}
                  >
                    <td className="px-5 py-4 font-semibold text-white">
                      {item.productId}
                    </td>

                    <td className="px-5 py-4">
                      <div className="max-w-[260px]">
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-secondary/50">
                          {item.description || "No description"}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-semibold text-white">
                      {getFormattedPrice(item.price)}
                    </td>

                    <td className="px-5 py-4 text-secondary/75">
                      {item.labelledPrice
                        ? getFormattedPrice(item.labelledPrice)
                        : "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-white/7 px-3 py-1 text-xs font-semibold text-white">
                        {item.category || "N/A"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white p-2">
                        <img
                          src={item.images?.[0] || "/logo.png"}
                          alt={item.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/logo.png";
                          }}
                        />
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${item.isVisible
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-slate-500/15 text-slate-300"
                          }`}
                      >
                        {item.isVisible ? (
                          <Eye className="h-3.5 w-3.5" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5" />
                        )}
                        {item.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-white">
                      {item.brand || "N/A"}
                    </td>

                    <td className="px-5 py-4 text-white">
                      {item.model || "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 text-2xl">
                        <Link
                          to="/admin/update-product"
                          state={item}
                          className="rounded-xl border border-white/10 p-2 text-secondary/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/5 hover:text-accent active:scale-[0.98]"
                        >
                          <CiEdit />
                        </Link>

                        <DeleteModal product={item} setLoading={setLoading} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[#0d1728] px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-secondary/60">
          Showing{" "}
          <span className="font-medium text-white">{paginatedProducts.length}</span>{" "}
          products on page{" "}
          <span className="font-medium text-white">{pageNumber}</span> of{" "}
          <span className="font-medium text-white">{totalPages}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber((value) => value - 1);
              } else {
                toast("You are on the first page");
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            onClick={() => {
              if (pageNumber < totalPages) {
                setPageNumber((value) => value + 1);
              } else {
                toast("You are on the last page");
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.32)] active:scale-[0.98]"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="sticky bottom-6 flex justify-end">
        <Link
          to="/admin/add-product"
          title="Add Product"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_16px_40px_rgba(59,130,246,0.30)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-[0_20px_48px_rgba(59,130,246,0.42)] active:scale-[0.96]"
        >
          <PackagePlus className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

function QuickStat({ label, value }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#101b30] to-[#0b1526] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-secondary/45">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>

        <div className="rounded-2xl bg-accent/12 p-3 text-accent">
          <Shapes className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}