"use client";
import { useCartStore } from "@/app/store/cartStore";
import ProductCard from "@/app/components/product/ProductCard";
import { useState } from "react";

export default function WishlistPage() {
  const wishlist = useCartStore((state) => state.wishlist);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);

  const handleRemove = (productId: number) => {
    setRemovingId(productId);
    setTimeout(() => {
      toggleWishlist({ id: productId } as any);
      setRemovingId(null);
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className={`transition-opacity duration-300 h-full ${
                removingId === product.id ? "opacity-0" : "opacity-100"
              }`}
            >
              <ProductCard
                product={product}
                showRemoveButton={true}
                onRemove={handleRemove}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
