import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li>
          <NavLink to="/dashboard/overview">Overview</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-users">Customers</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-materials">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/addProduct">Add Product</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manageProduct">Manage Product</NavLink>
        </li>
        {/* Shared nav links */}
       <div className="divider"></div>
       <li>
         <NavLink to="/">Home</NavLink>
       </li>
       <li>
         <NavLink to="/shop">Shop</NavLink>
       </li>
       <li>
         <NavLink to="/about">About</NavLink>
       </li>
       <li>
         <NavLink to="/contact">Contact</NavLink>
       </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
