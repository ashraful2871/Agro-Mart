import React from "react";
import { FaLayerGroup, FaShoppingCart, FaCreditCard } from "react-icons/fa";

const salesData = [
  {
    id: 1,
    icon: <FaLayerGroup className="text-3xl" />,
    title: "Today Orders",
    amount: "$0.00",
    cash: "$0.00",
    card: "$0.00",
    credit: "$0.00",
    bgColor: "bg-teal-600",
  },
  {
    id: 2,
    icon: <FaLayerGroup className="text-3xl" />,
    title: "Yesterday Orders",
    amount: "$761.31",
    cash: "$761.31",
    card: "$0.00",
    credit: "$0.00",
    bgColor: "bg-orange-500",
  },
  {
    id: 3,
    icon: <FaShoppingCart className="text-3xl" />,
    title: "This Month",
    amount: "$34330.36",
    bgColor: "bg-blue-500",
  },
  {
    id: 4,
    icon: <FaCreditCard className="text-3xl" />,
    title: "Last Month",
    amount: "$28486.10",
    bgColor: "bg-sky-600",
  },
  {
    id: 5,
    icon: <FaCreditCard className="text-3xl" />,
    title: "All-Time Sales",
    amount: "$566155.43",
    bgColor: "bg-green-600",
  },
];

const SalesCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
      {salesData.map((item) => (
        <div
          key={item.id}
          className={` p-6 rounded-lg shadow-md text-white ${item.bgColor}`}
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
