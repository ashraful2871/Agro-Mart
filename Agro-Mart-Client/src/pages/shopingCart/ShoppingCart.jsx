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

  const { data: cartData = [], isLoading, refetch } = useQuery({
    queryKey: ["all-cart", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-cart-items/${user?.email}`);
      return data;
    },
  });  

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
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
        <p className="text-center text-4xl font-semibold text-base-content mt-[20%]">
          No shopping cart product added
        </p>
      ) : (
        <div className="px-10 py-10 min-h-screen">
          <h1 className="text-center text-3xl font-bold mb-10">
            My Shopping Cart
          </h1>
          <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto w-full">
            <div className="flex-1 border rounded-xl p-6">
              <div className="flex justify-between border-b pb-4 font-semibold text-sm uppercase">
                <span className="w-2/5">Product</span>
                <span className="w-1/5 text-center">Price</span>
                <span className="w-1/5 text-center">Quantity</span>
                <span className="w-1/5 text-center">Total</span>
                <span className="w-1/12"></span>
              </div>

              {/* cart items */}
              {cartData?.map((cart) => (
                <CartItems
                key={cart._id}
                cart={cart}
                refetch={refetch}
                onCartUpdate={() => {
                  const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
                  const total = Object.values(storedCart).reduce(
                    (sum, item) => sum + item.total,
                    0
                  );
                  setSubtotal(total);
                }}
              />
              
              ))}

              <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
                <button className="btn rounded-full">Return to shop</button>
                <button className="btn rounded-full">Update Cart</button>
              </div>
            </div>

            {/* Cart summary */}
            <div className="w-full lg:w-1/3 border rounded-xl p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="btn bg-green-600 w-full mt-4 rounded-full text-white font-bold text-base">
                Proceed to checkout
              </button>
            </div>
          </div>

          {/* Coupon section */}
          <div className="mt-10 border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Coupon Code</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter code"
                className="input input-bordered rounded-full"
              />
              <button className="btn bg-black text-white rounded-full">
                Apply Coupon
              </button>
            </div>
          </div>

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
