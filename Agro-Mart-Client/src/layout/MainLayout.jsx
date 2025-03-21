import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/register";
  return (
    <>
      <div
        className={`${
          !isHomePage ? "max-w-7xl mx-auto md:space-y-5 md:p-5 xl:p-0" : ""
        }`}
      >
        <div className={`${isLoginPage || isSignUpPage ? "hidden" : ""}`}>
          <Navbar></Navbar>
        </div>
        <div className="min-h-[814px]  p-3 md:px-2 lg:px-0">
          <Outlet></Outlet>
        </div>
      </div>
      <div className={`${isLoginPage || isSignUpPage ? "hidden" : ""}`}>
        <Footer></Footer>
      </div>
    </>
  );
};

export default MainLayout;
