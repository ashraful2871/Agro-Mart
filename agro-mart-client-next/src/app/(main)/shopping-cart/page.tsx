"use client";
import React from "react";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/ui/Loading";
import ProductPrice from "@/components/ui/ProductPrice";
import PrivateRoute from "@/guards/PrivateRoute";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ShoppingCartPage() {
  const [cart, refetchCart] = useCart();
  const user = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRemove = async (id: string) => {
    try {
      await axiosSecure.delete(`/cart/${id}`);
      toast.success("Item removed");
      refetchCart();
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const totalPrice = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  return (
    <PrivateRoute>
      <div className="w-11/12 mx-auto py-10">
        <h1 className="text-4xl font-bold font-syne text-center mb-8">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link href="/shop" className="btn bg-green-600 text-white">Continue Shopping</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: any) => (
                  <tr key={item._id}>
                    <td className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                      <span>{item.name}</span>
                    </td>
                    <td><ProductPrice amount={item.price} /></td>
                    <td>{item.quantity}</td>
                    <td>
                      <button onClick={() => handleRemove(item._id)} className="btn btn-error btn-sm text-white">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <div className="text-right space-y-2">
                <h3 className="text-2xl font-bold">Total: <ProductPrice amount={totalPrice} /></h3>
                <Link href="/payment/stripe" className="btn bg-green-600 text-white">Proceed to Checkout</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
