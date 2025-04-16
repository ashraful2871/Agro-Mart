import { useContext, useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import OrderTable from "../overview/OrderTable";
import { ThemeContext } from "../../../provider/ThemeProvider";

const Orders = () => {
  const { theme } = useContext(ThemeContext);
  const [filters, setFilters] = useState({
    email: "",
    status: "",
    orderLimit: "",
    method: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
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
      {/* filter and action div */}
      <div
        className={`p-4  ${
          theme === "dark" ? "bg-[#1f29374b]" : "bg-white"
        } rounded-xl`}
      >
        {/* Filter Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <input
            type="text"
            name="email"
            placeholder="Search by Customer email"
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
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
          </select>
          <select
            name="orderLimit"
            value={filters.orderLimit}
            onChange={handleFilterChange}
            className={`w-full p-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="">Order Limits</option>
            <option value="10">Last 10 days Orders</option>
            <option value="50">Last 50 days Orders</option>
            <option value="100">Last 100 days Orders</option>
          </select>
          <select
            name="method"
            value={filters.method}
            onChange={handleFilterChange}
            className={`w-full p-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } bg-gray-800 text-base-content border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="">Method</option>
            <option value="Stripe">Stripe</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>

        {/* Date Pickers & Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center mt-4">
          <div className="col-span-2">
            <span className="text-gray-700 text-sm">Start Date</span>
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
            <span className="text-gray-700 text-sm">End Date</span>
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
          <button onClick={handleDownload} className="bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-700 transition">
            <FaCloudDownloadAlt /> Download All Orders
          </button>
          <div className="">
            <button
              onClick={resetFilters}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-6">
      <OrderTable filters={filters} />
      </div>
    </div>
  );
};

export default Orders;
