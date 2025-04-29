import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { FaPrint } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTranslation } from "react-i18next";

const statusColors = {
  Pending: "badge-warning",
  Delivered: "badge-success",
  Processing: "badge-info",
};

const MyOrders = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [orderData, setOrderData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const user = useAuth();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/orders/${user?.email}`)
        .then((res) => {
          setOrderData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  }, [user?.email, axiosSecure]);

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

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-bold mb-10">
        {t("dashboard.my_orders.title")}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr
              className={`${
                theme === "dark" ? "bg-base-100" : "bg-gray-100"
              } text-base-content`}
            >
              <th>{t("dashboard.my_orders.table_headers.invoice_no")}</th>
              <th>{t("dashboard.my_orders.table_headers.order_time")}</th>
              <th>{t("dashboard.my_orders.table_headers.customer_email")}</th>
              <th>{t("dashboard.my_orders.table_headers.method")}</th>
              <th>{t("dashboard.my_orders.table_headers.amount")}</th>
              <th>{t("dashboard.my_orders.table_headers.status")}</th>
              <th>{t("dashboard.my_orders.table_headers.invoice")}</th>
            </tr>
          </thead>
          <tbody>
            {orderData.length > 0 ? (
              orderData.map((order) => (
                <tr key={order._id}>
                  <td className="font-semibold">{order.invoiceNo}</td>
                  <td>{new Date(order.date).toISOString().split("T")[0]}</td>
                  <td>{order.email}</td>
                  <td className="font-semibold">{order.method}</td>
                  <td className="font-semibold">{order.totalAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        statusColors[order.status] || "badge-ghost"
                      }`}
                    >
                      {t(`dashboard.my_orders.status.${order.status}`, {
                        defaultValue: order.status,
                      })}
                    </span>
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  {t("dashboard.my_orders.no_orders")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
