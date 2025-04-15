import { Product } from "@/app/utils/types";
import { api } from "@/app/services/api";

const BASE = "https://fakestoreapi.com";

export const getAllProducts = () => api<Product[]>(`${BASE}/products`);
export const getProductById = (id: number) =>
  api<Product>(`${BASE}/products/${id}`);
export const getCategories = () => api<string[]>(`${BASE}/products/categories`);
