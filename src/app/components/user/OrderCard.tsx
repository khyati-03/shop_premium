import { Order } from "@/app/store/cartStore";

const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
  <div className="border rounded-lg p-4">
    <h3 className="font-medium mb-2">Order #{order.id}</h3>
    <ul className="text-sm space-y-1">
      {order.items.map((i) => (
        <li key={i.product.id} className="flex justify-between">
          <span>
            {i.product.title} × {i.qty}
          </span>
          <span>${(i.product.price * i.qty).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <p className="text-right font-bold mt-2">
      Total: ${order.total.toFixed(2)}
    </p>
  </div>
);

export default OrderCard;
