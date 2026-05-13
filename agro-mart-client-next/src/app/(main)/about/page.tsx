"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div className="w-11/12 mx-auto py-20">
      <div className="text-center mb-12">
        <h5 className={`${theme === "dark" ? "text-green-600" : "text-green-700"} font-bold`}>About Us</h5>
        <h1 className="text-5xl font-bold font-syne mt-2">Our Story</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2">
          <img src="https://i.ibb.co.com/CgRwKPZ/farmer-2.jpg" alt="About AgroMart" className="rounded-xl shadow-lg w-full" />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <p className="text-base-content text-lg">
            AgroMart is a platform that enables farmers to sell agricultural products, manage inventory, and process orders while providing consumers with fresh farm produce at fair prices.
          </p>
          <p className="text-base-content">
            We connect local farmers directly with consumers, eliminating middlemen and ensuring that both parties benefit from fair pricing and fresh produce.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="text-center p-4 bg-base-200 rounded-xl">
              <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-green-600" : "text-green-700"}`}>500+</h3>
              <p className="text-base-content">Happy Farmers</p>
            </div>
            <div className="text-center p-4 bg-base-200 rounded-xl">
              <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-green-600" : "text-green-700"}`}>10K+</h3>
              <p className="text-base-content">Satisfied Customers</p>
            </div>
            <div className="text-center p-4 bg-base-200 rounded-xl">
              <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-green-600" : "text-green-700"}`}>5K+</h3>
              <p className="text-base-content">Products Delivered</p>
            </div>
            <div className="text-center p-4 bg-base-200 rounded-xl">
              <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-green-600" : "text-green-700"}`}>4.8</h3>
              <p className="text-base-content">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
