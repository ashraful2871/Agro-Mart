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

const OrderTable = ({ filters }) => {
  const { theme } = useContext(ThemeContext);
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const componentRef = useRef();

  const fetchOrders = async (page = 1, filters) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit: 8,
        email: filters.email || "",
        status: filters.status || "",
        orderLimit: filters.orderLimit || "",
        method: filters.method || "",
        startDate: filters.startDate || "",
        endDate: filters.endDate || "",
      });
      const res = await fetch(`http://localhost:5000/orders?${queryParams}`);
      const data = await res.json();
      setOrderData(data.orders);
      setTotalPages(data.totalPages);
      setTotalOrders(data.totalOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, filters);
  }, [currentPage, filters]);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (result.modifiedCount > 0) {
        setOrderData((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated successfully!");
        fetchOrders(currentPage, filters);
      } else {
        toast.error("Failed to update order status!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating status.");
    }
  };

  return (
    <div
      className={`overflow-x-auto ${
        theme === "dark" ? "bg-[#1F2937]" : "bg-base-100"
      } p-6 rounded-lg shadow-md`}
    >
      <table className="table w-full">
        <thead>
          <tr
            className={`${
              theme === "dark" ? "bg-base-100" : "bg-gray-100"
            } text-base-content`}
          >
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
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Processing</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => triggerPrint(order)}
                  className="btn btn-ghost btn-sm"
                >
                  <FaPrint size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-base-content">
          SHOWING {(currentPage - 1) * 8 + 1} -{" "}
          {Math.min(currentPage * 8, totalOrders)} OF {totalOrders}
        </p>
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`join-item btn btn-sm ${
                currentPage === i + 1 ? "btn-success" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Hidden printable component */}
      <div style={{ display: "none" }}>
        {selectedOrder && (
          <div ref={componentRef}>
            <OrderInvoice order={selectedOrder} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
