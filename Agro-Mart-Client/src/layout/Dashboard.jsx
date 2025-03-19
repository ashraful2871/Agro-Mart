import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
          {/* Sidebar for large screens (left side) */}
          <div className="lg:block hidden w-80 bg-[#c3e858] p-4">
                <ul className="menu text-base-content min-h-full">
                <>
                    <li>
                        <NavLink to="/dashboard/addProduct">
                            Add Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageProduct">
                            Manage Product
                        </NavLink>
                    </li>
                </>

                    {/* Shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop">
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            Contact
                        </NavLink>
                    </li>
                </ul>
          </div>

            {/* Drawer for small and medium screens */}
            <div className="drawer drawer-mobile">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Button to open the drawer for small and medium screens */}
                    <label htmlFor="my-drawer" className="btn bg-[#c3e858] drawer-button lg:hidden fixed top-0 left-0 z-5">
                        Open Sidebar
                    </label>

                    {/* Main dashboard content */}
                    <div className="flex-1 p-8">
                        <Outlet></Outlet>
                    </div>
                </div>

                {/* Sidebar content (this will be shown for mobile and tablet) */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        
                            <>
                                <li>
                                    <NavLink to="/dashboard/addProduct">
                                        Add Product
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageProduct">
                                        Manage Product
                                    </NavLink>
                                </li>
                            </>

                        {/* Shared nav links */}
                        <div className="divider"></div>
                        <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop">
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            Contact
                        </NavLink>
                    </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;