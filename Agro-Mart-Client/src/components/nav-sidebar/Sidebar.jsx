import React, { useContext } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose, IoChevronForward } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeProvider";

const Sidebar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { theme } = useContext(ThemeContext);
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? theme === "dark"
                ? "text-green-500 bg-none"
                : "text-green-700 bg-none"
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
              ? theme === "dark"
                ? "text-green-500 bg-none"
                : "text-green-700 bg-none"
              : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to=""
          className={""}
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
              ? theme === "dark"
                ? "text-green-500 bg-none"
                : "text-green-700 bg-none"
              : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/overview"
          className={({ isActive }) =>
            isActive
              ? theme === "dark"
                ? "text-green-500 bg-none"
                : "text-green-700 bg-none"
              : ""
          }
          style={{ color: "", backgroundColor: "transparent" }}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className={`${
            theme === "dark" ? "text-base-content" : "text-base-content"
          }  text-2xl cursor-pointer`}
        >
          <RiMenu2Fill />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="bg-base-100 w-80 min-h-full shadow-md">
          <div className="flex justify-between items-center py-4 pl-6 pr-4 border-b bg-[#051815] ">
            <h2 className="text-sm font-bold text-white font-syne">
              MAIN MENU
            </h2>
            <label
              htmlFor="my-drawer"
              className="cursor-pointer text-base-content"
            >
              <IoClose size={24} />
            </label>
          </div>
          <ul className="menu text-base-content font-normal font-rethink-sans space-y-3 pl-3">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
