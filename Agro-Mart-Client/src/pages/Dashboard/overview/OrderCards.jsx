import React from "react";
import {
  FaShoppingCart,
  FaSyncAlt,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const orderData = [
  {
    id: 1,
    icon: <FaShoppingCart className="text-orange-500" />,
    title: "Total Order",
    value: "864",
    bgColor: "bg-orange-100",
  },
  {
    id: 2,
    icon: <FaSyncAlt className="text-blue-500" />,
    title: "Orders Pending",
    value: "270",
    extra: "(204669.96)",
    extraClass: "text-red-500 font-bold",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    icon: <FaTruck className="text-teal-500" />,
    title: "Orders Processing",
    value: "120",
    bgColor: "bg-teal-100",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-green-500" />,
    title: "Orders Delivered",
    value: "373",
    bgColor: "bg-green-100",
  },
];

const OrderCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {orderData.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-4 bg-white shadow-md rounded-lg "
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${item.bgColor}`}
          >
            {item.icon}
          </div>
          <div className="ml-4">
            <h2 className="text-gray-500 text-sm">{item.title}</h2>
            <p className="text-lg font-bold text-gray-800">
              {item.value}{" "}
              {item.extra && (
                <span className={item.extraClass}>{item.extra}</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCards;
