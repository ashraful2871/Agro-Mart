"use client";
import React from "react";
import Theme from "@/components/ui/Theme";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "@/store/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { IoSettingsSharp } from "react-icons/io5";
import { AppDispatch } from "@/store/store";
import Sidebar from "@/components/layout/Sidebar";

const DashNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signOutUser = async () => {
    try {
      await dispatch(logOut()).unwrap();
      toast.success("Successfully logged out");
    } catch (error: any) {
      toast.error(error.message || "Logout failed!");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <Sidebar />
      </div>
      <Theme />
      <div className="flex-none space-x-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <button onClick={signOutUser} className="flex items-center text-base font-bold">
                <LuLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
