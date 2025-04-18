import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`http://localhost:5000/orders?limit=10&sort=desc`);
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/orders/${id}`, {
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
