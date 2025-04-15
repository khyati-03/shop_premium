// app/page.tsx
"use client";

import { Product } from "@/app/utils/types";
import { getAllProducts } from "@/app/services/productService";
import ProductsClient from "./pages";
import { useEffect, useState } from "react";
import ProtectedRoute from "./contexts/ProtectedRoute";

export default function HomePage() {
  const [initial, setInitial] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then(setInitial)
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <ProductsClient initial={initial} />
      </div>
    </ProtectedRoute>
  );
}
