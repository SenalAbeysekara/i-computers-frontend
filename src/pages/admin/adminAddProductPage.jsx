import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, Save, Sparkles } from "lucide-react";
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

export default function AdminAddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labelledPrice, setLabelledPrice] = useState("");
  const [category, setCategory] = useState("Others");
  const [brand, setBrand] = useState("Generic");
  const [model, setModel] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const previewImage = useMemo(() => {
    if (files.length > 0) return URL.createObjectURL(files[0]);
    return "/logo.png";
  }, [files]);

  async function handleAddProduct() {
    try {
      if (!name.trim()) return toast.error("Product name cannot be empty");
      if (!description.trim()) return toast.error("Product description cannot be empty");

      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("You must be logged in to add a product");
        window.location.href = "/login";
        return;
      }

      setSubmitting(true);

      const imageURLs = await Promise.all(
        Array.from(files).map((file) => uploadFile(file))
      );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          productId,
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
          isVisible: isVisible === true || isVisible === "true",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-secondary/40">
          Admin / Add Product 
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111d33] via-[#0f192d] to-[#0b1424] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Product Information</h2>
            <p className="mt-2 text-sm text-secondary/60">
              Fill in the main product details clearly so it looks polished on the storefront.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Product ID">
              <input
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Ex: ID001"
                className={inputClass}
              />
            </Field>

            <Field label="Product Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Gaming Laptop"
                className={inputClass}
              />
            </Field>

            <Field label="Description" className="md:col-span-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a clear product description"
                className={`${inputClass} min-h-[160px] resize-none`}
              />
            </Field>

            <Field label="Images" className="md:col-span-2">
              <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-white/5 p-6 text-center transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.07]">
                <ImagePlus className="mb-3 h-8 w-8 text-accent" />
                <span className="font-medium text-white">Upload product images</span>
                <span className="mt-1 text-sm text-secondary/60">
                  You can select multiple files
                </span>
                <input
                  multiple
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                  className="hidden"
                />
              </label>

              {files.length > 0 && (
                <p className="mt-3 text-sm text-secondary/65">
                  {files.length} file(s) selected
                </p>
              )}
            </Field>

            <Field label="Alternative Names" className="md:col-span-2">
              <input
                value={altNames}
                onChange={(e) => setAltNames(e.target.value)}
                placeholder="Laptop, Notebook, Portable Computer"
                className={inputClass}
              />
            </Field>

            <Field label="Price">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="50000"
                className={inputClass}
              />
            </Field>

            <Field label="Labelled Price">
              <input
                value={labelledPrice}
                onChange={(e) => setLabelledPrice(e.target.value)}
                type="number"
                placeholder="60000"
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
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Ex: Inspiron 15"
                className={inputClass}
              />
            </Field>

            <Field label="Visible on storefront">
              <select
                value={String(isVisible)}
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
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Publishing Tips</h3>
                <p className="text-sm text-secondary/60">
                  Make products look cleaner and easier to sell.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm leading-6 text-secondary/70">
              <li>Use a clear product name with brand and model.</li>
              <li>Add 2 to 5 sharp images for better product appeal.</li>
              <li>Use labelled price to show discounts clearly.</li>
              <li>Keep alternative names comma separated for better search results.</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111d33] via-[#0f192d] to-[#0b1424] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <h3 className="mb-4 font-semibold text-white">Quick Preview</h3>

            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <div className="flex h-56 items-center justify-center bg-white p-5">
                <img
                  src={previewImage}
                  alt={name || "Preview"}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-secondary/45">
                  {category || "Category"}
                </p>

                <h4 className="mt-3 text-xl font-semibold text-white">
                  {name || "Your product name"}
                </h4>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-secondary/65">
                  {description || "Your product description will appear here."}
                </p>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-secondary/50">Brand / Model</p>
                    <p className="font-medium text-white">
                      {brand || "-"} {model || ""}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-secondary/50">Price</p>
                    <p className="text-lg font-semibold text-white">Rs. {price || "0"}</p>
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
            onClick={handleAddProduct}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_24px_rgba(59,130,246,0.32)] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            {submitting ? "Saving..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.3em] text-secondary/40">
        Admin / Product Editor
      </p>
      <h1 className="text-3xl font-semibold md:text-4xl text-white">{title}</h1>
      <p className="max-w-3xl text-secondary/65">{subtitle}</p>
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