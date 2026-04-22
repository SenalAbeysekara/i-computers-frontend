import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";
import { ShoppingCart, CreditCard, BadgeCheck, Star } from "lucide-react";

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default function Overview() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviewsData, setReviewsData] = useState({
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
  });

  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadProduct();
    loadReviews();
    loadCurrentUser();
  }, [productId]);

  function loadProduct() {
    axios
      .get(import.meta.env.VITE_API_URL + "/products/" + productId, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((response) => setProduct(response.data))
      .catch(() => {
        toast.error("Failed to load product");
      });
  }

  function loadReviews() {
    axios
      .get(import.meta.env.VITE_API_URL + "/products/" + productId + "/reviews", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((response) => setReviewsData(response.data))
      .catch(() => {
        toast.error("Failed to load reviews");
      });
  }

  function loadCurrentUser() {
    if (!token) {
      setCurrentUser(null);
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCurrentUser(response.data))
      .catch(() => {
        setCurrentUser(null);
      });
  }

  const hasDiscount = Number(product?.labelledPrice) > Number(product?.price);

  const myReview = useMemo(() => {
    if (!currentUser) return null;
    return reviewsData.reviews.find(
      (review) => review.userEmail === currentUser.email
    );
  }, [reviewsData.reviews, currentUser]);

  const canSubmitNewReview = currentUser && !myReview && !editingReviewId;
  const currentDisplayRating = hoverRating || formData.rating;

  async function handleSubmitReview(e) {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please enter your review");
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingReviewId) {
        await axios.put(
          import.meta.env.VITE_API_URL +
            "/products/" +
            productId +
            "/reviews/" +
            editingReviewId,
          {
            rating: Number(formData.rating),
            comment: formData.comment,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success("Review updated successfully");
      } else {
        await axios.post(
          import.meta.env.VITE_API_URL + "/products/" + productId + "/reviews",
          {
            rating: Number(formData.rating),
            comment: formData.comment,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success("Review added successfully");
      }

      setFormData({ rating: 5, comment: "" });
      setEditingReviewId(null);
      setHoverRating(0);
      loadProduct();
      loadReviews();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save review");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEditClick(review) {
    const isOwner = currentUser?.email === review.userEmail;
    const isAdmin = currentUser?.role === "admin";

    if (!isOwner && !isAdmin) {
      toast.error("You can edit only your own review");
      return;
    }

    setEditingReviewId(review._id);
    setFormData({
      rating: review.rating,
      comment: review.comment,
    });
    setHoverRating(0);

    const reviewFormSection = document.getElementById("write-review-section");
    if (reviewFormSection) {
      reviewFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function handleDeleteReview(review) {
    const isOwner = currentUser?.email === review.userEmail;
    const isAdmin = currentUser?.role === "admin";

    if (!isOwner && !isAdmin) {
      toast.error("You can delete only your own review");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    try {
      await axios.delete(
        import.meta.env.VITE_API_URL +
          "/products/" +
          productId +
          "/reviews/" +
          review._id,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Review deleted successfully");

      if (editingReviewId === review._id) {
        setEditingReviewId(null);
        setFormData({ rating: 5, comment: "" });
        setHoverRating(0);
      }

      loadProduct();
      loadReviews();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    }
  }

  function cancelEdit() {
    setEditingReviewId(null);
    setFormData({ rating: 5, comment: "" });
    setHoverRating(0);
  }

  if (!product) {
    return (
      <div className="section-shell py-16">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="section-shell py-10">
      <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-5 text-white shadow-2xl shadow-black/20 md:p-7">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <ImageSlideShow images={product.images} />
          </div>

          <div className="px-1 md:px-2">
            <div className="mb-4 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-secondary/45">
              <span>{product.category || "Product"}</span>
              <span>{product.brand || "Generic"}</span>
              <span>{product.productId}</span>
            </div>

            <h1 className="text-[28px] font-semibold leading-tight text-white md:text-[36px]">
              {product.name}
            </h1>

            {product.altNames?.length > 0 && (
              <p className="mt-3 text-[14px] text-secondary/55">
                Also known as: {product.altNames.join(", ")}
              </p>
            )}

            <p className="mt-6 text-[15px] leading-8 text-secondary/70">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="text-sm font-medium text-white">
                  {reviewsData.averageRating || 0}
                </span>
              </div>
              <span className="text-sm text-secondary/55">
                ({reviewsData.reviewCount} review{reviewsData.reviewCount === 1 ? "" : "s"})
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[20px] font-semibold text-white">
                {getFormattedPrice(product.price)}
              </span>

              {hasDiscount && (
                <span className="text-[14px] font-medium text-secondary/45 line-through">
                  {getFormattedPrice(product.labelledPrice)}
                </span>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <InfoBox title="Brand" value={product.brand || "Generic"} />
              <InfoBox title="Model" value={product.model || "Standard"} />
              <InfoBox
                title="Availability"
                value={product.isVisible === false ? "Hidden" : "Available"}
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  toast.success(`${product.name} added to cart`);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-[0_10px_24px_rgba(255,255,255,0.14)] active:scale-[0.98]"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>

              <Link
                to="/checkout"
                state={[
                  {
                    product: {
                      name: product.name,
                      price: product.price,
                      labelledPrice: product.labelledPrice,
                      image: product.images?.[0],
                      productId: product.productId,
                    },
                    qty: 1,
                  },
                ]}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
              >
                <CreditCard className="h-4 w-4" />
                Buy Now
              </Link>
            </div>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5 text-secondary/65">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-1 h-5 w-5 text-accent" />
                <p className="text-[14px] leading-7">
                  Fast checkout, reliable products, and a premium shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[32px] border border-white/10 bg-gradient-to-br from-[#131f35] via-[#111b2f] to-[#0c1526] p-6 text-white shadow-2xl shadow-black/20 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Product Reviews</h2>
            <p className="mt-2 text-sm text-secondary/55">
              Share your review first, then browse what others said.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-secondary/45">
              Average Rating
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`h-4 w-4 ${
                      value <= Math.round(reviewsData.averageRating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-white">
                {reviewsData.averageRating || 0} / 5
              </span>
              <span className="text-sm text-secondary/55">
                ({reviewsData.reviewCount})
              </span>
            </div>
          </div>
        </div>

        <div
          id="write-review-section"
          className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5 md:p-6"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {editingReviewId ? "Edit Your Review" : "Write a Review"}
              </h3>
              <p className="mt-1 text-sm text-secondary/55">
                Click the stars to rate this product.
              </p>
            </div>

            {!token && (
              <p className="text-sm text-secondary/60">
                Please login to add your review.
              </p>
            )}
          </div>

          {token && myReview && !editingReviewId && currentUser?.role !== "admin" && (
            <div className="mt-5 rounded-[20px] border border-white/10 bg-[#18243c] px-4 py-3 text-sm text-secondary/65">
              You already posted a review for this product. You can edit or delete your own review below.
            </div>
          )}

          {(canSubmitNewReview || editingReviewId || currentUser?.role === "admin") && (
            <form onSubmit={handleSubmitReview} className="mt-6">
              <div>
                <label className="mb-3 block text-sm text-secondary/60">Your Rating</label>

                <div
                  className="flex flex-wrap items-center gap-3"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const active = value <= currentDisplayRating;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              rating: value,
                            }))
                          }
                          onMouseEnter={() => setHoverRating(value)}
                          className="transition-transform duration-200 hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              active
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-white/25"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <span className="text-sm font-medium text-secondary/75">
                    {currentDisplayRating} - {ratingLabels[currentDisplayRating]}
                  </span>
                </div>

                <div className="mt-6">
                  <label className="mb-3 block text-sm text-secondary/60">
                    Your Review
                  </label>
                  <textarea
                    rows={5}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    placeholder="Share your experience with this product..."
                    className="w-full rounded-[22px] border border-white/10 bg-[#18243c] px-4 py-4 text-white outline-none transition focus:border-blue-400/50"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-accent px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_12px_28px_rgba(59,130,246,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingReviewId
                      ? "Update Review"
                      : "Submit Review"}
                  </button>

                  {editingReviewId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <p className="mt-1 text-sm text-secondary/55">
                Everyone can see all reviews for this product.
              </p>
            </div>
          </div>

          {reviewsData.reviews.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-white/5 p-6 text-center text-secondary/60">
              No reviews yet for this product.
            </div>
          ) : (
            <div className="space-y-4">
              {reviewsData.reviews.map((review) => {
                const isOwner = currentUser?.email === review.userEmail;
                const isAdmin = currentUser?.role === "admin";

                return (
                  <div
                    key={review._id}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:border-white/15 hover:bg-white/[0.07]"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-base font-semibold text-white">
                          {review.userName}
                        </p>
                        <p className="mt-1 text-xs text-secondary/50">
                          {review.userEmail}
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

                    <p className="mt-4 text-sm leading-7 text-secondary/75">
                      {review.comment}
                    </p>

                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <p className="text-xs text-secondary/45">
                        {new Date(review.createdAt).toLocaleString()}
                      </p>

                      {(isOwner || isAdmin) && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEditClick(review)}
                            className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-500/20"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteReview(review)}
                            className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-secondary/45">
        {title}
      </p>
      <p className="text-[16px] font-medium text-white">{value}</p>
    </div>
  );
}