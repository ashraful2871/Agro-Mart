import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { FaPrint } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusColors = {
    Pending: "badge-warning",
    Delivered: "badge-success",
    Processing: "badge-info",
};

const MyOrders = () => {
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
            console.error("Error fetching wishlist:", err);
          });
      }
    }, [user?.email]);

    const handleDownloadOrder = async (orderId, invoiceNo) => {
        try {
          const res = await fetch(`http://localhost:5000/orders/${orderId}/download`);
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
      <h2 className="text-center text-3xl font-bold mb-10">My Orders</h2>

      <div className="overflow-x-auto">
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
              <th>INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {orderData.length > 0 ? (
              orderData.map((order) => (
                <tr key={order._id}>
                  <td className="font-semibold">{order.invoiceNo}</td>
                  <td>{new Date(order.date).toISOString().split('T')[0]}</td>
                  <td>{order.email}</td>
                  <td className="font-semibold">{order.method}</td>
                  <td className="font-semibold">{order.totalAmount}</td>
                  <td>
                    <span className={`badge ${statusColors[order.status] || "badge-ghost"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDownloadOrder(order._id, order.invoiceNo)}
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
                  No orders found.
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
