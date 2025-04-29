import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useTranslation } from "react-i18next";

const WeeklySalesChart = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Sales");
  const { theme } = useContext(ThemeContext);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/weekly-sales`);
        const data = await res.json();
        setSalesData(data);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };
    fetchSalesData();
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#1F2937]" : "bg-white"
      } p-6 rounded-lg shadow-md`}
    >
      <h2 className="text-lg font-bold mb-4">
        {t("dashboard.weekly_sales_chart.title")}
      </h2>
      <div className="border-b">
        <button
          className={`mr-4 pb-2 font-semibold ${
            activeTab === "Sales"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-base-content"
          }`}
          onClick={() => setActiveTab("Sales")}
        >
          {t("dashboard.weekly_sales_chart.sales_tab")}
        </button>
        {/* <button
          className={`pb-2 font-semibold ${
            activeTab === "Orders"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-base-content"
          }`}
          onClick={() => setActiveTab("Orders")}
        >
          Orders
        </button> */}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div
                    className={`p-2 rounded shadow ${
                      theme === "dark"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="font-semibold">
                      {t("dashboard.weekly_sales_chart.tooltip.date")}:{" "}
                      {new Date(label).toISOString().split("T")[0]}
                    </p>
                    <p>
                      {t("dashboard.weekly_sales_chart.tooltip.value")}:{" "}
                      {payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {activeTab === "Sales" && (
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#16A34A"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          )}
          {/* {activeTab === "Orders" && (
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          )} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklySalesChart;
