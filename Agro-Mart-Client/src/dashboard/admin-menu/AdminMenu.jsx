import React from "react";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdAddBox, MdDashboardCustomize } from "react-icons/md";
import { RiSettings2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li className=" py-3">
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <MdDashboardCustomize className="text-xl ml-2" /> Overview
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaUsers className="text-xl ml-2" /> Customers
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink
            to="/dashboard/all-orders"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaShoppingCart className="text-xl ml-2" /> Orders
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink
            to="/dashboard/addProduct"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <MdAddBox className="text-xl ml-2" /> Add Product
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink
            to="/dashboard/manageProduct"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <RiSettings2Fill className="text-xl ml-2" /> Manage Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
