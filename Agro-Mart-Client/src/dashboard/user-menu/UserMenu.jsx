import React from "react";
import { FaHeart, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li className=" py-3">
          <NavLink
            to="/dashboard/wishlist"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaHeart className="text-xl ml-2" /> WishList
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
      </ul>
    </div>
  );
};

export default UserMenu;
