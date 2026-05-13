"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const UserMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/my-orders", icon: <FaShoppingCart className="text-xl ml-2" />, label: t("dashboard.user_menu.my_orders") },
    { href: "/dashboard/wishlist", icon: <FaHeart className="text-xl ml-2" />, label: t("dashboard.user_menu.wishlist") },
    { href: "/dashboard/user-profile", icon: <FaUser className="text-xl ml-2" />, label: t("dashboard.user_menu.my_profile") },
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

export default UserMenu;
