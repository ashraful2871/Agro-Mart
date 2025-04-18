import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaSyncAlt, FaTruck, FaCheckCircle,} from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { MdOutlineShoppingCart } from "react-icons/md";
import { OrderContext } from "./OrderProvider";

const OrderCards = () => {
  const { theme } = useContext(ThemeContext);
  const [orderStats, setOrderStats] = useState(null);
  const { orders } = useContext(OrderContext);

  useEffect(() => {
      fetch("http://localhost:5000/order-stats")
          .then(res => res.json())
          .then(data => setOrderStats(data));
  }, []);

  const orderData = [
    {
      id: 1,
      icon: (
        <MdOutlineShoppingCart
          className={`${
            theme === "dark" ? "text-white" : "text-orange-500"
          }  text-xl`}
        />
      ),
      title: "Total Order",
      value: orderStats?.totalOrders || 0,
      bgColor: `${theme === "dark" ? "bg-orange-500" : "bg-orange-100"}`,
    },
    {
      id: 2,
      icon: (
        <FaSyncAlt
          className={`${
            theme === "dark" ? "text-white" : "text-blue-500"
          }  text-xl`}
        />
      ),
      title: "Orders Pending",
      value: orderStats?.stats?.find(item => item._id === "Pending")?.totalOrders || 0,
      extra: `($${orderStats?.stats?.find(item => item._id === "Pending")?.totalAmount || 0})`,
      extraClass: "text-red-500 ",
      bgColor: `${theme === "dark" ? "bg-blue-500" : "bg-blue-100"}`,
    },
    {
      id: 3,
      icon: (
        <FaTruck
          className={`${
            theme === "dark" ? "text-white" : "text-teal-500"
          }  text-xl`}
        />
      ),
      title: "Orders Processing",
      value: orderStats?.stats?.find(item => item._id === "Processing")?.totalOrders || 0,
      bgColor: `${theme === "dark" ? "bg-teal-500" : "bg-teal-100"}`,
    },
    {
      id: 4,
      icon: (
        <FaCheckCircle
          className={`${
            theme === "dark" ? "text-white" : "text-green-500"
          }  text-xl`}
        />
      ),
      title: "Orders Delivered",
      value: orderStats?.stats?.find(item => item._id === "Delivered")?.totalOrders || 0,
      bgColor: `${theme === "dark" ? "bg-green-500" : "bg-green-100"}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {orderData.map((item) => (
        <div
          key={item.id}
          className={`flex items-center p-4 ${
            theme === "dark" ? "bg-[#1F2937]" : "bg-white"
          }  shadow-md rounded-lg `}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${item.bgColor}`}
          >
            {item.icon}
          </div>
          <div className="ml-4">
            <h2 className="text-base-content text-sm">{item.title}</h2>
            <p className="text-lg font-bold text-base-content">
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
