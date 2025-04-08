import React, { useContext, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";

const orders = [
  {
    id: 11868,
    time: "22 Mar, 2025 5:21 PM",
    customer: "Omprakash Ranjan",
    method: "Cash",
    amount: "$1996.16",
    status: "Pending",
  },
  {
    id: 11820,
    time: "22 Mar, 2025 12:18 PM",
    customer: "ss ss",
    method: "Cash",
    amount: "$81.21",
    status: "Delivered",
  },
  {
    id: 11864,
    time: "22 Mar, 2025 10:59 AM",
    customer: "Native Ecommerce",
    method: "Cash",
    amount: "$188.81",
    status: "Delivered",
  },
  {
    id: 11867,
    time: "22 Mar, 2025 9:54 AM",
    customer: "4324",
    method: "Cash",
    amount: "$491.29",
    status: "Delivered",
  },
  {
    id: 11865,
    time: "22 Mar, 2025 12:19 AM",
    customer: "Tanvir Hossain",
    method: "Cash",
    amount: "$333.26",
    status: "Pending",
  },
  {
    id: 11866,
    time: "22 Mar, 2025 12:19 AM",
    customer: "4324",
    method: "Cash",
    amount: "$90.00",
    status: "Processing",
  },
  {
    id: 11846,
    time: "21 Mar, 2025 2:43 PM",
    customer: "Junaid Raza",
    method: "Cash",
    amount: "$230.06",
    status: "Pending",
  },
  {
    id: 11856,
    time: "21 Mar, 2025 1:22 PM",
    customer: "john doe",
    method: "Cash",
    amount: "$510.00",
    status: "Delivered",
  },
];

const statusColors = {
  Pending: "badge-warning",
  Delivered: "badge-success",
  Processing: "badge-info",
};

const OrderTable = () => {
  const [orderData, setOrderData] = useState(orders);
  const { theme } = useContext(ThemeContext);
  const handleStatusChange = (id, newStatus) => {
    setOrderData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div
      className={`overflow-x-auto ${
        theme === "dark" ? "bg-[#1F2937]" : "bg-base-100"
      } p-6 rounded-lg shadow-md`}
    >
      <table className="table w-full">
        <thead>
          <tr
            className={`${
              theme === "dark" ? "bg-base-100" : "bg-gray-100"
            }  text-base-content`}
          >
            <th>INVOICE NO</th>
            <th>ORDER TIME</th>
            <th>CUSTOMER NAME</th>
            <th>METHOD</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTION</th>
            <th>INVOICE</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.id}>
              <td className="font-semibold">{order.id}</td>
              <td>{order.time}</td>
              <td>{order.customer}</td>
              <td className="font-semibold">{order.method}</td>
              <td className="font-semibold">{order.amount}</td>
              <td>
                <span className={`badge ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <select
                  className="select select-bordered select-sm"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Processing</option>
                </select>
              </td>
              <td>
                <button className="btn btn-ghost btn-sm">
                  <FaPrint size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-base-content">SHOWING 1-8 OF 861</p>
        <div className="join">
          <button className="join-item btn btn-sm">{"<"}</button>
          <button className="join-item btn btn-sm btn-success">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">...</button>
          <button className="join-item btn btn-sm">108</button>
          <button className="join-item btn btn-sm">{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
