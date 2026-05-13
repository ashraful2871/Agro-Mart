"use client";
import { useContext } from "react";
import { OrderContext } from "@/providers/OrderProvider";
import ProductPrice from "@/components/ui/ProductPrice";

export default function AllOrdersPage() {
  const { orders } = useContext(OrderContext);

  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead><tr><th>#</th><th>Email</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((order: any, i: number) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order.email}</td>
                <td><ProductPrice amount={order.totalAmount} /></td>
                <td><span className={`badge ${order.status === "delivered" ? "badge-success" : "badge-warning"}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
