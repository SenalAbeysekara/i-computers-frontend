import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  Boxes,
  ChevronLeft,
  LogOut,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";

const navItems = [
  { to: "/admin/", label: "Orders", icon: ReceiptText },
  { to: "/admin/products", label: "Products", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    if (location.pathname.includes("/admin/add-product")) return "Add Product";
    if (location.pathname.includes("/admin/update-product")) return "Update Product";
    if (location.pathname.includes("/admin/products")) return "Products";
    if (location.pathname.includes("/admin/users")) return "Users";
    return "Orders";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-primary text-secondary">
      <div className="flex min-h-screen">
        <aside
          className={`border-r border-white/10 bg-surface/80 backdrop-blur-xl transition-all duration-300 ${
            collapsed ? "w-[96px]" : "w-[280px]"
          }`}
        >
          <div className="flex h-full flex-col px-4 py-5">
            {collapsed ? (
              <div className="mb-8 flex flex-col items-center gap-4 px-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-cyan-400 text-primary shadow-lg shadow-accent/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <button
                  onClick={() => setCollapsed((value) => !value)}
                  className="rounded-full border border-white/10 p-2 text-secondary/70 transition hover:bg-white/5 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4 rotate-180 transition" />
                </button>
              </div>
            ) : (
              <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-cyan-400 text-primary shadow-lg shadow-accent/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.28em] text-secondary/45">
                    Isuri Computer
                  </p>
                  <h1 className="truncate text-lg font-semibold">Admin Control</h1>
                </div>

                <button
                  onClick={() => setCollapsed((value) => !value)}
                  className="ml-auto rounded-full border border-white/10 p-2 text-secondary/70 transition hover:bg-white/5 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4 transition" />
                </button>
              </div>
            )}

            <nav className="flex-1 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/admin/"}
                    className={({ isActive }) =>
                      collapsed
                        ? `group flex items-center justify-center rounded-[24px] py-4 transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-accent to-cyan-400 text-primary shadow-lg shadow-accent/20"
                              : "text-secondary/75 hover:bg-white/5 hover:text-white"
                          }`
                        : `group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-accent to-cyan-400 text-primary shadow-lg shadow-accent/20"
                              : "text-secondary/75 hover:bg-white/5 hover:text-white"
                          }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </NavLink>
                );
              })}
            </nav>

            <div className="space-y-3 pt-5">
              <Link
                to="/"
                className={
                  collapsed
                    ? "flex items-center justify-center rounded-[24px] py-4 text-secondary/75 transition-all duration-300 hover:bg-white/5 hover:text-white"
                    : "flex items-center gap-3 rounded-2xl px-4 py-3 text-secondary/75 transition-all duration-300 hover:bg-white/5 hover:text-white"
                }
              >
                <Boxes className="h-5 w-5 shrink-0" />
                {!collapsed && <span>View Store</span>}
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className={
                  collapsed
                    ? "flex w-full items-center justify-center rounded-[24px] py-4 text-secondary/75 transition-all duration-300 hover:bg-red-500/12 hover:text-red-300"
                    : "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-secondary/75 transition-all duration-300 hover:bg-red-500/12 hover:text-red-300"
                }
              >
                <LogOut className="h-5 w-5 shrink-0" />
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        <main className="min-h-screen flex-1 overflow-hidden">
          <div className="sticky top-0 z-20 border-b border-white/10 bg-primary/80 px-4 py-4 backdrop-blur-xl md:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-secondary/40">
                Dashboard
              </p>
              <h2 className="text-2xl font-semibold md:text-3xl">{pageTitle}</h2>
            </div>
          </div>

          <div className="h-[calc(100vh-97px)] overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<AdminOrdersPage />} />
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/add-product" element={<AdminAddProductPage />} />
              <Route path="/update-product" element={<AdminUpdateProductPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}