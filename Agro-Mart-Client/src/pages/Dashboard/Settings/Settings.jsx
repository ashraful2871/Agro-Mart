import React, { useContext, useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { ThemeContext } from "../../../provider/ThemeProvider";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/loading/Loading";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [settings, setSettings] = useState({});

  const fetchUserByEmail = async (email) => {
    const response = await axiosSecure.get(`/user?email=${email}`);
    return response.data;
  };

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
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
  //     alert(t("dashboard.settings.alerts.update_success"));
  //   } catch (error) {
  //     console.error(error);
  //     alert(t("dashboard.settings.alerts.update_error"));
  //   }
  // };

  const handleCouponChange = async (e) => {
    const { checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      couponEnabled: checked,
    }));

    console.log("Sending couponEnabled value:", checked);

    try {
      const res = await axiosSecure.patch("/users/update-coupon-enabled", {
        couponEnabled: checked,
      });
      console.log("Response from server:", res.data);

      if (res.data.modifiedCount > 0) {
        alert(t("dashboard.settings.alerts.coupon_success"));
      } else {
        alert(t("dashboard.settings.alerts.coupon_no_update"));
      }
    } catch (error) {
      console.error("Error updating couponEnabled:", error);
      alert(t("dashboard.settings.alerts.coupon_error"));
    }
  };

  if (isLoading || !settings)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="p-6 min-h-screen text-base-content">
      <h1
        className={`my-6 text-2xl font-bold ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {t("dashboard.settings.title")}
      </h1>

      <div
        className={`p-6 rounded-xl ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between mb-4">
          <div className="text-xl font-bold mt-auto mb-2 flex gap-2">
            <span className="my-auto">
              <IoSettingsSharp />
            </span>{" "}
            {t("dashboard.settings.title")}
          </div>
          <button
            // onClick={handleSubmit}
            className="btn bg-green-600 text-white font-bold px-8 py-2 mt-6 rounded-full"
          >
            {t("dashboard.settings.update_button")}
          </button>
        </div>

        <div className="border-t-4 border-gray-700"></div>

        {/** Other Fields */}
        <div className="grid grid-cols-3 mt-7 mb-6">
          <label>{t("dashboard.settings.fields.number_of_images")}</label>
          <input
            type="number"
            name="numberOfImages"
            value={settings.numberOfImages || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white col-span-2"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>{t("dashboard.settings.fields.auto_translation")}</label>
          <input
            type="checkbox"
            name="autoTranslation"
            checked={settings.autoTranslation || false}
            onChange={handleChange}
            className="toggle toggle-success"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>{t("dashboard.settings.fields.translation_key")}</label>
          <input
            type="password"
            name="translationKey"
            value={settings.translationKey || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white col-span-2"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>{t("dashboard.settings.fields.language")}</label>
          <select
            name="language"
            value={settings.language || ""}
            onChange={handleChange}
            className="select select-bordered w-full bg-gray-700 text-white col-span-2"
          >
            <option value="English">
              {t("dashboard.settings.language_options.English")}
            </option>
            <option value="Bangla">
              {t("dashboard.settings.language_options.Bangla")}
            </option>
            <option value="Hindi">
              {t("dashboard.settings.language_options.Hindi")}
            </option>
          </select>
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>{t("dashboard.settings.fields.currency")}</label>
          <select
            name="currency"
            value={settings.currency || ""}
            onChange={handleChange}
            className="select select-bordered w-full bg-gray-700 text-white col-span-2"
          >
            <option value="Dollar">
              {t("dashboard.settings.currency_options.Dollar")}
            </option>
            <option value="Taka">
              {t("dashboard.settings.currency_options.Taka")}
            </option>
            <option value="Rupee">
              {t("dashboard.settings.currency_options.Rupee")}
            </option>
          </select>
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>{t("dashboard.settings.fields.timezone")}</label>
          <input
            type="text"
            name="timeZone"
            value={settings.timeZone || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white col-span-2"
          />
        </div>

        <div className="grid grid-cols-3 mb-6">
          <label>{t("dashboard.settings.fields.coupon_enabled")}</label>
          <input
            type="checkbox"
            name="couponEnabled"
            checked={settings.couponEnabled || false}
            onChange={handleCouponChange}
            className="toggle toggle-success"
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-10 mb-6">
        {t("dashboard.settings.company_info.title")}
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl space-y-4">
        <div>
          <label>{t("dashboard.settings.company_info.shop_name")}</label>
          <input
            type="text"
            name="shopName"
            value={settings.shopName || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>{t("dashboard.settings.company_info.address")}</label>
          <input
            type="text"
            name="address"
            value={settings.address || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>{t("dashboard.settings.company_info.contact")}</label>
          <input
            type="text"
            name="contact"
            value={settings.contact || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>{t("dashboard.settings.company_info.email")}</label>
          <input
            type="email"
            name="email"
            value={settings.email || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-gray-700 text-white"
          />
        </div>

        <div>
          <label>{t("dashboard.settings.company_info.website")}</label>
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
