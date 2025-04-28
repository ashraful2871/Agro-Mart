import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCloudDownloadAlt } from "react-icons/fa";
import OrderTable from "../overview/OrderTable";
import { ThemeContext } from "../../../provider/ThemeProvider";

const Orders = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [filters, setFilters] = useState({
    email: "",
    status: "",
    orderLimit: "",
    method: "",
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // Added missing state

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setFilters({
      email: "",
      status: "",
      orderLimit: "",
      method: "",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
  };

  const handleDownload = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders/download");
      const blob = await res.blob();

      if (!blob || blob.size === 0) {
        throw new Error(
          t("dashboard.seller.customer-orders.download_error", {
            error: "File is empty or failed to fetch.",
          })
        );
      }

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "orders.csv";
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="py-10">
      {/* Filter and action div */}
      <div
        className={`p-4 ${
          theme === "dark" ? "bg-[#1f29374b]" : "bg-white"
        } rounded-xl`}
      >
        {/* Filter Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <input
            type="text"
            name="email"
            placeholder={t(
              "dashboard.seller.customer-orders.email_placeholder"
            )}
            value={filters.email}
            onChange={handleFilterChange}
            className={`w-full p-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className={`w-full p-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="">
              {t("dashboard.seller.customer-orders.status_label")}
            </option>
            <option value="Pending">
              {t("dashboard.seller.customer-orders.status_options.pending")}
            </option>
            <option value="Delivered">
              {t("dashboard.seller.customer-orders.status_options.delivered")}
            </option>
            <option value="Processing">
              {t("dashboard.seller.customer-orders.status_options.processing")}
            </option>
          </select>
          <select
            name="orderLimit"
            value={filters.orderLimit}
            onChange={handleFilterChange}
            className={`w-full p-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="">
              {t("dashboard.seller.customer-orders.order_limit_label")}
            </option>
            <option value="10">
              {t("dashboard.seller.customer-orders.order_limit_options.10")}
            </option>
            <option value="50">
              {t("dashboard.seller.customer-orders.order_limit_options.50")}
            </option>
            <option value="100">
              {t("dashboard.seller.customer-orders.order_limit_options.100")}
            </option>
          </select>
          <select
            name="method"
            value={filters.method}
            onChange={handleFilterChange}
            className={`w-full p-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="">
              {t("dashboard.seller.customer-orders.method_label")}
            </option>
            <option value="Stripe">
              {t("dashboard.seller.customer-orders.method_options.stripe")}
            </option>
            <option value="Card">
              {t("dashboard.seller.customer-orders.method_options.card")}
            </option>
            <option value="Online">
              {t("dashboard.seller.customer-orders.method_options.online")}
            </option>
          </select>
        </div>

        {/* Date Pickers & Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center mt-4">
          <div className="col-span-2">
            <span className="text-gray-700 text-sm">
              {t("dashboard.seller.customer-orders.start_date_label")}
            </span>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className={`w-full p-2 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
          <div className="col-span-2">
            <span className="text-gray-700 text-sm">
              {t("dashboard.seller.customer-orders.end_date_label")}
            </span>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className={`w-full p-2 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between items-center mt-4">
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <FaCloudDownloadAlt />{" "}
            {t("dashboard.seller.customer-orders.download_button")}
          </button>
          <div>
            <button
              onClick={resetFilters}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
            >
              {t("dashboard.seller.customer-orders.reset_button")}
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-6">
        <OrderTable
          filters={filters}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Orders;
