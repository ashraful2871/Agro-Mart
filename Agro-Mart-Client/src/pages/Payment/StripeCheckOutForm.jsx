import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useCart from "../../hooks/useCart";
import { ThemeContext } from "../../provider/ThemeProvider";

const StripeCheckOutForm = ({ totalAmount }) => {
  const user = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [cart] = useCart();
  const { theme } = useContext(ThemeContext);

  // Create payment intent when totalAmount changes
  useEffect(() => {
    if (!totalAmount || totalAmount <= 0) return;

    // console.log("Total Amount:", totalAmount);
    axiosSecure
      .post("/create-payment-intent", { totalAmount })
      .then((res) => {
        // console.log("Payment intent response:", res.data);
        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
          //   toast.success("Payment intent created successfully!");
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

  // Handle form submission for payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if Stripe and Elements are loaded
    if (!stripe || !elements) {
      const msg = "Stripe or Elements not loaded. Please refresh the page.";
      setError(msg);
      toast.error(msg);
      return;
    }

    // Check if clientSecret is available
    if (!clientSecret) {
      const msg = "Payment intent not initialized. Please try again.";
      setError(msg);
      toast.error(msg);
      return;
    }

    // Get CardElement
    const card = elements.getElement(CardElement);
    if (!card) {
      const msg = "Card input not found. Please refresh the page.";
      setError(msg);
      toast.error(msg);
      return;
    }

    // Clear previous errors
    setError("");

    // Create payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      toast.error(paymentMethodError.message);
      return;
    }

    // Confirm card payment
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
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);

      // Save payment info to server
      const paymentInfo = {
        email: user?.email || "anonymous",
        name: user?.name || "anonymous",
        totalAmount,
        status: "Pending",
        method: "Stripe",
        transactionId: paymentIntent.id,
        cartIds: cart.map((item) => item._id),
        productId: cart.map((item) => item.productId),
        date: new Date().toLocaleDateString("en-CA"),
        invoiceNo: Math.floor(100000 + Math.random() * 900000),
      };
      console.log(paymentInfo);
      try {
        const res = await axiosSecure.post("/payments", paymentInfo);

        if (res?.data?.result?.insertedId) {
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
        } else {
          throw new Error("Payment record not saved");
        }
      } catch (err) {
        const msg = `Failed to save payment: ${err.message}`;
        setError(msg);
        toast.error(msg);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full max-w-4xl">
      {/* Left: Credit Card visual */}
      <div className="bg-violet-600 p-6 flex items-center justify-center">
        <img
          src="https://i.ibb.co.com/0RR4FvFP/card.jpg"
          alt="Card Preview"
          className="w-[280px] shadow-xl rounded-xl"
        />
      </div>

      {/* Right: Payment Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-4 w-full">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Payment Details
        </h2>

        <div>
          <label className={`text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-700"}`}>Card Details</label>
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

        <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-blue-500" />
          <span className="text-sm text-gray-600">
            Save my details for further payment.
          </span>
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-2 rounded-md font-semibold disabled:opacity-50"
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
