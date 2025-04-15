"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/utils/types";

export interface CartItem {
  product: Product;
  qty: number;
}

export type Order = {
  id: string;
  items: {
    product: { id: string; title: string; price: number };
    qty: number;
  }[];
  total: number;
};

interface CartState {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addToCart: (product: Product, qty?: number) => void;
  updateQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  placeOrder: () => Order;
  saveOrder: (order: Order) => void;
  toggleWishlist: (product: Product) => void;
}


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      orders: [],
      addToCart: (product, qty = 1) => {
        const index = get().cart.findIndex(
          (item) => item.product.id === product.id
        );
        if (index !== -1) {
          const newCart = [...get().cart];
          newCart[index].qty += qty;
          set({ cart: newCart });
        } else {
          set({ cart: [...get().cart, { product, qty }] });
        }
      },
      updateQty: (id, qty) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === id ? { ...item, qty } : item
          ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((p) => p.id !== product.id)
              : [...state.wishlist, product],
          };
        }),
      placeOrder: () => {
        const cart = get().cart;
        const total = cart.reduce(
          (sum, item) => sum + item.product.price * item.qty,
          0
        );
        const order: Order = {
          id: `order-${Date.now()}`,
          items: cart.map((item) => ({
            product: {
              id: item.product.id.toString(),
              title: item.product.title,
              price: item.product.price,
            },
            qty: item.qty,
          })),
          total,
        };
        set((state) => ({
          cart: [],
          orders: [...state.orders, order],
        }));
        return order;
      },
      saveOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);

