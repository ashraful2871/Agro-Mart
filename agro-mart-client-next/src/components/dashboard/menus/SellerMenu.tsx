"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { RiSettings2Fill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useTranslation } from "react-i18next";

const SellerMenu = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/user-profile", icon: <FaUser className="text-xl ml-2" />, label: t("dashboard.seller.my_profile") },
    { href: "/dashboard/addProduct", icon: <MdAddBox className="text-xl ml-2" />, label: t("dashboard.seller.add_product") },
    { href: "/dashboard/manageProduct", icon: <RiSettings2Fill className="text-xl ml-2" />, label: t("dashboard.seller.manage_product") },
    { href: "/dashboard/all-orders", icon: <FaShoppingCart className="text-xl ml-2" />, label: t("dashboard.seller.customer_orders") },
    { href: "/dashboard/crop-doctor", icon: <FaUserDoctor className="text-xl ml-2" />, label: t("dashboard.seller.doctor") },
    { href: "/dashboard/weather", icon: <TiWeatherPartlySunny className="text-xl ml-2" />, label: t("dashboard.seller.weather") },
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

export default SellerMenu;
