import React from "react";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminMenu = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        <li className="py-3">
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              isActive ? "text-green-600 border-l-4 border-green-600" : ""
            }
            style={{ color: "", backgroundColor: "transparent" }}
          >
            <MdDashboardCustomize className="text-xl ml-2" />{" "}
            {t("dashboard.admin_menu.overview")}
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
            <FaUsers className="text-xl ml-2" />{" "}
            {t("dashboard.admin_menu.customers")}
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
            <FaShoppingCart className="text-xl ml-2" />{" "}
            {t("dashboard.admin_menu.orders")}
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
            <IoSettingsSharp className="text-xl ml-2" />{" "}
            {t("dashboard.admin_menu.settings")}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
