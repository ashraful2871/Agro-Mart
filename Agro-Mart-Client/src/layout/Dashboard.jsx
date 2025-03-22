import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import { LuLogOut } from "react-icons/lu";

import { TiThMenu } from "react-icons/ti";
import AdminMenu from "../dashboard/admin-menu/AdminMenu";
import DashNav from "../pages/Dashboard/FarmersDashboard/DashNav";

const Dashboard = () => {
  return (
    <>
      <div className="lg:flex lg:h-screen overflow-hidden ">
        {/* Sidebar */}
        <div className={`lg:w-64  flex flex-col justify-between lg:h-full`}>
          <div className="hidden lg:block lg:h-full overflow-y-auto">
            <div className="mb-6 text-center p-4">
              <Link to="/" className="text-xl font-bold text-green-700">
                Agro Mart
              </Link>
            </div>

            <div>
              {/* Sidebar Menus */}
              {/* {role === "admin" && <AdminMenu />} */}
              <AdminMenu />
              {/* {role === "tutor" && <TutorMenu />}
              {role === "student" && <StudentMenu />} */}
            </div>
          </div>

          <div className="mt-auto hidden lg:block p-4">
            <ul className="menu">
              <li>
                <button
                  //onClick={signOutUser}
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
        <div className="flex-1 h-full overflow-y-auto  bg-base-100 bg-gray-100">
          <div className="border">
            <DashNav></DashNav>
          </div>
          <div className="px-28 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
// <div className="flex">
//   {/* Sidebar for large screens (left side) */}
//   <div className="lg:block hidden w-80 p-4 min-h-screen overflow-hidden">
//     <ul className="menu text-base-content min-h-full">
//       <>
//         <li>
//           <NavLink to="/dashboard/addProduct">Add Product</NavLink>
//         </li>
//         <li>
//           <NavLink to="/dashboard/manageProduct">Manage Product</NavLink>
//         </li>
//       </>

//       {/* Shared nav links */}
//       <div className="divider"></div>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/shop">Shop</NavLink>
//       </li>
//       <li>
//         <NavLink to="/about">About</NavLink>
//       </li>
//       <li>
//         <NavLink to="/contact">Contact</NavLink>
//       </li>
//     </ul>
//   </div>

//   {/* Drawer for small and medium screens */}
//   <div className="drawer drawer-mobile">
//     <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//     <div className="drawer-content">
//       {/* Button to open the drawer for small and medium screens */}
//       <label
//         htmlFor="my-drawer"
//         className="btn drawer-button lg:hidden fixed top-0 left-0 z-5"
//       >
//         Open Sidebar
//       </label>
//       <Navbar></Navbar>
//       {/* Main dashboard content */}
//       <div className="flex-1 p-8 bg-gray-100 min-h-screen">
//         <Outlet></Outlet>
//       </div>
//     </div>

//     {/* Sidebar content (this will be shown for mobile and tablet) */}
//     <div className="drawer-side">
//       <label
//         htmlFor="my-drawer"
//         aria-label="close sidebar"
//         className="drawer-overlay"
//       ></label>
//       <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//         <>
//           <li>
//             <NavLink to="/dashboard/addProduct">Add Product</NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/manageProduct">Manage Product</NavLink>
//           </li>
//         </>

//         {/* Shared nav links */}
//         <div className="divider"></div>
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/shop">Shop</NavLink>
//         </li>
//         <li>
//           <NavLink to="/about">About</NavLink>
//         </li>
//         <li>
//           <NavLink to="/contact">Contact</NavLink>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
