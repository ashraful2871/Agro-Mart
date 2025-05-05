import React, { useEffect, useState } from "react";
import { FaLayerGroup, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SalesCards = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin-stats`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching sales stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p>{t("dashboard.sales_cards.loading")}</p>;
  }

  const salesData = [
    {
      id: 1,
      icon: <FaLayerGroup className="text-3xl" />,
      title: t("dashboard.sales_cards.today_orders"),
      amount: `$${stats.today.revenue.toFixed(2)}`,
      bgColor: "bg-teal-600",
    },
    {
      id: 2,
      icon: <FaLayerGroup className="text-3xl" />,
      title: t("dashboard.sales_cards.yesterday_orders"),
      amount: `$${stats.yesterday.revenue.toFixed(2)}`,
      bgColor: "bg-orange-500",
    },
    {
      id: 3,
      icon: <FaShoppingCart className="text-3xl" />,
      title: t("dashboard.sales_cards.this_month"),
      amount: `$${stats.thisMonth.revenue.toFixed(2)}`,
      bgColor: "bg-blue-500",
    },
    {
      id: 4,
      icon: <FaCreditCard className="text-3xl" />,
      title: t("dashboard.sales_cards.all_time_sales"),
      amount: `$${stats.allTime.revenue.toFixed(2)}`,
      bgColor: "bg-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
      {salesData.map((item) => (
        <div
          key={item.id}
          className={`p-6 rounded-lg shadow-md text-white ${item.bgColor}`}
        >
          <div className="flex justify-center">{item.icon}</div>
          <h2 className="text-lg font-semibold text-center">{item.title}</h2>
          <p className="text-2xl font-bold text-center">{item.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default SalesCards;
