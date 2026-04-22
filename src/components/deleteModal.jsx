import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteModal({ product, setLoading }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(true)} className="rounded-xl border border-white/10 p-2 text-secondary/80 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300">
        <CiTrash />
      </button>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-surface p-6 shadow-2xl">
            <button onClick={() => setIsVisible(false)} className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-secondary/70 transition hover:bg-white/5 hover:text-white">
              <X className="h-4 w-4" />
            </button>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/12 text-red-300">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold">Delete product?</h2>
            <p className="mt-3 text-secondary/65">This will remove <span className="font-semibold text-white">{product.productId}</span> from your catalog. This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button className="rounded-2xl border border-white/10 px-4 py-2 text-secondary/80 transition hover:bg-white/5" onClick={() => setIsVisible(false)}>Cancel</button>
              <button className="rounded-2xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500" onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  await axios.delete(`${import.meta.env.VITE_API_URL}/products/${product.productId}`, { headers: { Authorization: `Bearer ${token}` } });
                  setIsVisible(false);
                  toast.success("Product deleted successfully");
                  setLoading(true);
                } catch (error) {
                  toast.error(error?.response?.data?.message || "Failed to delete the product. Please try again.");
                  setIsVisible(false);
                }
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
