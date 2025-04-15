"use client";
import { useOffline } from "@/app/hooks/useOffline";
import { useCartStore } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, placeOrder } = useCartStore();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const offline = useOffline();

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // Redirect if cart is empty
  if (!cart.length) {
    router.replace("/cart");
    return null;
  }

  const validateStep1 = () => {
    const { fullName, address, city, zip } = form;
    if (!fullName || !address || !city || !zip) {
      toast.error("Please fill all shipping fields");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { cardNumber, expiry, cvc } = form;
    if (!cardNumber || !expiry || !cvc) {
      toast.error("Please enter all payment details");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (offline) return toast.error("You are offline. Try again later.");
    placeOrder();
    toast.success("Order placed successfully!");
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
          <input
            name="fullName"
            placeholder="Full Name"
            className="input mb-3"
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address Line"
            className="input mb-3"
            value={form.address}
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            className="input mb-3"
            value={form.city}
            onChange={handleChange}
          />
          <input
            name="zip"
            placeholder="ZIP"
            className="input mb-3"
            value={form.zip}
            onChange={handleChange}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <input
            name="cardNumber"
            placeholder="Card Number"
            className="input mb-3"
            value={form.cardNumber}
            onChange={handleChange}
          />
          <input
            name="expiry"
            placeholder="Expiry"
            className="input mb-3"
            value={form.expiry}
            onChange={handleChange}
          />
          <input
            name="cvc"
            placeholder="CVC"
            className="input mb-3"
            value={form.cvc}
            onChange={handleChange}
          />
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
          <button
            className="text-center block bg-[#ffffff] border border-[#475a77] text-[#475a77] py-2 px-3 rounded hover:bg-[#475a77]/80 transition-colors cursor-pointer"
            onClick={handlePrev}
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            className="text-center block bg-[#ffffff] border border-[#475a77] text-[#475a77] py-2 px-3 rounded hover:bg-[#475a77]/80 transition-colors cursor-pointer ml-auto"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="text-center block bg-[#475a77] text-white py-2 px-3 rounded hover:bg-[#475a77]/80 transition-colors ml-auto cursor-pointer"
            onClick={submit}
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
}
