"use client";
import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/authSlice";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import Sidebar from "./Sidebar";
import { ThemeContext } from "@/providers/ThemeProvider";
import Theme from "@/components/ui/Theme";
import useCart from "@/hooks/useCart";
import useRole from "@/hooks/useRole";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import useWishlist from "@/hooks/useWishlist";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { AppDispatch } from "@/store/store";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const user = useAuth();
  const [role] = useRole();
  const [cart] = useCart();
  const [wishlist] = useWishlist();
  const isHomePage = pathname === "/";

  let dashboardLink = "/dashboard";
  if (role === "admin") dashboardLink = "/dashboard/overview";
  else if (role === "farmer") dashboardLink = "/dashboard";
  else if (role === "customer") dashboardLink = "/dashboard/wishlist";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/reviews", label: "Reviews" },
  ];

  const signOutUser = async () => {
    try {
      await dispatch(logOut()).unwrap();
      toast.success("Successfully logged out");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Logout failed!");
    }
  };

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    if (isActive) {
      return theme === "dark" ? "text-green-600" : "text-green-700";
    }
    if (isHomePage) {
      return theme === "dark" ? "text-white" : "text-black";
    }
    return "";
  };

  return (
    <div
      className={`navbar fixed ${
        theme === "dark" ? "bg-[#111827]" : "bg-gray-300"
      } px-4 lg:px-8 transition-all duration-300 z-50 ${isHomePage ? " top-0 left-0 w-full" : " shadow-md"}`}
    >
      {/* Left Section */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <img className="h-9 md:h-9" src="https://i.ibb.co.com/0pKYrs73/agriMart.png" alt="AgroMart" />
          <span
            className={`text-2xl md:text-2xl font-bold font-syne ml-2 ${
              isHomePage ? `${theme === "dark" ? "text-white" : "text-black"}` : ""
            }`}
          >
            AgroMart
          </span>
        </Link>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium font-syne">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={getLinkClass(link.href)}
                style={{ backgroundColor: "transparent" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex gap-4">
        <div className="flex items-center gap-5">
          <div className="relative mt-2">
            <Link
              href="/shopping-cart"
              className={pathname === "/shopping-cart" ? "text-green-700" : isHomePage ? `${theme === "dark" ? "text-white" : "text-black"}` : ""}
              style={{ backgroundColor: "transparent" }}
            >
              <AiOutlineShoppingCart className="text-3xl" />
            </Link>
            <div className="badge p-1 badge-sm indicator-item bg-yellow-300 absolute bottom-5 left-4 text-xs font-bold text-black">
              {cart.length}
            </div>
          </div>
          <div className="relative mt-2">
            <Link
              href="/dashboard/wishlist"
              className={pathname === "/dashboard/wishlist" ? "text-green-700" : isHomePage ? `${theme === "dark" ? "text-white" : "text-black"}` : ""}
              style={{ backgroundColor: "transparent" }}
            >
              <FiHeart className="text-3xl" />
            </Link>
            <div className="badge p-1 badge-sm indicator-item bg-yellow-300 absolute bottom-5 left-4 text-xs font-bold text-black">
              {wishlist.length}
            </div>
          </div>
          <div><Theme /></div>
          <div><LanguageSwitcher /></div>
        </div>

        {/* Profile Dropdown */}
        {user ? (
          <>
            <div className="relative group hidden md:block">
              <div className="flex items-center gap-2 cursor-pointer">
                <div>
                  <div role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full border-2 border-green-600 bg-gray-300">
                      <img
                        referrerPolicy="no-referrer"
                        src={user?.photoURL || "https://i.ibb.co.com/zWQYnrGM/user.png"}
                        alt="User"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`text-base-content ${theme === "dark" ? "text-white" : "text-black"} font-syne`}>
                    {user?.displayName}
                  </span>
                </div>
              </div>

              <div
                className={`absolute right-6 mt-4 w-48 ${
                  theme === "dark" ? "bg-[#1F2937]" : "bg-base-100"
                } shadow-md rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}
              >
                <Link
                  href={dashboardLink}
                  className={`block px-4 py-2 text-base-content ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/all-orders"
                  className={`block px-4 py-2 text-base-content ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                >
                  WishList
                </Link>
                <button
                  onClick={signOutUser}
                  className={`block w-full text-left px-4 py-2 text-red-600 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="block md:hidden">
              <Sidebar />
            </div>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <Link href="/login">
              <button className="btn bg-green-600 text-white text-base rounded-lg">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
