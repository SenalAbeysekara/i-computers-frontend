import { useMemo, useState } from "react";

export default function ImageSlideShow({ images = [] }) {
  const safeImages = useMemo(
    () => (images.length ? images : ["/logo.png"]),
    [images]
  );
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full">
      <div className="rounded-[28px] border border-white/10 bg-[#101a2d] p-4">
        <div className="flex h-[380px] items-center justify-center overflow-hidden rounded-[24px] bg-white p-6 md:h-[500px]">
          <img
            src={safeImages[activeImage]}
            alt="Product"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {safeImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 bg-white p-2 transition ${
                index === activeImage
                  ? "border-accent shadow-[0_0_0_2px_rgba(59,130,246,0.15)]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <img
                src={img}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}