import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function CheckOutDetailsModal({ cart }) {
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(import.meta.env.VITE_API_URL + "/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFirstName(response.data.firstName || "");
        setLastName(response.data.lastName || "");
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue checkout");
      navigate("/login");
      return;
    }

    const order = {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      phone,
      country: "Sri Lanka",
      items: cart.map((item) => ({
        productId: item.product.productId,
        qty: item.qty,
      })),
    };

    try {
      setSaving(true);
      await axios.post(import.meta.env.VITE_API_URL + "/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("cart", "[]");
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Order placed successfully");
      navigate("/my-orders");
      window.location.reload();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to place order");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(true)}
        className="rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
      >
        Complete Order
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass relative w-full max-w-2xl rounded-[32px] p-6 md:p-8">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 p-2 transition-all duration-200 hover:bg-white/8 hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-black">Checkout Details</h2>
            <p className="mt-2 text-secondary/65">
              Enter your delivery information to place the order.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Input label="First Name" value={firstName} onChange={setFirstName} />
              <Input label="Last Name" value={lastName} onChange={setLastName} />
              <Input
                label="Address Line 1"
                value={addressLine1}
                onChange={setAddressLine1}
                className="md:col-span-2"
              />
              <Input
                label="Address Line 2"
                value={addressLine2}
                onChange={setAddressLine2}
                className="md:col-span-2"
              />
              <Input label="City" value={city} onChange={setCity} />
              <Input label="Postal Code" value={postalCode} onChange={setPostalCode} />
              <Input label="Phone Number" value={phone} onChange={setPhone} />
              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Sri Lanka
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={placeOrder}
                disabled={saving}
                className="rounded-2xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {saving ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Input({ label, value, onChange, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm text-secondary/70">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none focus:border-accent"
      />
    </label>
  );
}