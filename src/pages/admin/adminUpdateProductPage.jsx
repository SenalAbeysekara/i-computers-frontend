import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, Save, WandSparkles } from "lucide-react";
import uploadFile from "../../utils/mediaUpload";

const categoryOptions = [
  "Others",
  "Laptops",
  "Desktops",
  "Components",
  "Accessories",
  "Peripherals",
];

const brandOptions = [
  "Generic",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "Apple",
];

const inputClass =
  "w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-secondary/35 hover:border-white/20 hover:bg-white/[0.07] focus:border-accent/60 focus:bg-white/[0.08]";

export default function AdminUpdateProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111d33] via-[#0f192d] to-[#0b1424] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <h1 className="text-2xl font-semibold text-white">No product selected</h1>
        <p className="mt-2 text-secondary/65">
          Open a product from the admin products list to edit it.
        </p>
        <button
          onClick={() => navigate("/admin/products")}
          className="mt-5 rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 active:scale-[0.98]"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const [productId] = useState(product.productId);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [altNames, setAltNames] = useState((product.altNames || []).join(","));
  const [price, setPrice] = useState(product.price);
  const [labelledPrice, setLabelledPrice] = useState(product.labelledPrice);
  const [category, setCategory] = useState(product.category);
  const [brand, setBrand] = useState(product.brand);
  const [model, setModel] = useState(product.model);
  const [isVisible, setIsVisible] = useState(String(product.isVisible));
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const previewImage = useMemo(() => {
    if (files.length > 0) return URL.createObjectURL(files[0]);
    return product.images?.[0] || "/logo.png";
  }, [files, product.images]);

  async function handleUpdateProduct() {
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("You must be logged in to update a product");
        window.location.href = "/login";
        return;
      }

      setSubmitting(true);

      let imageURLs = await Promise.all(
        Array.from(files).map((file) => uploadFile(file))
      );

      if (imageURLs.length === 0) imageURLs = product.images;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${productId}`,
        {
          name,
          description,
          price,
          labelledPrice,
          altNames: altNames
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          images: imageURLs,
          category,
          brand,
          model,
          isVisible: isVisible === "true",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-secondary/40">
          Admin / Product Editor
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
          Upgrade product details
        </h1>
        <p className="mt-2 max-w-3xl text-secondary/65">
          Refresh product content, pricing, images, and storefront visibility with a cleaner editing experience.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111d33] via-[#0f192d] to-[#0b1424] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Edit Product Information</h2>
            <p className="mt-2 text-sm text-secondary/60">
              Update product details and keep the storefront content polished.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Product ID">
              <input
                value={productId}
                disabled
                className={`${inputClass} cursor-not-allowed opacity-70`}
              />
            </Field>

            <Field label="Product Name">
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </Field>

            <Field label="Description" className="md:col-span-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${inputClass} min-h-[160px] resize-none`}
              />
            </Field>

            <Field label="Replace Images" className="md:col-span-2">
              <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-white/5 p-6 text-center transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.07]">
                <ImagePlus className="mb-3 h-8 w-8 text-accent" />
                <span className="font-medium text-white">Upload new images</span>
                <span className="mt-1 text-sm text-secondary/60">
                  Leave empty to keep existing images
                </span>
                <input
                  multiple
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                  className="hidden"
                />
              </label>

              {files.length > 0 ? (
                <p className="mt-3 text-sm text-secondary/65">
                  {files.length} new file(s) selected
                </p>
              ) : (
                <p className="mt-3 text-sm text-secondary/45">
                  Currently using {product.images?.length || 0} saved image(s)
                </p>
              )}
            </Field>

            <Field label="Alternative Names" className="md:col-span-2">
              <input
                value={altNames}
                onChange={(e) => setAltNames(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Price">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className={inputClass}
              />
            </Field>

            <Field label="Labelled Price">
              <input
                value={labelledPrice}
                onChange={(e) => setLabelledPrice(e.target.value)}
                type="number"
                className={inputClass}
              />
            </Field>

            <Field label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Brand">
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={inputClass}
              >
                {brandOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Model">
              <input value={model} onChange={(e) => setModel(e.target.value)} className={inputClass} />
            </Field>

            <Field label="Visible on storefront">
              <select
                value={isVisible}
                onChange={(e) => setIsVisible(e.target.value)}
                className={inputClass}
              >
                <option value="true" className="bg-slate-900">
                  Yes
                </option>
                <option value="false" className="bg-slate-900">
                  No
                </option>
              </select>
            </Field>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111d33] via-[#0f192d] to-[#0b1424] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-accent/15 p-3 text-accent">
                <WandSparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Current Product Snapshot</h3>
                <p className="text-sm text-secondary/60">
                  Quick look before you save the changes.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <div className="flex h-56 items-center justify-center bg-white p-5">
                <img
                  src={previewImage}
                  alt={name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-secondary/45">
                  {category}
                </p>
                <h4 className="mt-2 text-xl font-semibold text-white">{name}</h4>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-secondary/65">
                  {description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-secondary/50">Brand / Model</p>
                    <p className="font-medium text-white">
                      {brand} {model}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-secondary/50">Price</p>
                    <p className="text-lg font-semibold text-white">Rs. {price || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex flex-wrap items-center justify-end gap-3 rounded-[24px] border border-white/10 bg-surface/90 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <button
            onClick={() => navigate("/admin/products")}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-secondary/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/5 hover:text-white active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <button
            onClick={handleUpdateProduct}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.32)] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            {submitting ? "Saving..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-secondary/75">
        {label}
      </label>
      {children}
    </div>
  );
}