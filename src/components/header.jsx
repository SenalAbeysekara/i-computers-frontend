import { Menu, ShoppingCart, X, Search, ShieldCheck } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import UserData from "./userData";
import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCartCount() {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(count);
    }

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const linkClasses = ({ isActive }) =>
    `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(59,130,246,0.25)]"
        : "text-secondary/75 hover:-translate-y-0.5 hover:bg-white/8 hover:text-white hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/85 backdrop-blur-xl">
      <div className="section-shell flex h-[84px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="shrink-0 rounded-xl border border-white/10 p-2 text-secondary/80 transition-all duration-300 hover:bg-white/8 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex flex-col items-start justify-center leading-tight">
              <img
                src="/logo.png"
                alt="Isuri Computer"
                className="h-9 w-auto object-contain md:h-10 lg:h-10"
              />
              <p className="mt-0.5 flex items-center gap-1.5 pl-0.5 text-[12px] font-medium text-secondary/60">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-accent" />
                Premium computer store
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-3 lg:flex">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link
            to="/products"
            className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-secondary/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/8 hover:text-white hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)] md:flex"
          >
            <Search className="h-4 w-4" />
            Browse
          </Link>

          <Link
            to="/cart"
            className="relative rounded-full border border-white/12 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/8 hover:text-white hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white shadow-lg shadow-blue-500/30">
                {cartCount}
              </span>
            )}
          </Link>

          <UserData />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="glass h-full w-[300px] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex flex-col items-start">
                <img
                  src="/logo.png"
                  alt="Isuri Computer"
                  className="h-10 w-auto object-contain"
                />
                <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-secondary/65">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                  Premium computer store
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-white/10 p-2 transition-all duration-300 hover:bg-white/8 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-2xl bg-white/5 px-4 py-3 transition-all duration-300 hover:bg-white/10 hover:text-accent hover:translate-x-1"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl bg-white/5 px-4 py-3 transition-all duration-300 hover:bg-white/10 hover:text-accent hover:translate-x-1"
              >
                Cart
              </Link>

              <Link
                to="/privacy-policy"
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl bg-white/5 px-4 py-3 transition-all duration-300 hover:bg-white/10 hover:text-accent hover:translate-x-1"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl bg-white/5 px-4 py-3 transition-all duration-300 hover:bg-white/10 hover:text-accent hover:translate-x-1"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}