import OrderCard from "@/app/components/user/OrderCard";
import ProfileSidebar from "@/app/components/user/ProfileSidebar";
import { useCartStore } from "@/app/store/cartStore";

export default function OrdersPage() {
  const orders = useCartStore((s) => s.orders);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex gap-8">
      <ProfileSidebar />
      <section className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        {orders.length ? (
          <div className="space-y-4">
            {orders.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        ) : (
          <p>No orders yet.</p>
        )}
      </section>
    </div>
  );
}
