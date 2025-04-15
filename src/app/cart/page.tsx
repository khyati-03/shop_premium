"use client";
import CartItemRow from "@/app/components/cart/CartItem";
import EmptyCart from "@/app/components/cart/EmptyCart";
import { useCartStore } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart } = useCartStore();
  const total = cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      {cart.length ? (
        <>
          {cart.map((i) => (
            <CartItemRow key={i.product.id} item={i} />
          ))}
          <div className="flex justify-end mt-6 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
          <button
            className="text-center block bg-[#475a77] text-white py-2 rounded hover:bg-[#475a77]/80 transition-colors ml-auto mt-8"
            onClick={() => router.push("/cart/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
