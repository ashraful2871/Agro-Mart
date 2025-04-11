import React from "react";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import AdminMenu from "../../../dashboard/admin-menu/AdminMenu";

const Drawer = () => {
  return (
    <div className="drawer z-50 block lg:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Responsive Drawer Toggle */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary bg-green-700 hover:bg-green-700 font-semibold text-white text-lg m-2 border border-none"
        >
          <TiThMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content h-full w-72 p-4">
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="text-xl font-bold text-base-content flex items-center gap-2"
            >
              <img
                className="h-9 md:h-9"
                src="https://i.ibb.co.com/0pKYrs73/agriMart.png"
                alt="AgroMart"
              />
              Agro MArt
            </Link>
          </div>

          <AdminMenu />
          {/* {role === "admin" && <AdminMenu />}
            {role === "tutor" && <TutorMenu />}
            {role === "student" && <StudentMenu />} */}
        </ul>
        <div className="mt-auto">
          <ul className="menu">
            <li>
              <button
                //onClick={signOutUser}
                className="flex items-center p-2 text-base font-bold text-white"
              >
                Logout
                <LuLogOut />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
