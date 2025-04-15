"use client";
import { useCartStore } from "@/app/store/cartStore";
import CartItemRow from "./CartItem";
import EmptyCart from "./EmptyCart";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { cart } = useCartStore();
  const total = cart.reduce((s, c) => s + c.product.price * c.qty, 0);

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-screen ${
        open ? "" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className={`absolute right-0 top-0 bottom-0 h-full w-80 bg-gray-800 shadow-lg transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between">
          <h2 className="font-semibold">Cart</h2>
          <button onClick={onClose} className="cursor-pointer">
            &times;
          </button>
        </header>

        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {cart.length ? (
            cart.map((i) => <CartItemRow key={i.product.id} item={i} />)
          ) : (
            <EmptyCart />
          )}
        </div>

        <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </p>
          <Link
            href="/cart/checkout"
            onClick={onClose}
            className="w-full mt-4 text-center block bg-[#475a77] text-white py-2 rounded hover:bg-[#475a77]/80 transition-colors"
          >
            View Cart
          </Link>
        </footer>
      </aside>
    </div>
  );
};

export default CartDrawer;
