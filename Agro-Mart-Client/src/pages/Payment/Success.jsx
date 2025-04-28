import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction was completed
          successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white py-2 px-4 rounded-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
