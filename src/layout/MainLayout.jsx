import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-5 px-5">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
