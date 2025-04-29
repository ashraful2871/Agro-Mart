import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useTranslation } from "react-i18next";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
];

const BestSellingProductsChart = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/best-selling-products`
        );
        const result = await res.json();
        console.log("Fetched Result:", result);

        if (Array.isArray(result)) {
          const preparedData = result.map((item, index) => ({
            name: item.name,
            value: item.totalOrderCount,
            color: COLORS[index % COLORS.length],
          }));
          setChartData(preparedData);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching best-selling products:", error);
        setChartData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#1F2937]" : "bg-white"
      } p-4 md:p-6 rounded-lg shadow-md w-full h-full`}
    >
      <h2 className="text-lg font-bold mb-4">
        {t("dashboard.best_selling_products_chart.title")}
      </h2>
      <div className="w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
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
                {chartData.map((entry, index) => (
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
                  <span className="text-sm">{chartData[index]?.name}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">
            {t("dashboard.best_selling_products_chart.no_data")}
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSellingProductsChart;
