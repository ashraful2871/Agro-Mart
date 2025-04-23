import React, { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeProvider";

const PaymentModal = ({ isOpen, closeModal, totalAmount, cartItems }) => {
  const [agree, setAgree] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!agree || !selectedPayment) return;

    navigate(`/payment/${selectedPayment}`, {
      state: {
        totalAmount,
        cartItems: cartItems.map((item) => ({
          ...item,
          // Get quantity from localStorage
          quantity:
            JSON.parse(localStorage.getItem("cartItems"))?.[item._id]
              ?.quantity || 1,
        })),
      },
    });
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } mx-auto max-w-lg rounded-2xl p-8 space-y-4 shadow-lg`}
        >
          <Dialog.Title className="text-2xl font-bold text-green-600 text-center mb-4">
            Select Payment Method
          </Dialog.Title>

          <div className="flex justify-between mt-4">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="stripe"
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <span>Stripe payment</span>
            </label>
            {/* Other payment options... */}
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              I agree to the{" "}
              <a href="#" className="text-green-600 underline">
                Terms And Conditions, Refund Policy
              </a>
            </label>
            {!agree && (
              <p className="text-red-500 text-sm mt-1">
                Please check our terms and conditions.
              </p>
            )}
          </div>

          <button
            onClick={handleProceed}
            disabled={!agree}
            className={`w-full py-2 px-4 rounded-full font-bold text-base ${
              agree
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed To Payment
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
