import { useState } from "react";
import { useRouter } from "next/router";
import { useCartStore } from "@/app/store/cartStore";
import { useOffline } from "@/app/hooks/useOffline";

export default function Checkout() {
  const { cart, placeOrder } = useCartStore();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const offline = useOffline();

  if (!cart.length) return router.replace("/cart");

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    if (offline) return alert("You are offline. Try again later.");
    const order = placeOrder();
    router.replace("/user/orders");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Step Indicator */}
      <div className="stepper mb-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`step ${step === n ? "active" : ""}`}>
            <span className="step-number">{n}</span>
            {n < 3 && (
              <span className="w-8 h-px bg-gray-300 dark:bg-gray-700" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <input placeholder="Full Name" className="input mb-3" required />
          <input placeholder="Address Line" className="input mb-3" required />
          <input placeholder="City" className="input mb-3" required />
          <input placeholder="ZIP" className="input mb-3" required />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <input placeholder="Card Number" className="input mb-3" required />
          <input placeholder="Expiry" className="input mb-3" required />
          <input placeholder="CVC" className="input mb-3" required />
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
          <ul className="space-y-2">
            {cart.map((c) => (
              <li key={c.product.id} className="flex justify-between">
                <span>
                  {c.product.title} × {c.qty}
                </span>
                <span>${(c.product.price * c.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-right font-bold mt-4">
            Total: $
            {cart.reduce((s, c) => s + c.product.price * c.qty, 0).toFixed(2)}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button className="btn" onClick={prev}>
            Back
          </button>
        )}
        {step < 3 ? (
          <button className="btn ml-auto" onClick={next}>
            Next
          </button>
        ) : (
          <button
            className="text-center block bg-[#475a77] text-white py-2 rounded hover:bg-[#475a77]/80 transition-colors ml-auto"
            onClick={submit}
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
}
