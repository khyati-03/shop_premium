"use client";
import { Product } from "@/app/utils/types";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductQuickLookModal: React.FC<Props> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        >
          &times;
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="h-56 mx-auto object-contain"
        />
        <h2 className="mt-4 text-xl font-semibold">{product.title}</h2>
        <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
        <p className="mt-4 text-sm line-clamp-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductQuickLookModal;
