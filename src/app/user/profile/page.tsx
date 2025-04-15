"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCartStore } from "@/app/store/cartStore";
import OrderCard from "@/app/components/user/OrderCard";
import { useState } from "react";
import { Download } from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth();
  const orders = useCartStore((state) => state.orders);

  const [filter, setFilter] = useState("all");
  const [avatar, setAvatar] = useState<string | null>(null);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) =>
          filter === "high"
            ? o.total > 100
            : o.total <= 100
        );

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const downloadPDF = () => {
    const printable = document.getElementById("order-summary")?.innerText || "";
    const blob = new Blob([printable], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "order-summary.txt";
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* User Info Section */}
      <div className="bg-white/10 p-6 rounded-lg shadow mb-10">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        <div className="flex items-center gap-6 mb-6">
          <label className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-300 cursor-pointer">
            {avatar ? (
              <img src={avatar} alt="avatar" className="object-cover w-full h-full" />
            ) : (
              <div className="bg-gray-500 w-full h-full flex items-center justify-center text-white text-sm">
                Upload
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Khyati Bhandari</h2>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-white/10 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Order History</h2>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input px-2 py-1 text-sm"
            >
              <option value="all">All Orders</option>
              <option value="low">Below $100</option>
              <option value="high">Above $100</option>
            </select>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-1 text-sm bg-white/10 border px-3 py-1 rounded hover:bg-white/20"
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-sm text-gray-400">You haven't placed any orders yet.</p>
        ) : (
          <div id="order-summary" className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
