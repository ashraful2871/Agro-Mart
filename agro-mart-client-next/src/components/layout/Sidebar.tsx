"use client";
import React, { useContext } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/providers/ThemeProvider";

const Sidebar = () => {
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard/overview", label: "Dashboard" },
  ];

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    if (isActive) return theme === "dark" ? "text-green-500 bg-none" : "text-green-700 bg-none";
    return "";
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className={`${theme === "dark" ? "text-base-content" : "text-base-content"} text-2xl cursor-pointer`}
        >
          <RiMenu2Fill />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="bg-base-100 w-80 min-h-full shadow-md">
          <div className="flex justify-between items-center py-4 pl-6 pr-4 border-b bg-[#051815]">
            <h2 className="text-sm font-bold text-white font-syne">MAIN MENU</h2>
            <label htmlFor="my-drawer" className="cursor-pointer text-base-content">
              <IoClose size={24} />
            </label>
          </div>
          <ul className="menu text-base-content font-normal font-rethink-sans space-y-3 pl-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={getLinkClass(link.href)} style={{ backgroundColor: "transparent" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
