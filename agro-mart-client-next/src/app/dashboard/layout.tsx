"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "@/providers/ThemeProvider";
import DashNav from "@/components/dashboard/DashNav";
import AdminMenu from "@/components/dashboard/menus/AdminMenu";
import SellerMenu from "@/components/dashboard/menus/SellerMenu";
import UserMenu from "@/components/dashboard/menus/UserMenu";
import useRole from "@/hooks/useRole";
import PrivateRoute from "@/guards/PrivateRoute";
import { useTranslation } from "react-i18next";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role] = useRole();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <PrivateRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`hidden lg:block w-64 min-h-screen ${theme === "dark" ? "bg-[#1F2937]" : "bg-gray-100"} border-r`}>
          <div className="p-6 text-center">
            <Link href="/" className="flex items-center justify-center gap-2">
              <img className="h-9" src="https://i.ibb.co.com/0pKYrs73/agriMart.png" alt="AgroMart" />
              <span className="text-2xl font-bold font-syne">
                <span className="text-green-700">Agro</span>
                <span className="text-yellow-400">Mart</span>
              </span>
            </Link>
          </div>
          <div className="px-4">
            {role === "admin" && <AdminMenu />}
            {role === "farmer" && <SellerMenu />}
            {role === "customer" && <UserMenu />}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <DashNav />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </PrivateRoute>
  );
}
