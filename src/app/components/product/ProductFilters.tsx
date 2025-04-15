"use client";
import { getCategories } from "@/app/services/productService";
import { useState, useEffect } from "react";

interface Props {
  sort: string;
  setSort: (s: any) => void;
  category: string;
  setCategory: (c: any) => void;
}

const ProductFilters: React.FC<Props> = ({
  sort,
  setSort,
  category,
  setCategory,
}) => {
  const [cats, setCats] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then((c) => setCats(c));
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white/10 rounded shadow">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select cursor-pointer"
      >
        <option value="all">All Categories</option>
        {cats.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="select cursor-pointer"
      >
        <option value="title">Alphabetical</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
    </div>
  );
};

export default ProductFilters;
