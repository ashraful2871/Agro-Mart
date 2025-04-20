import React, { useContext, useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { ThemeContext } from "../../../provider/ThemeProvider";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Settings = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [settings, setSettings] = useState({});

  const fetchUserByEmail = async (email) => {
    const response = await axiosSecure.get(`/user?email=${email}`);
    return response.data;
  };
  
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: () => fetchUserByEmail(user.email),
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (userData) {
      setSettings(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     await axiosSecure.put(`/users/${user?.email}`, settings);
  //     alert("Settings Updated Successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to update settings!");
  //   }
  // };
  
  const handleCouponChange = async (e) => {
    const { checked } = e.target;
    setSettings(prev => ({
      ...prev,
      couponEnabled: checked
    }));
  
    console.log("Sending couponEnabled value:", checked); 
  
    try {
      const res = await axiosSecure.patch('/users/update-coupon-enabled', { couponEnabled: checked });
      console.log("Response from server:", res.data);
  
      if (res.data.modifiedCount > 0) {
        alert("All users' couponEnabled updated successfully!");
      } else {
        alert("No users were updated.");
      }
    } catch (error) {
      console.error("Error updating couponEnabled:", error);
      alert("Failed to update couponEnabled for all users.");
    }
  };
  

  if (isLoading || !settings) return <div>Loading...</div>;

  return (
    <div className="p-6 min-h-screen text-base-content">
      <h1 className={`my-6 text-2xl font-bold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Settings</h1>

      <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold mt-auto mb-2 flex gap-2">
            <span className="my-auto"><IoSettingsSharp /></span> Settings
          </div>
          <button
            // onClick={handleSubmit}
            className="btn bg-green-600 text-white font-bold px-8 py-2 mt-6 rounded-full"
          >
            Update
          </button>
        </div>

        <div className="border-t-4 border-gray-700"></div>

        {/** Other Fields */}
        <div className="grid grid-cols-3 mt-7 mb-6">
          <label>Number of images per product</label>
          <input
            type="number"
            name="numberOfImages"
            value={settings.numberOfImages || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white col-span-2"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>Allow Auto Translation</label>
          <input
            type="checkbox"
            name="autoTranslation"
            checked={settings.autoTranslation || false}
            onChange={handleChange}
            className="toggle toggle-success"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>Translation Secret Key</label>
          <input
            type="password"
            name="translationKey"
            value={settings.translationKey || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white col-span-2"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>Language</label>
          <select
            name="language"
            value={settings.language || ""}
            onChange={handleChange}
            className="select select-bordered w-full bg-gray-700 text-white col-span-2"
          >
            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>Currency</label>
          <select
            name="currency"
            value={settings.currency || ""}
            onChange={handleChange}
            className="select select-bordered w-full bg-gray-700 text-white col-span-2"
          >
            <option value="Dollar">Dollar</option>
            <option value="Taka">Taka</option>
            <option value="Rupee">Rupee</option>
          </select>
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>Timezone</label>
          <input
            type="text"
            name="timeZone"
            value={settings.timeZone || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white col-span-2"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>Enable Coupon Feature</label>
          <input
            type="checkbox"
            name="couponEnabled"
            checked={settings.couponEnabled || false}
            onChange={handleCouponChange}
            className="toggle toggle-success"
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-10 mb-6">Company Info</h1>

      <div className="bg-gray-800 p-6 rounded-xl space-y-4">
        <div>
          <label>Shop Name</label>
          <input
            type="text"
            name="shopName"
            value={settings.shopName || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={settings.address || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={settings.contact || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={settings.email || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={settings.website || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
