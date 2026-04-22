import { useState } from "react";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import { X } from "lucide-react";

export default function CustomerViewOrderInfoModal({ order }) {
  const [isVisible, setIsVisible] = useState(false);

  const resolveImage = (item) => {
    return (
      item?.image ||
      item?.product?.image ||
      item?.product?.images?.[0] ||
      "/logo.png"
    );
  };

  return (
    <>
      <button
        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(255,255,255,0.14)] active:scale-[0.98]"
        onClick={() => setIsVisible(true)}
      >
        View Details
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-6 shadow-2xl shadow-black/30 md:p-8">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 p-2 transition-all duration-200 hover:bg-white/8 hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
                Order Details
              </p>
              <h2 className="mt-2 text-3xl font-black">{order.orderId}</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="mb-4 text-xl font-bold">Items</h3>

                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.productId}-${item.name}-${index}`}
                      className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] border border-white/10 bg-[#eef2f7] p-2">
                          <img
                            src={resolveImage(item)}
                            alt={item.name}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/logo.png";
                            }}
                          />
                        </div>

                        <div>
                          <p className="text-lg font-semibold text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-secondary/60">
                            Qty: {item.qty}
                          </p>
                          <p className="mt-1 text-sm text-secondary/50">
                            {getFormattedPrice(item.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xl font-semibold text-white">
                          {getFormattedPrice(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold">Summary</h3>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="space-y-4">
                    <Row label="Order ID" value={order.orderId} />
                    <Row label="Date" value={getFormattedDate(order.date)} />
                    <Row
                      label="Customer"
                      value={`${order.firstName || ""} ${order.lastName || ""}`}
                    />
                    <Row label="Email" value={order.email || "-"} />
                    <Row
                      label="Status"
                      value={
                        <span className={getStatusClass(order.status)}>
                          {order.status || "Pending"}
                        </span>
                      }
                    />
                    <Row label="Total" value={getFormattedPrice(order.total)} />
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <h4 className="mb-3 text-lg font-bold">Notes</h4>
                    <p className="leading-7 text-secondary/70">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="text-secondary/55">{label}</span>
      <span className="text-right font-medium text-white">{value || "-"}</span>
    </div>
  );
}

function getStatusClass(status) {
  const value = String(status || "").toLowerCase();

  if (value === "completed" || value === "delivered") {
    return "rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300";
  }

  if (value === "cancelled") {
    return "rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-300";
  }

  if (value === "processing") {
    return "rounded-full bg-blue-500/15 px-3 py-1 text-sm font-medium text-blue-300";
  }

  return "rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-300";
}