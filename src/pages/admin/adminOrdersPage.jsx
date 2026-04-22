import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  LoaderCircle,
  PackageCheck,
  XCircle,
} from "lucide-react";
import LoadingAnimation from "../../components/loadingAnimation";
import getFormattedPrice from "../../utils/price-format";
import getFormattedDate from "../../utils/date-format";
import toast from "react-hot-toast";
import ViewOrderInfoModal from "../../components/viewOrderInfoModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/admin/${pageSize}/${pageNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrders(response.data.orders || []);
        setTotalPages(response.data.totalPages || 0);
      })
      .catch(() => {
        toast.error("Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, [loading, pageNumber]);

  const stats = useMemo(() => {
    return {
      pending: orders.filter((order) => order.status === "Pending").length,
      shipped: orders.filter((order) => order.status === "Shipped").length,
      delivered: orders.filter((order) => order.status === "Delivered").length,
      cancelled: orders.filter((order) => order.status === "Cancelled").length,
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={LoaderCircle} label="Pending" value={stats.pending} />
        <StatCard icon={ArrowLeftRight} label="Shipped" value={stats.shipped} />
        <StatCard icon={PackageCheck} label="Delivered" value={stats.delivered} />
        <StatCard icon={XCircle} label="Cancelled" value={stats.cancelled} />
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#101b31] via-[#0d1729] to-[#0a1424] shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
        <div className="absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r from-blue-400 via-accent to-cyan-400" />
        <div className="absolute inset-x-0 bottom-0 h-[5px] bg-gradient-to-r from-blue-400 via-accent to-cyan-400" />

        <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Order Management
            </h2>
            <p className="mt-1 text-sm text-secondary/60">
              Review orders, customer details, and update statuses quickly.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-secondary/70">
            Page <span className="font-semibold text-white">{pageNumber}</span> of{" "}
            <span className="font-semibold text-white">{Math.max(totalPages, 1)}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[380px] items-center justify-center">
            <LoadingAnimation />
          </div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-16 text-center text-secondary/60">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto hide-scroll-track">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-white/[0.04] text-secondary/55">
                <tr>
                  {["Order ID", "Customer", "Email", "Date", "Total", "Status", "Action"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.22em]"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id || order.orderId}
                    className={`border-t border-white/10 transition-colors duration-300 hover:bg-white/[0.04] ${index % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"
                      }`}
                  >
                    <td className="px-6 py-5 font-semibold text-white">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-5 text-white">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="px-6 py-5 text-secondary/70">{order.email}</td>
                    <td className="px-6 py-5 text-secondary/80">
                      {getFormattedDate(order.date)}
                    </td>
                    <td className="px-6 py-5 font-semibold text-white">
                      {getFormattedPrice(order.total)}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <ViewOrderInfoModal order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-surface/65 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-secondary/60">
          Showing page <span className="font-medium text-white">{pageNumber}</span> of{" "}
          <span className="font-medium text-white">{Math.max(totalPages, 1)}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber((value) => value - 1);
                setLoading(true);
              } else {
                toast("You are on the first page");
              }
            }}
            className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_10px_24px_rgba(255,255,255,0.06)] active:scale-[0.98]"
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (pageNumber < totalPages) {
                setPageNumber((value) => value + 1);
                setLoading(true);
              } else {
                toast("You are on the last page");
              }
            }}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.32)] active:scale-[0.98]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function badgeClass(status) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-500/15 text-emerald-300";
    case "Shipped":
      return "bg-sky-500/15 text-sky-300";
    case "Cancelled":
      return "bg-red-500/15 text-red-300";
    default:
      return "bg-amber-500/15 text-amber-300";
  }
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#101b30] to-[#0b1526] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-secondary/45">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>

        <div className="rounded-2xl bg-accent/12 p-3 text-accent">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}