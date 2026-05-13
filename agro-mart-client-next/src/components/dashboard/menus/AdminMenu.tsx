"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const AdminMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/overview", icon: <MdDashboardCustomize className="text-xl ml-2" />, label: t("dashboard.admin_menu.overview") },
    { href: "/dashboard/all-users", icon: <FaUsers className="text-xl ml-2" />, label: t("dashboard.admin_menu.customers") },
    { href: "/dashboard/all-orders", icon: <FaShoppingCart className="text-xl ml-2" />, label: t("dashboard.admin_menu.orders") },
    { href: "/dashboard/settings", icon: <IoSettingsSharp className="text-xl ml-2" />, label: t("dashboard.admin_menu.settings") },
  ];

  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {links.map((link) => (
          <li key={link.href} className="py-3">
            <Link href={link.href} className={pathname === link.href ? "text-green-600 border-l-4 border-green-600" : ""} style={{ backgroundColor: "transparent" }}>
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;
