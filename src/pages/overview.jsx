import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";
import { ShoppingCart, CreditCard, BadgeCheck } from "lucide-react";

export default function Overview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products/" + productId)
      .then((response) => setProduct(response.data));
  }, [productId]);

  if (!product) {
    return (
      <div className="section-shell py-16">
        <LoadingAnimation />
      </div>
    );
  }

  const hasDiscount = Number(product.labelledPrice) > Number(product.price);

  return (
    <div className="section-shell py-10">
      <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-5 shadow-2xl shadow-black/20">
          <ImageSlideShow images={product.images} />
        </div>

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-6 text-white shadow-2xl shadow-black/20 md:p-8">
          <div className="mb-4 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-secondary/45">
            <span>{product.category || "Product"}</span>
            <span>{product.brand || "Generic"}</span>
            <span>{product.productId}</span>
          </div>

          <h1 className="text-[28px] font-semibold leading-tight text-white md:text-[36px]">
            {product.name}
          </h1>

          {product.altNames?.length > 0 && (
            <p className="mt-3 text-[14px] text-secondary/55">
              Also known as: {product.altNames.join(", ")}
            </p>
          )}

          <p className="mt-5 text-[15px] leading-8 text-secondary/70">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[20px] font-semibold text-white">
              {getFormattedPrice(product.price)}
            </span>

            {hasDiscount && (
              <span className="text-[14px] font-medium text-secondary/45 line-through">
                {getFormattedPrice(product.labelledPrice)}
              </span>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoBox title="Brand" value={product.brand || "Generic"} />
            <InfoBox title="Model" value={product.model || "Standard"} />
            <InfoBox
              title="Availability"
              value={product.isVisible === false ? "Hidden" : "Available"}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => {
                addToCart(product, 1);
                toast.success(`${product.name} added to cart`);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(255,255,255,0.14)] active:scale-[0.98]"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>

            <Link
              to="/checkout"
              state={[
                {
                  product: {
                    name: product.name,
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    image: product.images?.[0],
                    productId: product.productId,
                  },
                  qty: 1,
                },
              ]}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
            >
              <CreditCard className="h-4 w-4" />
              Buy Now
            </Link>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5 text-secondary/65">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 h-5 w-5 text-accent" />
              <p className="text-[14px] leading-7">
                Clean product presentation, secure ordering, and a stronger
                premium feel for your.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-secondary/45">
        {title}
      </p>
      <p className="text-[16px] font-medium text-white">{value}</p>
    </div>
  );
}