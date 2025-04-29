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
  const isResetPasswordPage = location.pathname === "/password/reset";
  const isStripePaymentPage = location.pathname === "/payment/stripe";
  return (
    <div className={`${theme === "dark" ? "" : "bg-gray-100"}`}>
      <div
        className={`${!isHomePage ? "h-16" : ""} ${
          isLoginPage || isSignUpPage || isResetPasswordPage ? "hidden" : ""
        }`}
      >
        <Navbar></Navbar>
      </div>
      <div
        className={`${
          !isHomePage &&
          !isShopPage &&
          !isLoginPage &&
          !isSignUpPage &&
          !isResetPasswordPage &&
          !isStripePaymentPage
            ? "max-w-7xl mx-auto md:space-y-5 md:p-5 xl:p-0"
            : ""
        }`}
      >
        <div
          className={`min-h-[814px]   md:px-2 lg:px-0 ${
            !isHomePage &&
            !isLoginPage &&
            !isSignUpPage &&
            !isResetPasswordPage &&
            !isStripePaymentPage
              ? "mt-3"
              : ""
          }`}
        >
          <Outlet></Outlet>
        </div>
        <div>
          <LabelBottomNavigation></LabelBottomNavigation>
        </div>
      </div>
      <div
        className={`${
          isLoginPage || isSignUpPage || isResetPasswordPage ? "hidden" : ""
        }`}
      >
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
