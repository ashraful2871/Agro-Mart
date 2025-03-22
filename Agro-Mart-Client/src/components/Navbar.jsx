import React from "react";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Sidebar from "./nav-sidebar/Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useAuth();
  console.log(user);
  const isHomePage = location.pathname === "/";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : isHomePage ? "text-white" : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : isHomePage ? "text-white" : ""
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={isHomePage ? "text-white" : ""}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : isHomePage ? "text-white" : ""
          }
        >
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
            className="h-9 md:h-14"
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
        {/* Profile Dropdown */}
        {user ? (
          <>
            <div className="relative group hidden md:block">
              <div className="flex items-center gap-2 cursor-pointer">
                <div>
                  <div
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full bg-gray-300">
                      <img
                        referrerPolicy="no-referrer"
                        src={
                          user?.photoURL ||
                          "https://i.ibb.co.com/zWQYnrGM/user.png"
                        }
                        alt="User"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className={`${
                      !isHomePage ? "text-black" : "text-white"
                    } font-syne`}
                  >
                    {user?.displayName}
                  </span>
                </div>
              </div>

              {/* Dropdown */}
              <div className="absolute right-16 mt-2 w-48 bg-white shadow-md rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOutUser}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="block md:hidden">
              <Sidebar></Sidebar>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-gray-300">
                  <img
                    src="https://i.ibb.co.com/zWQYnrGM/user.png"
                    alt="User"
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                !isHomePage ? "text-black" : "text-white"
              } dropdown dropdown-end text-lg  font-syne`}
            >
              <span className="mr-2">
                <Link to="/login">Login</Link>
              </span>
              /{" "}
              <span>
                <Link to="/register">Register</Link>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
