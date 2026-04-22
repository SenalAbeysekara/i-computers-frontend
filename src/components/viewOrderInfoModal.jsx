import { useMemo, useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import toast from "react-hot-toast";
import axios from "axios";
import { Save, X } from "lucide-react";

const statusOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];

export default function ViewOrderInfoModal({ order }) {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [notes, setNotes] = useState(order.notes || "");
  const [saving, setSaving] = useState(false);

  const hasChanges = useMemo(() => {
    return status !== order.status || notes !== (order.notes || "");
  }, [status, notes, order.status, order.notes]);

  function getItemImage(item) {
    return (
      item?.image ||
      item?.product?.image ||
      item?.product?.images?.[0] ||
      "/logo.png"
    );
  }

  async function handleChange() {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/${order.orderId}`,
        { status, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order updated successfully");
      window.location.reload();
    } catch {
      toast.error("Failed to update order");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(true)}
        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_10px_24px_rgba(255,255,255,0.06)] active:scale-[0.98]"
      >
        View Details
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#101b30] to-[#0b1526] shadow-2xl shadow-black/35">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-[#0f1a2e]/90 p-2 text-secondary/70 transition-all duration-300 hover:rotate-90 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-white/10 px-6 py-6 md:px-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-secondary/45">
                    Order Details
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-white">
                    {order.orderId}
                  </h2>
                  <p className="mt-2 text-secondary/65">
                    {order.firstName} {order.lastName} • {order.email}
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-secondary/45">
                    Update Status
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setStatus(item)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
                          status === item
                            ? activeStatusClass(item)
                            : "border border-white/10 bg-black/10 text-secondary/75 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {hasChanges && (
                    <button
                      onClick={handleChange}
                      disabled={saving}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.32)] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
                    >
                      <Save className="h-4 w-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid flex-1 gap-6 overflow-y-auto p-6 md:grid-cols-[1.15fr_0.85fr] md:p-8 hide-scroll-track">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Order Items
                </h3>

                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.productId || item.name}-${index}`}
                      className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-black/10 p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] bg-white p-3">
                          <img
                            src={getItemImage(item)}
                            alt={item.name}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/logo.png";
                            }}
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="mt-1 text-sm text-secondary/60">
                            Qty: {item.qty}
                          </p>
                          <p className="mt-1 text-sm text-secondary/60">
                            {getFormattedPrice(item.price)} each
                          </p>
                        </div>
                      </div>

                      <p className="text-lg font-semibold text-white">
                        {getFormattedPrice(item.price * item.qty)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Summary
                  </h3>

                  <div className="space-y-4">
                    <SummaryRow label="Order ID" value={order.orderId} />
                    <SummaryRow
                      label="Date"
                      value={getFormattedDate(order.date)}
                    />
                    <SummaryRow
                      label="Customer"
                      value={`${order.firstName} ${order.lastName}`}
                    />
                    <SummaryRow label="Email" value={order.email} />
                    <SummaryRow
                      label="Status"
                      value={<span className={statusBadgeClass(status)}>{status}</span>}
                    />
                    <SummaryRow
                      label="Total"
                      value={getFormattedPrice(order.total)}
                      strong
                    />
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Admin Notes
                  </h3>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add shipping, payment, or customer notes..."
                    className="min-h-[220px] w-full rounded-[24px] border border-white/10 bg-black/10 p-4 outline-none transition-all duration-300 placeholder:text-secondary/35 hover:bg-white/[0.04] focus:border-accent/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-secondary/55">{label}</span>
      <div
        className={`text-right ${
          strong ? "font-semibold text-white" : "text-secondary/85"
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );
}

function statusBadgeClass(status) {
  switch (status) {
    case "Delivered":
      return "inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300";
    case "Shipped":
      return "inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-sm font-semibold text-sky-300";
    case "Cancelled":
      return "inline-flex rounded-full bg-red-500/15 px-3 py-1 text-sm font-semibold text-red-300";
    default:
      return "inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-300";
  }
}

function activeStatusClass(status) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-500/20 text-emerald-300 shadow-[0_8px_24px_rgba(16,185,129,0.18)]";
    case "Shipped":
      return "bg-sky-500/20 text-sky-300 shadow-[0_8px_24px_rgba(14,165,233,0.18)]";
    case "Cancelled":
      return "bg-red-500/20 text-red-300 shadow-[0_8px_24px_rgba(239,68,68,0.18)]";
    default:
      return "bg-amber-500/20 text-amber-300 shadow-[0_8px_24px_rgba(245,158,11,0.18)]";
  }
}