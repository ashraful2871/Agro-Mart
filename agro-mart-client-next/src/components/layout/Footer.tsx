"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-6 bg-image">
      <div className="bg-black/45 text-white">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between gap-10">
          {/* newsletter */}
          <div className="bg-green-700 p-7 text-white rounded-b-xl">
            <h3 className="text-4xl font-bold">Sign up to our Newslatters</h3>
            <p className="my-2">Sign up to our newslatter &amp; event right now to be updated</p>
            <input type="email" placeholder="Enter your email address" className="p-4 w-full rounded-xl bg-purple-100" />
            <br />
            <button className="p-4 my-2 w-full rounded-xl bg-yellow-300 text-black font-bold">Subscribe</button>
          </div>

          <div>
            <div className="mb-2 flex flex-col md:flex-row justify-between">
              <div className="flex flex-col justify-center">
                <h3>
                  <span className="text-4xl font-bold text-green-700 font-syne">Agro</span>
                  <span className="text-4xl font-bold text-yellow-400 font-syne">Mart</span>
                </h3>
                <p className="max-w-96">
                  It&apos;s a platform enables farmers to sell agricultural products, manage inventory, and process orders while providing consumers with fresh farm produce at fair prices.
                </p>
              </div>
              <div>
                <img src="https://i.ibb.co.com/ZvhdCD1/footer-avatar.png" alt="" className="w-64" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4">Contact Us</h3>
                <p className="mb-2">📍 abc, Dhaka, Bangladesh</p>
                <p className="mb-2">📞 01712345678</p>
                <p>📧 agroMartSupport@gmail.com</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4">Our Services</h3>
                <ul className="list-disc">
                  <li>Farm-to-consumer sales.</li>
                  <li>Simple product and order management.</li>
                  <li>Secure payments and delivery.</li>
                  <li>Support with live chat and languages.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4">AgroMart</h3>
                <p>
                  We carry out our mission based on the values of impeccable business reputation, social responsibility, respect for human dignity and synergetic and result-oriented partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="text-center px-5 pb-5">
          <p>&copy; Copyright 2025 Agro. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
