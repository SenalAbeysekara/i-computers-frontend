import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";
import getFormattedDate from "../utils/date-format";
import getFormattedPrice from "../utils/price-format";
import CustomerViewOrderInfoModal from "../components/customersViewOrderInfoModal";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + pageNumber, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setOrders(response.data.orders || []);
        setTotalPages(response.data.totalPages || 0);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message || "Failed to load orders")
      )
      .finally(() => setLoading(false));
  }, [loading, pageNumber]);

  return (
    <div className="section-shell py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">My Orders</h1>
        <p className="mt-2 text-secondary/65">
          Track past purchases and order details from your account.
        </p>
      </div>

      {loading ? (
        <LoadingAnimation />
      ) : orders.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-secondary/60">
          No orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-5 shadow-xl shadow-black/10"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  <SimpleInfo label="Order ID" value={order.orderId} />
                  <SimpleInfo label="Date" value={getFormattedDate(order.date)} />
                  <SimpleInfo
                    label="Status"
                    value={
                      <span className={getStatusClass(order.status)}>
                        {order.status || "Pending"}
                      </span>
                    }
                  />
                  <SimpleInfo
                    label="Items"
                    value={`${order.items?.length || 0} items`}
                  />
                  <SimpleInfo label="Total" value={getFormattedPrice(order.total)} />
                </div>

                <div className="flex justify-end">
                  <CustomerViewOrderInfoModal order={order} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber((value) => value - 1);
              setLoading(true);
            } else {
              toast("You are on the first page");
            }
          }}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
        >
          Previous
        </button>

        <span className="text-secondary/65">
          Page {pageNumber} of {Math.max(totalPages, 1)}
        </span>

        <button
          onClick={() => {
            if (pageNumber < totalPages) {
              setPageNumber((value) => value + 1);
              setLoading(true);
            } else {
              toast("You are on the last page");
            }
          }}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function SimpleInfo({ label, value }) {
  return (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-secondary/45">
        {label}
      </p>
      <div className="text-xl font-semibold text-white">{value}</div>
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