import React from "react";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const links = (
    <>
      {" "}
      <li>
        <NavLink to="/" className={isHomePage ? "text-white" : ""}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="" className={isHomePage ? "text-white" : ""}>
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink to="" className={isHomePage ? "text-white" : ""}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="" className={isHomePage ? "text-white" : ""}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={isHomePage ? "text-white" : ""}>
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const signOutUser = async () => {
    try {
      await dispatch(logOut()).unwrap();
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Logout failed!");
    }
  };

  return (
    <div
      className={`navbar px-4 lg:px-8 transition-all duration-300 z-50 ${
        isHomePage
          ? "bg-transparent absolute top-0 left-0 w-full"
          : "bg-base-100 shadow-md"
      }`}
    >
      {/* Left Section (Brand + Mobile Menu) */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <img
            className="h-14"
            src="https://i.ibb.co.com/0pKYrs73/agriMart.png"
            alt="AgroMart"
          />
          <span
            className={`text-2xl md:text-3xl font-bold font-syne ml-2 ${
              isHomePage ? "text-white" : ""
            }`}
          >
            AgroMart
          </span>
        </Link>
      </div>

      {/* Center Section (Navigation Links) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium font-syne">
          {links}
        </ul>
      </div>

      {/* Right Section (Cart & Profile) */}
      <div className="navbar-end flex gap-4">
        {/* Cart */}

        {/* Profile */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full bg-gray-300">
              <img src="https://i.ibb.co.com/zWQYnrGM/user.png" alt="User" />
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end text-lg text-white font-syne">
          <span className="mr-2">
            {" "}
            <Link to="/login">Login</Link>
          </span>
          /{" "}
          <span>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
