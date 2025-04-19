import { Link, NavLink, Outlet } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import { useContext } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";


const Settings = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="lg:flex lg:h-screen overflow-hidden ">
        {/* Sidebar */}
        <div className={`lg:w-80  flex flex-col justify-between lg:h-full`}>
          <div className="hidden lg:block lg:h-full overflow-y-auto">
            <div className="mb-6 text-center p-4">
              <Link
                to="/dashboard/overview"
                className="text-xl font-bold text-base-content flex items-center gap-2"
              >
                <img
                  className="h-9 md:h-9"
                  src="https://i.ibb.co.com/0pKYrs73/agriMart.png"
                  alt="AgroMart"
                />
                <FaArrowLeft /> Settings
              </Link>
            </div>

            <div>
              {/* Sidebar Menus */}
              <SettingsMenu></SettingsMenu>
            </div>
          </div>

          <div className="mt-auto hidden lg:block p-4">
            <ul className="menu">
            <li className="py-3">
                  <NavLink
                    to="/logout"
                    className={({ isActive }) =>
                      isActive ? "text-red-600 border-l-4 border-red-600" : "text-red-500"
                    }
                  >
                    <FaSignOutAlt className="text-xl ml-2" /> Logout
                  </NavLink>
                </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 h-full overflow-y-auto ${
            theme === "dark" ? "bg-[#111827]" : "bg-gray-100"
          }  `}
        >
          <div className="p-2 md:p-3 lg:5 xl:px-8 mx-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Settings;