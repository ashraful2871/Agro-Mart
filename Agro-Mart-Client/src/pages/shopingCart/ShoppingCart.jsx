import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/loading/Loading";
import useAuth from "../../hooks/useAuth";
import PaymentModal from "../Payment/PaymentModal";

const ShoppingCart = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const [subtotal, setSubtotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shippingFee = 100;
  const finalTotal = subtotal + shippingFee;

  const {
    data: cartData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-cart", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-cart-items/${user?.email}`);
      return data;
    },
  });

  // Initialize localStorage and calculate subtotal when cartData changes
  useEffect(() => {
    // Initialize localStorage with cartData
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
    cartData.forEach((item) => {
      if (!storedCart[item._id]) {
        storedCart[item._id] = {
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1, // Use quantity from cartData if available
          total: (item.quantity || 1) * item.price,
        };
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(storedCart));

    // Calculate subtotal from storedCart
    const total = Object.values(storedCart).reduce(
      (sum, item) => sum + item.total,
      0
    );
    setSubtotal(total);
  }, [cartData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {cartData?.length === 0 ? (
        <p className="text-center text-2xl sm:text-4xl font-semibold text-base-content mt-[30%] px-4">
          No shopping cart product added
        </p>
      ) : (
        <div className="px-4 sm:px-6 md:px-10 py-10 min-h-screen">
          <h1 className="text-center text-2xl sm:text-3xl font-bold mb-10">
            My Shopping Cart
          </h1>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-1 border rounded-xl p-4 sm:p-6 overflow-x-auto">
              <div className="hidden md:flex justify-between border-b pb-4 font-semibold text-sm uppercase">
                <span className="w-2/5">Product</span>
                <span className="w-1/5 text-center">Price</span>
                <span className="w-1/5 text-center">Quantity</span>
                <span className="w-1/5 text-center">Total</span>
                <span className="w-1/12"></span>
              </div>

              {/* CartItems renders a row of each item */}
              {cartData?.map((cart) => (
                <CartItems
                  key={cart._id}
                  cart={cart}
                  refetch={refetch}
                  onCartUpdate={() => {
                    const storedCart =
                      JSON.parse(localStorage.getItem("cartItems")) || {};
                    const total = Object.values(storedCart).reduce(
                      (sum, item) => sum + item.total,
                      0
                    );
                    setSubtotal(total);
                  }}
                />
              ))}

              <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                <button className="btn rounded-full w-full sm:w-auto">
                  Return to shop
                </button>
                <button className="btn rounded-full w-full sm:w-auto">
                  Update Cart
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-1/3 border rounded-xl p-4 sm:p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
              <div className="flex justify-between mb-2 text-sm sm:text-base">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm sm:text-base">
                <span>Shipping:</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn bg-green-600 w-full mt-4 rounded-full text-white font-bold text-base"
              >
                Proceed to checkout
              </button>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="grid grid-cols-12">
            <div className="mt-10 border rounded-xl p-4 sm:p-6 col-span-12 md:col-span-8">
              <h3 className="text-lg font-semibold mb-4">Coupon Code</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="input input-bordered rounded-full w-full sm:w-64"
                />
                <button className="btn bg-black text-white rounded-full w-full sm:w-auto">
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>

          {/* Modal */}
          <PaymentModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            totalAmount={finalTotal}
          />
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
