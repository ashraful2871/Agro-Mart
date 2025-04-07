import React from "react";
import CartItems from "./CartItems";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/loading/Loading";

const ShoppingCart = () => {
  const axiosSecure = useAxiosSecure();
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["all-cart"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-cart-items");
      return data;
    },
  });
  console.log(cartData);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="px-10 py-10  min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-10">My Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 border rounded-xl p-6">
          <div className="flex justify-between border-b pb-4 font-semibold text-sm uppercase">
            <span className="w-2/5">Product</span>
            <span className="w-1/5 text-center">Price</span>
            <span className="w-1/5 text-center">Quantity</span>
            <span className="w-1/5 text-center">Subtotal</span>
            <span className="w-1/12"></span>
          </div>

          {/* cart items */}
          {cartData?.map((cart) => (
            <CartItems cart={cart}></CartItems>
          ))}

          <div className="flex justify-between mt-6">
            <button className="btn rounded-full">Return to shop</button>
            <button className="btn rounded-full">Update Cart</button>
          </div>
        </div>

        <div className="w-full lg:w-1/3 border rounded-xl p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>$84.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Total:</span>
            <span>$84.00</span>
          </div>
          <button className="btn bg-green-600 w-full mt-4 rounded-full text-white font-bold text-base">
            Proceed to checkout
          </button>
        </div>
      </div>

      <div className="mt-10 border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Coupon Code</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter code"
            className="input input-bordered rounded-full w-64"
          />
          <button className="btn bg-black text-white rounded-full">
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
