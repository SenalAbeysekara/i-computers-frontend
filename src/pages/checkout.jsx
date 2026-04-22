import { useMemo, useState } from "react";
import { getCart, getCartTotal } from "../utils/cart";
import getFormattedPrice from "../utils/price-format";
import { useLocation, useNavigate } from "react-router-dom";
import CheckOutDetailsModal from "../components/checkoutDetailsModal";
import { CreditCard } from "lucide-react";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart] = useState(location.state || getCart());

  const total = useMemo(() => getCartTotal(cart), [cart]);
  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  if (!cart || cart.length === 0) {
    navigate("/products");
    return null;
  }

  return (
    <div className="section-shell py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Checkout</h1>
        <p className="mt-3 text-secondary/65">
          Confirm the selected items and continue with delivery details.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map((cartItem, index) => (
            <div
              key={index}
              className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-4 shadow-xl shadow-black/10 md:p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-[#eef2f7] p-3">
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
                  <h2 className="mt-2 text-[20px] font-semibold leading-tight text-white">
                    {cartItem.product.name}
                  </h2>
                  <p className="mt-3 text-[15px] text-secondary/65">
                    Qty: {cartItem.qty}
                  </p>
                </div>

                <p className="text-[18px] font-semibold text-white md:text-right">
                  {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-6 shadow-2xl shadow-black/15">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/5 p-3">
              <CreditCard className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Payment Summary</h2>
              <p className="text-sm text-secondary/55">
                Review before placing your order
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

            <div className="flex items-center justify-between text-secondary/65">
              <span>Delivery</span>
              <span>Calculated offline</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-[18px] font-semibold text-white">
                <span>Total</span>
                <span>{getFormattedPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CheckOutDetailsModal cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}