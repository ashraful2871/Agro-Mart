import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LabelBottomNavigation from "../components/mobile-bar/MobileBar";
import { ThemeContext } from "../provider/ThemeProvider";

const MainLayout = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";
  const isShopPage = location.pathname === "/shop";
  const isSignUpPage = location.pathname === "/register";
  return (
    <div className={`${theme === "dark" ? "" : "bg-gray-100"}`}>
      <div className={`${isLoginPage || isSignUpPage ? "hidden" : ""}`}>
        <Navbar></Navbar>
      </div>
      <div
        className={`${
          !isHomePage && !isShopPage
            ? "max-w-7xl mx-auto md:space-y-5 md:p-5 xl:p-0"
            : ""
        }`}
      >
        <div
          className={`min-h-[814px]  md:px-2 lg:px-0 ${
            !isHomePage ? "pt-10" : ""
          }`}
        >
          <Outlet></Outlet>
        </div>
        <div>
          <LabelBottomNavigation></LabelBottomNavigation>
        </div>
      </div>
      <div className={`${isLoginPage || isSignUpPage ? "hidden" : ""}`}>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
