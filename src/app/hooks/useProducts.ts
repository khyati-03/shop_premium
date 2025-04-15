import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { Product } from "../utils/types";

type Sort = "price-asc" | "price-desc" | "title";
type Filter = { category: string | "all" };

export const useProducts = (sort: Sort, filter: Filter) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((p) => {
        let products = [...p];
        if (filter.category !== "all")
          products = products.filter((x) => x.category === filter.category);
        if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
        if (sort === "title")
          products.sort((a, b) => a.title.localeCompare(b.title));
        setData(products);
      })
      .finally(() => setLoading(false));
  }, [sort, filter]);

  return { data, loading };
};
