"use client";
import Link from "next/link";
import ThemeToggle from "../common/ThemeToggle";
import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import CartDrawer from "../cart/CartDrawer";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const count = useCartStore((state) => state.cart.length);
  const wishCount = useCartStore((state) => state.wishlist.length);
  const { user, logout } = useAuth();
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // clearCart();
    setOpen(false);
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/10 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Premium<span>Shop</span>
        </Link>
        <nav className="flex items-center gap-4">
          {user && (
            <>
              <Link href="/" className="hover:underline">
                Products
              </Link>
              <Link href="/wishlist" className="relative">
                <Heart className="cursor-pointer" size={20} />
                {wishCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white">
                    {wishCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer hover:underline"
              >
                Logout
              </button>
              <button onClick={() => setOpen(true)} className="relative">
                <ShoppingCart className="cursor-pointer" size={20} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 cursor-pointer rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
              <Link href="/user/profile" className="relative">
                <User className="cursor-pointer" size={22} />
              </Link>
            </>
          )}
          <ThemeToggle />
        </nav>
        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
