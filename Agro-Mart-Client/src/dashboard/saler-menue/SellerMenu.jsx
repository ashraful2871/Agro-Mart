import React from "react";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import { MdAddBox, MdDashboardCustomize } from "react-icons/md";
import { RiSettings2Fill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { NavLink } from "react-router-dom";

const SellerMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li className="py-3">
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

        <li className="py-3">
          <NavLink
            to="/dashboard/all-orders"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaShoppingCart className="text-xl ml-2" /> Customer Orders
          </NavLink>
        </li>

        <li className=" py-3">
          <NavLink
            to="/dashboard/crop-doctor"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <FaUserDoctor className="text-xl ml-2" /> Crop Doctor
          </NavLink>
        </li>
        
        <li className="py-3">
          <NavLink
            to="/dashboard/weather"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <TiWeatherPartlySunny className="text-xl ml-2" /> Weather
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SellerMenu;
