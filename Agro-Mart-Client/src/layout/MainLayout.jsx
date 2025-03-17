import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto space-y-5 px-5">
        <Navbar></Navbar>
        <div className="min-h-[500px] container mx-auto p-3 md:px-2 lg:px-0">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
