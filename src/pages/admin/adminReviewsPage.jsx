import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Star, Trash2, Pencil } from "lucide-react";
import LoadingAnimation from "../../components/loadingAnimation";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    axios
      .get(import.meta.env.VITE_API_URL + "/products/reviews/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setReviews(response.data))
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Failed to load reviews");
        setReviews([]);
      });
  }

  async function handleDelete(review) {
    const confirmed = window.confirm("Delete this review?");
    if (!confirmed) return;

    try {
      await axios.delete(
        import.meta.env.VITE_API_URL +
          "/products/" +
          review.productId +
          "/reviews/" +
          review.reviewId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Review deleted successfully");
      loadReviews();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    }
  }

  if (reviews === null) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-secondary/45">
          Admin Reviews
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">All Product Reviews</h2>
        <p className="mt-2 text-sm text-secondary/60">
          Admin can view all reviews from all products here.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-secondary/65">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.reviewId}
              className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#15233c] via-[#122038] to-[#0d182d] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{review.productName}</p>
                  <p className="mt-1 text-sm text-secondary/55">
                    Product ID: {review.productId}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`h-4 w-4 ${
                        value <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{review.userName}</p>
                <p className="mt-1 text-xs text-secondary/55">{review.userEmail}</p>
                <p className="mt-3 text-sm leading-7 text-secondary/75">{review.comment}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-secondary/45">
                  {new Date(review.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-2">
                  <Link
                    to={`/overview/${review.productId}`}
                    className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 transition hover:bg-yellow-500/20"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit in Product Page
                  </Link>

                  <button
                    onClick={() => handleDelete(review)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}