import React from "react";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdAddBox, MdDashboardCustomize } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { RiSettings2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";

const AdminMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li className=" py-3">
          <NavLink
            to="/dashboard/crop-doctor"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaUserDoctor className="text-xl ml-2"/> Crop Doctor
          </NavLink>
        </li>
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
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <IoSettingsSharp className="text-xl ml-2" /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
