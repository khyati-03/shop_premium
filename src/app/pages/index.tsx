"use client";
import { useEffect, useState } from "react";
import { Product } from "@/app/utils/types";
import ProductCard from "@/app/components/product/ProductCard";
import ProductSkeleton from "@/app/components/product/ProductSkeleton";

export default function ProductsClient({ initial = [] }: { initial?: Product[] }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay 
    const timer = setTimeout(() => {
      setProducts(initial);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [initial]);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
