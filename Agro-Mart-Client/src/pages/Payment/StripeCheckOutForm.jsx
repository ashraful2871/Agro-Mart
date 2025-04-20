import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ThemeContext } from "../../provider/ThemeProvider";

const StripeCheckOutForm = ({ totalAmount, cartItems }) => {
  const user = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!totalAmount || totalAmount <= 0) return;

    axiosSecure
      .post("/create-payment-intent", { totalAmount })
      .then((res) => {
        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          throw new Error("No client secret received");
        }
      })
      .catch((error) => {
        console.error("Payment intent creation failed:", error);
        const message =
          error.response?.data?.message || error.message || "Unknown error";
        toast.error(`Failed to create payment intent: ${message}`);
        setError(`Failed to create payment intent: ${message}`);
      });
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe or Elements not loaded. Please refresh the page.");
      return;
    }

    if (!clientSecret) {
      setError("Payment intent not initialized. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card input not found. Please refresh the page.");
      return;
    }

    setError("");

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const paymentInfo = {
        email: user?.email,
        name: user?.displayName,
        totalAmount,
        status: paymentIntent.status,
        method: "Stripe",
        transactionId: paymentIntent.id,
        cartIds: cartItems.map((item) => item._id),
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          orderedQuantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        date: new Date().toISOString(),
        invoiceNo: Math.floor(100000 + Math.random() * 900000).toString(),
      };

      try {
        const res = await axiosSecure.post("/payments", paymentInfo);

        if (res.data?.success) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            timer: 1500,
            showConfirmButton: false,
            background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
            color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
          });
          localStorage.removeItem("cartItems");
          navigate("/shop");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Payment failed"
        );
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full max-w-4xl">
      <div className="bg-violet-600 p-6 flex items-center justify-center">
        <img
          src="https://i.ibb.co.com/0RR4FvFP/card.jpg"
          alt="Card Preview"
          className="w-[280px] shadow-xl rounded-xl"
        />
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-4 w-full">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Payment Details
        </h2>

        <div>
          <label className="text-sm text-gray-700">Card Details</label>
          <div className="border px-3 py-2 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold disabled:opacity-50"
        >
          Pay Now
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {transactionId && (
          <p className="text-green-500 text-sm">
            Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default StripeCheckOutForm;
