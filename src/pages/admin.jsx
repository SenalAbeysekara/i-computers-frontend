import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Boxes,
  ChevronLeft,
  LogOut,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Users,
  LayoutDashboard,
  PackageSearch,
  UserSquare2,
  MessageSquareMore,
} from "lucide-react";
import { useMemo, useState } from "react";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";

const navItems = [
  {
    to: "/admin/",
    label: "Orders",
    icon: ReceiptText,
    hint: "Track Purchases",
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: ShoppingBag,
    hint: "Manage Products",
  },
  {
    to: "/admin/reviews",
    label: "Reviews",
    icon: MessageSquareMore,
    hint: "Manage Reviews",
  },
  {
    to: "/admin/users",
    label: "Users",
    icon: Users,
    hint: "Control Accounts",
  },
];

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pageData = useMemo(() => {
    if (location.pathname.includes("/admin/add-product")) {
      return {
        title: "Add Product",
        tileTitle: "Product Creator",
        tileDesc: "Create and Publish New Product Items",
        tileIcon: PackageSearch,
      };
    }

    if (location.pathname.includes("/admin/update-product")) {
      return {
        title: "Update Product",
        tileTitle: "Product Editor",
        tileDesc: "Refine Pricing, Content, and Visibility",
        tileIcon: PackageSearch,
      };
    }

    if (location.pathname.includes("/admin/products")) {
      return {
        title: "Products",
        tileTitle: "Product Center",
        tileDesc: "Manage Products, Stock Visibility, and Pricing",
        tileIcon: ShoppingBag,
      };
    }

    if (location.pathname.includes("/admin/reviews")) {
      return {
        title: "Reviews",
        tileTitle: "Review Center",
        tileDesc: "See and moderate product reviews from all products",
        tileIcon: MessageSquareMore,
      };
    }

    if (location.pathname.includes("/admin/users")) {
      return {
        title: "Users",
        tileTitle: "User Control",
        tileDesc: "Manage Customers, Admins, and Access",
        tileIcon: UserSquare2,
      };
    }

    return {
      title: "Orders",
      tileTitle: "Order Center",
      tileDesc: "Monitor Purchases and Status Changes",
      tileIcon: LayoutDashboard,
    };
  }, [location.pathname]);

  const TileIcon = pageData.tileIcon;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-primary text-secondary">
      <div className="flex min-h-screen">
        <aside
          className={`border-r border-white/10 bg-surface/80 backdrop-blur-xl transition-all duration-300 ${
            collapsed ? "w-[96px]" : "w-[300px]"
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
              <div className="mb-6 flex items-center gap-3 px-2">
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

            {!collapsed && (
              <div className="mb-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#15233c] via-[#122038] to-[#0d182d] p-4 shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                    <TileIcon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-secondary/45">
                      Current Section
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {pageData.tileTitle}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-secondary/60">
                      {pageData.tileDesc}
                    </p>
                  </div>
                </div>
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
                        : `group flex items-center gap-3 rounded-[24px] px-4 py-3 transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-accent to-cyan-400 text-primary shadow-lg shadow-accent/20"
                              : "border border-transparent text-secondary/75 hover:border-white/10 hover:bg-white/5 hover:text-white"
                          }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />

                    {!collapsed && (
                      <div className="min-w-0">
                        <p className="font-medium">{item.label}</p>
                        <p
                          className={`text-xs ${
                            location.pathname === item.to ||
                            (item.to !== "/admin/" && location.pathname.includes(item.to))
                              ? "text-primary/75"
                              : "text-secondary/45"
                          }`}
                        >
                          {item.hint}
                        </p>
                      </div>
                    )}
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
                    : "flex items-center gap-3 rounded-[24px] px-4 py-3 text-secondary/75 transition-all duration-300 hover:bg-white/5 hover:text-white"
                }
              >
                <Boxes className="h-5 w-5 shrink-0" />
                {!collapsed && <span>View Store</span>}
              </Link>

              <button
                onClick={handleLogout}
                className={
                  collapsed
                    ? "flex w-full items-center justify-center rounded-[24px] py-4 text-secondary/75 transition-all duration-300 hover:bg-red-500/12 hover:text-red-300"
                    : "flex w-full items-center gap-3 rounded-[24px] px-4 py-3 text-secondary/75 transition-all duration-300 hover:bg-red-500/12 hover:text-red-300"
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
              <h2 className="text-2xl font-semibold md:text-3xl">{pageData.title}</h2>
            </div>
          </div>

          <div className="h-[calc(100vh-97px)] overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<AdminOrdersPage />} />
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/reviews" element={<AdminReviewsPage />} />
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