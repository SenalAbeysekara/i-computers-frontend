import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-format";

export default function ProductCard(props) {
  const product = props.product;
  return (
    <Link
      to={"/overview/" + product.productId}
      className="w-[300px] h-[420px] m-4 rounded-lg bg-white shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 overflow-hidden relative"
    >
      {/* Product Image */}
      <div className="relative w-full h-[250px]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-0"
        />
        <img
          src={product.images[1]}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 hover:opacity-100"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 h-[170px] flex flex-col justify-between">
        <div className="text-sm text-gray-500 mb-2">{product.productId}</div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h2>

        {/* Price */}
        <div className="flex items-center">
          {product.labelledPrice > product.price && (
            <p className="text-sm text-red-600 line-through mr-2">{getFormattedPrice(product.labelledPrice)}</p>
          )}
          <p className="text-xl font-bold text-gray-900">{getFormattedPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}