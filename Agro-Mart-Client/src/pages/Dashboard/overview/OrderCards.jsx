import React, { useContext } from "react";
import {
  FaShoppingCart,
  FaSyncAlt,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { MdOutlineShoppingCart } from "react-icons/md";

const OrderCards = () => {
  const { theme } = useContext(ThemeContext);
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
      value: "864",
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
      value: "270",
      extra: "(204669.96)",
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
      value: "120",
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
      value: "373",
      bgColor: `${theme === "dark" ? "bg-green-500" : "bg-green-100"}`,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-4">
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
