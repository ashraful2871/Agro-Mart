import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/sign-up";
  return (
    <>
      <div className="">
        <div className={`${isLoginPage || isSignUpPage ? "hidden" : ""}`}>
          <Navbar></Navbar>
        </div>
        <div className="min-h-[500px]  p-3 md:px-2 lg:px-0">
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
