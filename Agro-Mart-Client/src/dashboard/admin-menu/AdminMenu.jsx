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
      </ul>
    </div>
  );
};

export default AdminMenu;
