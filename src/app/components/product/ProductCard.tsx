"use client";
import { Product } from "@/app/utils/types";
import { useCartStore } from "@/app/store/cartStore";
import { Heart } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  onQuickLook?: () => void;
  showRemoveButton?: boolean;
  onRemove?: (productId: number) => void;
}

export default function ProductCard({
  product,
  onQuickLook,
  showRemoveButton = false,
  onRemove,
}: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlist = useCartStore((state) => state.wishlist);
  const isWished = wishlist.some((w) => w.id === product.id);

  const [animate, setAnimate] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    const msg = isWished ? "Removed from Wishlist" : "Added to Wishlist";
    toast.success(msg);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const quantity = 1;
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.title} added to cart`);
  };
  

  return (
    <div
      className="group relative bg-white/10 rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onQuickLook}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain"
      />
      <h3 className="mt-2 font-medium line-clamp-2">{product.title}</h3>

      <div className="mt-1 mb-3 flex items-center justify-between">
        <p className="text-blue-700 font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <Heart
          onClick={handleWishlist}
          className={clsx(
            "w-5 h-5 cursor-pointer transition-transform",
            isWished ? "fill-red-500 text-red-500" : "text-gray-400",
            animate && "scale-125"
          )}
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-auto cursor-pointer w-full mt-4 text-center block bg-[#475a77] text-white py-2 rounded hover:bg-[#475a77]/80 transition-colors"
      >
        Add to Cart
      </button>

      {showRemoveButton && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.id);
          }}
          className="text-sm text-red-500 mt-4 underline cursor-pointer"
        >
          Remove
        </button>
      )}
    </div>
  );
}
