"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ReviewPosting = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const date = new Date();
    const reviews = { name, email, message, date };
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews }),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success("Successfully Submit Review");
        (e.target as HTMLFormElement).reset();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="text-center">
          <h5 className={`${theme === "dark" ? "text-green-600" : "text-green-700"}`}>{t("review.title")}</h5>
          <h3 className="text-5xl font-bold font-syne max-w-3xl py-4">{t("review.subTitle")}</h3>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 mb-20">
        <div className="relative w-[1100px] h-[600px] px-10 py-20 rounded-tr-[200px] rounded-bl-[200px] md:px-60 md:py-20 md:rounded-tr-full md:rounded-bl-full border-t-4 border-b-4 border-[#0b4401] overflow-hidden">
          <div className="absolute object-cover inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://i.ibb.co.com/svpfgKCW/istockphoto.jpg')", transform: "rotate(180deg) scale(1.1)", transformOrigin: "center" }}></div>
          <div className="absolute inset-0 bg-black opacity-45 z-10"></div>
          <div className="card w-full max-w-sm shrink-0 shadow-2xl z-10 relative flex left-32">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white">{t("contactForm.name")}</label>
                <input type="text" name="name" placeholder={t("contactForm.namePlaceholder")} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 text-black" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white">{t("contactForm.email")}</label>
                <input type="email" name="email" placeholder={t("contactForm.emailPlaceholder")} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 text-black" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white">{t("contactForm.message")}</label>
                <textarea rows={4} name="message" placeholder={t("contactForm.massagePlaceholder")} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 text-black"></textarea>
              </div>
              {loading ? (
                <button className="bg-green-600 text-white text-base font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 col-span-2">
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button type="submit" className="bg-green-600 text-white text-base font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 col-span-2">
                  {t("reviewForm.submit")} →
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPosting;
