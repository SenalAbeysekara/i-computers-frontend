import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import getFormattedPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";

export default function ProductCard({ product }) {
  const images = useMemo(() => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      return product.images;
    }
    if (product?.image) {
      return [product.image];
    }
    return ["/logo.png"];
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  const labelledPrice = Number(product?.labelledPrice || 0);
  const price = Number(product?.price || 0);

  const hasDiscount = labelledPrice > price && price > 0;
  const discount =
    hasDiscount && labelledPrice > 0
      ? Math.round(((labelledPrice - price) / labelledPrice) * 100)
      : 0;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-300/70 bg-[#f3f6fb] text-slate-900 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-400/80">
      <Link to={`/overview/${product.productId}`} className="block">
        <div className="relative overflow-hidden bg-[#e9eef5]">
          {hasDiscount && (
            <div className="absolute left-5 top-3 z-20 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
              -{discount}%
            </div>
          )}

          <div className="relative h-[260px] overflow-hidden bg-[#e9eef5]">
            {images.map((img, index) => (
              <img
                key={`${img}-${index}`}
                src={img}
                alt={product?.name || "Product"}
                className={`absolute inset-0 h-full w-full object-contain p-8 transition-all duration-700 group-hover:scale-105 ${
                  index === activeImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur-sm">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImage(index);
                  }}
                  className={`h-2 w-2 rounded-full transition ${
                    index === activeImage ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-500">
          <span className="truncate">{product?.category || "Products"}</span>
          <span className="truncate text-right">{product?.brand || "Brand"}</span>
        </div>

        <h3 className="mt-4 line-clamp-2 min-h-[52px] text-[18px] font-semibold leading-[1.25] text-slate-900">
          {product?.name || "Product Name"}
        </h3>

        <p className="mt-3 line-clamp-2 min-h-[44px] text-[14px] leading-6 text-slate-600">
          {product?.description || "Premium product from your catalog."}
        </p>

        <div className="mt-auto pt-4">
          {hasDiscount ? (
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[17px] font-semibold text-slate-900">
                {getFormattedPrice(price)}
              </span>
              <span className="text-[14px] font-medium text-slate-400 line-through">
                {getFormattedPrice(labelledPrice)}
              </span>
            </div>
          ) : (
            <span className="text-[17px] font-semibold text-slate-900">
              {getFormattedPrice(price)}
            </span>
          )}
        </div>

        <div className="mt-5">
          <button
            onClick={() => {
              addToCart(product, 1);
              toast.success(`${product.name} added to cart`);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}