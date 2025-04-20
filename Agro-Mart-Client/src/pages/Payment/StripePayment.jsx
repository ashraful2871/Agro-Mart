import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import StripeCheckOutForm from "./StripeCheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const StripePayment = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount;
  const cartItems = location.state?.cartItems;

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-300 flex justify-center items-center">
      <Elements stripe={stripePromise}>
        <StripeCheckOutForm totalAmount={totalAmount} cartItems={cartItems} />
      </Elements>
    </div>
  );
};

export default StripePayment;
