import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li className=" py-3">
          <NavLink
            to="/dashboard/user-profile"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaUser className="text-xl ml-2" /> My Profile
          </NavLink>
        </li>

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
        
        <li className="py-3">
          <NavLink
            to="/dashboard/my-orders"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaShoppingCart className="text-xl ml-2" /> My Orders
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default UserMenu;
