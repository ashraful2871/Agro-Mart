import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          You cancelled the payment. Please try again if needed.
        </p>
        <button
          onClick={() => navigate("/shopping-cart")}
          className="bg-green-600 text-white py-2 px-4 rounded-full"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
