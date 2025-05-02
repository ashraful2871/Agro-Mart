import React, { useContext } from "react";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Sidebar from "./nav-sidebar/Sidebar";
import { ThemeContext } from "../provider/ThemeProvider";
import Theme from "./theme/Theme";
import { LuShoppingBag } from "react-icons/lu";
import useCart from "../hooks/useCart";
import useRole from "../hooks/useRole";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useWishlist from "../hooks/useWishlist";
import { FiHeart } from "react-icons/fi";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useAuth();
  const [role] = useRole();
  const [cart] = useCart();
  const [wishlist] = useWishlist();
  const isHomePage = location.pathname === "/";
  console.log("nav", user);

  let dashboardLink = "/dashboard";

  if (role === "admin") {
    dashboardLink = "/dashboard/overview";
  } else if (role === "farmer") {
    dashboardLink = "/dashboard";
  } else if (role === "customer") {
    dashboardLink = "/dashboard/wishlist";
  }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${theme === "dark" ? "text-green-600" : "text-green-700"}`
              : isHomePage
              ? "text-white"
              : ""
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
            isActive
              ? !isHomePage
                ? `${theme === "dark" ? "text-green-600" : "text-green-700"}`
                : ""
              : isHomePage
              ? `${theme === "dark" ? "text-white" : "text-black"}`
              : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? !isHomePage
                ? `${theme === "dark" ? "text-green-600" : "text-green-700"}`
                : ""
              : isHomePage
              ? `${theme === "dark" ? "text-white" : "text-black"}`
              : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? !isHomePage
                ? `${theme === "dark" ? "text-green-600" : "text-green-700"}`
                : ""
              : isHomePage
              ? `${theme === "dark" ? "text-white" : "text-black"}`
              : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            isActive
              ? !isHomePage
                ? `${theme === "dark" ? "text-green-600" : "text-green-700"}`
                : ""
              : isHomePage
              ? `${theme === "dark" ? "text-white" : "text-black"}`
              : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          Reviews
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/dashboard" className={isHomePage ? "text-white" : ""}>
          Dashboard
        </NavLink>
      </li> */}
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
      className={`navbar fixed ${
        theme === "dark" ? "bg-[#111827]" : "bg-gray-300"
      } px-4 lg:px-8 transition-all duration-300 z-50 ${
        isHomePage ? " top-0 left-0 w-full" : " shadow-md"
      }`}
    >
      {/* Left Section */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <img
            className="h-9 md:h-9"
            src="https://i.ibb.co.com/0pKYrs73/agriMart.png"
            alt="AgroMart"
          />
          <span
            className={`text-2xl md:text-2xl font-bold font-syne ml-2 ${
              isHomePage
                ? `${theme === "dark" ? "text-white" : "text-black"}`
                : ""
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
        <div className="flex items-center gap-5">
          <div className="relative mt-2 ">
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700"
                    : isHomePage
                    ? `${theme === "dark" ? "text-white" : "text-black"}`
                    : ""
                }
                style={{ color: "", backgroundColor: "transparent" }}
                to="/shopping-cart"
              >
                <AiOutlineShoppingCart className="text-3xl"></AiOutlineShoppingCart>
              </NavLink>
            </div>

            <div className=" badge p-1 badge-sm indicator-item bg-yellow-300 absolute bottom-5 left-4  text-xs font-bold text-black">
              {cart.length}
            </div>
          </div>
          <div className="relative mt-2 ">
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700"
                    : isHomePage
                    ? `${theme === "dark" ? "text-white" : "text-black"}`
                    : ""
                }
                style={{ color: "", backgroundColor: "transparent" }}
                to="/dashboard/wishlist"
              >
                <FiHeart className="text-3xl" />
              </NavLink>
            </div>

            <div className=" badge p-1 badge-sm indicator-item bg-yellow-300 absolute bottom-5 left-4  text-xs font-bold text-black">
              {wishlist.length}
            </div>
          </div>

          {/* toggle theme */}
          <div>
            <Theme></Theme>
          </div>
          <div>
            <LanguageSwitcher></LanguageSwitcher>
          </div>
        </div>
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
                    <div className="w-10 rounded-full border-2 border-green-600 bg-gray-300">
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
                    className={`text-base-content ${
                      theme === "dark" ? "text-white" : "text-black"
                    } font-syne`}
                  >
                    {user?.displayName}
                  </span>
                </div>
              </div>

              {/* Dropdown */}
              <div
                className={`absolute right-6 mt-4 w-48 ${
                  theme === "dark" ? "bg-[#1F2937]" : "bg-base-100"
                }  shadow-md rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}
              >
                <Link
                  to={dashboardLink}
                  className={`block px-4 py-2 text-base-content ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/all-orders"
                  className={`block px-4 py-2 text-base-content ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  } `}
                >
                  WishList
                </Link>

                <button
                  onClick={signOutUser}
                  className={`block w-full text-left px-4 py-2 text-red-600 ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
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
              <Link to="/login">
                {" "}
                <button className="btn bg-green-600 text-white text-base rounded-lg">
                  Login
                </button>
              </Link>
              {/* <div
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
              </div> */}
            </div>
            <div
              className={`text-base-content dropdown dropdown-end text-lg  font-syne`}
            >
              {/* <span className="mr-2">
                <Link to="/login">Login</Link>
              </span>
              /{" "}
              <span>
                <Link to="/register">Register</Link>
              </span> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
