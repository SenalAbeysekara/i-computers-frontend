import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { BiMinus, BiPlus } from "react-icons/bi";
import getFormattedPrice from "../utils/price-format";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  const [cart, setCart] = useState(getCart());

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = getCartTotal(cart);

  return (
    <div className="section-shell py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Your Cart</h1>
        <p className="mt-3 text-secondary/65">
          Review selected products before checkout.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.length === 0 && (
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-secondary/60">
              Your cart is empty.
            </div>
          )}

          {cart.map((cartItem, index) => (
            <div
              key={index}
              className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-4 shadow-xl shadow-black/10 md:p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-[#eef2f7] p-3">
                  <img
                    className="h-full w-full object-contain"
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                  />
                </div>

                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary/45">
                    {cartItem.product.productId}
                  </p>
                  <h2 className="mt-2 text-[22px] font-semibold leading-tight text-white">
                    {cartItem.product.name}
                  </h2>
                  <p className="mt-3 text-[15px] text-secondary/65">
                    {getFormattedPrice(cartItem.product.price)}
                  </p>
                </div>

                <div className="flex items-center rounded-full border border-white/10 bg-white/5 overflow-hidden">
                  <button
                    onClick={() => {
                      addToCart(cartItem.product, -1);
                      setCart(getCart());
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-l-full text-white transition-all duration-200 hover:bg-white hover:text-slate-900 active:scale-95"
                  >
                    <BiMinus />
                  </button>

                  <span className="w-12 text-center font-medium text-white">
                    {cartItem.qty}
                  </span>

                  <button
                    onClick={() => {
                      addToCart(cartItem.product, 1);
                      setCart(getCart());
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-r-full text-white transition-all duration-200 hover:bg-white hover:text-slate-900 active:scale-95"
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-6 shadow-2xl shadow-black/15">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/5 p-3">
              <ShoppingBag className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Order Summary</h2>
              <p className="text-sm text-secondary/55">
                Quick review before checkout
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-secondary/65">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="flex items-center justify-between text-secondary/65">
              <span>Subtotal</span>
              <span>{getFormattedPrice(total)}</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-[18px] font-semibold text-white">
                <span>Total</span>
                <span>{getFormattedPrice(total)}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            state={cart}
            className={`mt-6 block rounded-2xl px-5 py-3 text-center font-medium transition-all duration-300 ${cart.length
              ? "bg-accent text-white hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
              : "pointer-events-none bg-white/10 text-secondary/40"
              }`}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}