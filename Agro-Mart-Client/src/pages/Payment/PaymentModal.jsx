// components/modals/PaymentModal.jsx
import React, { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaCcStripe } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeProvider";

const PaymentModal = ({ isOpen, closeModal, totalAmount }) => {
  const [agree, setAgree] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!agree || !selectedPayment) return;
  
    navigate(`/payment/${selectedPayment}`, { state: { totalAmount } });
    closeModal();
  };

  
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} tmx-auto max-w-lg rounded-2xl p-8 space-y-4 shadow-lg`}>
          <Dialog.Title className="text-2xl font-bold text-green-600 text-center mb-4">
            Select Payment Method
          </Dialog.Title>

          <div className="flex justify-between mt-4">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment"   value="bKash" onChange={(e) => setSelectedPayment(e.target.value)} />
              <span> bKash payment</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment"   value="Nagad" onChange={(e) => setSelectedPayment(e.target.value)} />
              <img src="https://i.ibb.co.com/8gg1wdLT/nogod.webp" className="h-5 rounded-md" />
              <span>Nagad payment</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment"  value="SSLCommerz" onChange={(e) => setSelectedPayment(e.target.value)} />
              <img src="https://i.ibb.co.com/ZRM8psgP/ssl.png" className="h-5 rounded-md" />
              <span>SSLCommerz</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment" value="stripe" onChange={(e) => setSelectedPayment(e.target.value)} />
              <img src="https://i.ibb.co.com/239TRV1T/stripe.png" alt="" className="h-5 rounded-md"/>
              <span>Stripe payment</span>
            </label>
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
              agree ? "bg-green-600 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
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
