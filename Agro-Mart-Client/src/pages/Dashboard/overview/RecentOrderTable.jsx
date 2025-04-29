import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import { OrderContext } from "./OrderProvider";
import { useTranslation } from "react-i18next";

const statusColors = {
  Pending: "badge-warning",
  Delivered: "badge-success",
  Processing: "badge-info",
};

const RecentOrderTable = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
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

  const handleDownloadOrder = async (orderId, invoiceNo) => {
    try {
      const res = await fetch(
        `http://localhost:5000/orders/${orderId}/download`
      );
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `order_${invoiceNo}.csv`;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const success = await updateOrderStatus(id, newStatus);
    if (success) {
      toast.success(t("dashboard.recent_order_table.toast.success"));
    } else {
      toast.error(t("dashboard.recent_order_table.toast.error"));
    }
  };

  useEffect(() => {
    console.log("Orders updated:", orders);
  }, [orders]);

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
            <th>
              {t("dashboard.recent_order_table.table_headers.invoice_no")}
            </th>
            <th>
              {t("dashboard.recent_order_table.table_headers.order_time")}
            </th>
            <th>
              {t("dashboard.recent_order_table.table_headers.customer_email")}
            </th>
            <th>{t("dashboard.recent_order_table.table_headers.method")}</th>
            <th>{t("dashboard.recent_order_table.table_headers.amount")}</th>
            <th>{t("dashboard.recent_order_table.table_headers.status")}</th>
            <th>{t("dashboard.recent_order_table.table_headers.action")}</th>
            <th>{t("dashboard.recent_order_table.table_headers.invoice")}</th>
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
                  {t(`dashboard.my_orders.status.${order.status}`)}
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
                  <option value="Pending">
                    {t("dashboard.my_orders.status.Pending")}
                  </option>
                  <option value="Delivered">
                    {t("dashboard.my_orders.status.Delivered")}
                  </option>
                  <option value="Processing">
                    {t("dashboard.my_orders.status.Processing")}
                  </option>
                </select>
              </td>
              <td>
                <button
                  onClick={() =>
                    handleDownloadOrder(order._id, order.invoiceNo)
                  }
                  className="btn btn-ghost btn-sm"
                >
                  <FaPrint size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrderTable;
