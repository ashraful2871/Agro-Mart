import React, { useContext } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../../../provider/ThemeProvider";

const data = [
  { name: "Mint", value: 400, color: "#16A34A" },
  { name: "Yellow Sweet Corn", value: 300, color: "#2563EB" },
  { name: "Organic Baby Carrot", value: 300, color: "#F97316" },
  { name: "Lettuce", value: 350, color: "#38BDF8" },
];

const BestSellingProductsChart = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#1F2937]" : "bg-white"
      }  p-6 rounded-lg shadow-md`}
    >
      <h2 className="text-lg font-bold mb-4">Best Selling Products</h2>
      <ResponsiveContainer width="100%" height={335}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{
              display: "grid",
              gridTemplateColumns: "repeat(2, max-content)",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BestSellingProductsChart;
