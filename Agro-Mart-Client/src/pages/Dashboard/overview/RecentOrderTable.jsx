import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useReactToPrint } from "react-to-print";
import OrderInvoice from "./OrderInvoice";
import toast from "react-hot-toast";

const statusColors = {
    Pending: "badge-warning",
    Delivered: "badge-success",
    Processing: "badge-info",
};

const RecentOrderTable = () => {
    const { theme } = useContext(ThemeContext);
    const [orderData, setOrderData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const componentRef = useRef();

    const fetchOrders = async () => {
        try {
            const res = await fetch(`http://localhost:5000/orders?limit=10&sort=desc`);
            const data = await res.json();
            setOrderData(data.orders);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => setSelectedOrder(null),
    });

    const triggerPrint = (order) => {
        setSelectedOrder(order);
    };

    useEffect(() => {
        if (!selectedOrder) return;
        const waitForDomUpdate = setTimeout(() => {
            handlePrint();
        }, 300);
        return () => clearTimeout(waitForDomUpdate);
    }, [selectedOrder]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            const result = await res.json();

            if (result.modifiedCount > 0) {
                setOrderData((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === id ? { ...order, status: newStatus } : order
                    )
                );
                toast.success("Order status updated successfully!");
                fetchOrders();
            } else {
                toast.error("Failed to update order status!");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("An error occurred while updating status.");
        }
    };

    return (
        <div className={`overflow-x-auto ${theme === "dark" ? "bg-[#1F2937]" : "bg-base-100"} p-6 rounded-lg shadow-md`}>
            <table className="table w-full">
                <thead>
                    <tr className={`${theme === "dark" ? "bg-base-100" : "bg-gray-100"} text-base-content`}>
                        <th>INVOICE NO</th>
                        <th>ORDER TIME</th>
                        <th>CUSTOMER EMAIL</th>
                        <th>METHOD</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                        <th>INVOICE</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.map((order) => (
                        <tr key={order._id}>
                            <td className="font-semibold">{order.invoiceNo}</td>
                            <td>{order.date}</td>
                            <td>{order.email}</td>
                            <td className="font-semibold">{order.method}</td>
                            <td className="font-semibold">{order.totalAmount}</td>
                            <td>
                                <span className={`badge ${statusColors[order.status]}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <select
                                    className="select select-bordered select-sm"
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option>Pending</option>
                                    <option>Delivered</option>
                                    <option>Processing</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => triggerPrint(order)} className="btn btn-ghost btn-sm">
                                    <FaPrint size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Hidden Invoice Component for Print */}
            {selectedOrder && (
                <div style={{ display: "none" }}>
                    <OrderInvoice ref={componentRef} order={selectedOrder} />
                </div>
            )}
        </div>
    );
};

export default RecentOrderTable;
