import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useReactToPrint } from "react-to-print";
import OrderInvoice from "./OrderInvoice";
import toast from "react-hot-toast";
import { OrderContext } from "./OrderProvider";

const statusColors = {
    Pending: "badge-warning",
    Delivered: "badge-success",
    Processing: "badge-info",
};

const RecentOrderTable = () => {
    const { theme } = useContext(ThemeContext);
    const [orderData, setOrderData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { orders, updateOrderStatus } = useContext(OrderContext);
    const componentRef = useRef();

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
        const success = await updateOrderStatus(id, newStatus);
        if (success) {
          toast.success("Order status updated successfully!");
        } else {
          toast.error("Failed to update order status!");
        }
      };
    
      useEffect(() => {
        console.log("Orders updated:", orders);
      }, [orders]);


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
                    {orders.map((order) => (
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
