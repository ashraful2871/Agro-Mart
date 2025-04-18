import React, { useContext, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from "recharts";
import { ThemeContext } from "../../../provider/ThemeProvider";

const salesData = [
  { date: "2025-03-16", sales: 1, orders: 1 },
  { date: "2025-03-17", sales: 2, orders: 2 },
  { date: "2025-03-18", sales: 1.5, orders: 2 },
  { date: "2025-03-19", sales: 0.5, orders: 1 },
  { date: "2025-03-21", sales: 1.3, orders: 2 },
  { date: "2025-03-22", sales: 0.9, orders: 3 },
];

const WeeklySalesChart = () => {
  const [activeTab, setActiveTab] = useState("Sales");
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#1F2937]" : "bg-white"
      } p-6 rounded-lg shadow-md`}
    >
      <h2 className="text-lg font-bold mb-4">Weekly Sales</h2>
      <div className="border-b">
        <button
          className={`mr-4 pb-2 font-semibold  ${
            activeTab === "Sales"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-base-content"
          }`}
          onClick={() => setActiveTab("Sales")}
        >
          Sales
        </button>
        <button
          className={`pb-2 font-semibold ${
            activeTab === "Orders"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-base-content"
          }`}
          onClick={() => setActiveTab("Orders")}
        >
          Orders
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
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
          {activeTab === "Orders" && (
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklySalesChart;