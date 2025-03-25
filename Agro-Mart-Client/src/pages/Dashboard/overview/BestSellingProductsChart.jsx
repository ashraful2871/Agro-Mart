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
      } p-4 md:p-6 rounded-lg shadow-md w-full h-full`}
    >
      <h2 className="text-lg font-bold mb-4">Best Selling Products</h2>
      <div className="w-full ">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="60%"
              paddingAngle={2}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
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
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px 16px",
                paddingTop: "16px",
                fontSize: "14px",
              }}
              formatter={(value, entry, index) => (
                <span className="text-sm">{data[index].name}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BestSellingProductsChart;
