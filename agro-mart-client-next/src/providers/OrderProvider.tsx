"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OrderContextType {
  orders: any[];
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, newStatus: string) => Promise<boolean>;
}

export const OrderContext = createContext<OrderContextType>({
  orders: [],
  fetchOrders: async () => {},
  updateOrderStatus: async () => false,
});

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders?limit=10&sort=desc`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (result.modifiedCount > 0) {
        await fetchOrders();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating status:", error);
      return false;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
