import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import AdminMenu from "../dashboard/admin-menu/AdminMenu";
import DashNav from "../pages/Dashboard/FarmersDashboard/DashNav";
import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import useRole from "../hooks/useRole";
import SellerMenu from "../dashboard/saler-menue/SellerMenu";
import { logOut } from "../store/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [role] = useRole();
  const dispatch = useDispatch();
  console.log(role);
  const signOutUser = async () => {
    try {
      await dispatch(logOut()).unwrap();
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Logout failed!");
    }
  };

  return (
    <>
      <div className="lg:flex lg:h-screen overflow-hidden ">
        {/* Sidebar */}
        <div className={`lg:w-64  flex flex-col justify-between lg:h-full`}>
          <div className="hidden lg:block lg:h-full overflow-y-auto">
            <div className="mb-6 text-center p-4">
              <Link
                to="/"
                className="text-xl font-bold text-base-content flex items-center gap-2"
              >
                <img
                  className="h-9 md:h-9"
                  src="https://i.ibb.co.com/0pKYrs73/agriMart.png"
                  alt="AgroMart"
                />
                Agro Mart
              </Link>
            </div>

            <div>
              {/* Sidebar Menus */}
              {role === "admin" && <AdminMenu />}
              {role === "seller" && <SellerMenu />}
              {/* {role === "tutor" && <TutorMenu />}
              {role === "student" && <StudentMenu />} */}
            </div>
          </div>

          <div className="mt-auto hidden lg:block p-4">
            <ul className="menu">
              <li>
                <button
                  onClick={signOutUser}
                  className="flex items-center p-2 text-base font-bold"
                >
                  Logout
                  <LuLogOut />
                </button>
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
          <div className="">
            <DashNav></DashNav>
          </div>
          <div className="p-2 md:p-3 lg:5 xl:px-8 mx-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
