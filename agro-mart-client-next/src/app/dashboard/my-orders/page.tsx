"use client";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import ProductPrice from "@/components/ui/ProductPrice";

export default function MyOrdersPage() {
  const user = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/orders/${user.email}`).then(({ data }) => setOrders(data || [])).catch(console.error);
    }
  }, [user?.email, axiosSecure]);

  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center py-10">No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead><tr><th>#</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map((order: any, i: number) => (
                <tr key={order._id}>
                  <td>{i + 1}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td><ProductPrice amount={order.totalAmount} /></td>
                  <td><span className={`badge ${order.status === "delivered" ? "badge-success" : "badge-warning"}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
