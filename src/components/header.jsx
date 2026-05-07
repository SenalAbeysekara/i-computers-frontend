import {
  Menu,
  ShoppingCart,
  X,
  Search,
  ShieldCheck,
  Home,
  PackageSearch,
  Info,
  Phone,
  ChevronRight,
  Headphones,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import UserData from "./userData";
import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: PackageSearch },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Phone },
];

const mobileExtraLinks = [{ to: "/cart", label: "Cart", icon: ShoppingCart }];

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

  const mobileLinkClasses = ({ isActive }) =>
    `group flex items-center justify-between rounded-2xl border px-3.5 py-3 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "border-blue-400/30 bg-blue-500/15 text-white shadow-[0_10px_30px_rgba(59,130,246,0.14)]"
        : "border-white/10 bg-white/[0.055] text-secondary/85 hover:border-blue-400/25 hover:bg-white/[0.09] hover:text-white"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/90 backdrop-blur-xl">
        <div className="section-shell flex h-[84px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="shrink-0 rounded-xl border border-white/10 p-2 text-secondary/80 transition-all duration-300 hover:bg-white/8 hover:text-white lg:hidden"
              aria-label="Open menu"
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
              className="relative rounded-full border border-white/12 p-2.5 text-secondary/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/8 hover:text-white hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]"
              aria-label="Cart"
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
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="flex h-dvh w-[min(76vw,320px)] flex-col overflow-y-auto border-r border-white/10 bg-[#07111f] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <img
                    src="/logo.png"
                    alt="Isuri Computer"
                    className="h-9 w-auto object-contain"
                  />

                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-secondary/65">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-accent" />
                    Premium computer store
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="shrink-0 rounded-xl border border-white/10 p-2 text-white transition-all duration-300 hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {navLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClasses}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-accent ring-1 ring-white/10">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>

                      <span className="truncate">{item.label}</span>
                    </span>

                    <ChevronRight className="h-4 w-4 shrink-0 text-secondary/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </NavLink>
                );
              })}

              <div className="my-4 h-px bg-white/10" />

              {mobileExtraLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClasses}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-accent ring-1 ring-white/10">
                        <Icon className="h-[18px] w-[18px]" />

                        {item.to === "/cart" && cartCount > 0 && (
                          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                            {cartCount}
                          </span>
                        )}
                      </span>

                      <span className="truncate">{item.label}</span>
                    </span>

                    <ChevronRight className="h-4 w-4 shrink-0 text-secondary/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-auto pt-5">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block rounded-3xl border border-blue-400/20 bg-blue-500/10 p-4 transition-all duration-300 hover:bg-blue-500/15"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-accent ring-1 ring-blue-400/20">
                    <Headphones className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">Need help?</p>
                    <p className="mt-0.5 text-xs text-secondary/65">
                      Contact our support team
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
