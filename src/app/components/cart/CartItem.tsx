'use client';
import { CartItem, useCartStore } from "@/app/store/cartStore";

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQty, removeFromCart } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b last:border-none">
      <img src={item.product.image} className="h-20 w-20 object-contain" />
      <div className="flex-1">
        <h3 className="font-medium line-clamp-1">{item.product.title}</h3>
        <p className="text-sm">
          ${item.product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min={1}
            value={item.qty}
            onChange={(e) => updateQty(item.product.id, +e.target.value)}
            className="w-16 input text-center"
          />
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="text-red-600 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
