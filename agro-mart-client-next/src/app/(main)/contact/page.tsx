"use client";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function ContactPage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-11/12 mx-auto py-20">
      <div className="text-center mb-12">
        <h5 className={`${theme === "dark" ? "text-green-600" : "text-green-700"} font-bold`}>{t("contactForm.title") || "Contact Us"}</h5>
        <h1 className="text-5xl font-bold font-syne mt-2">{t("contactForm.subTitle") || "Get In Touch"}</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-base-content">{t("contactForm.name")}</label>
            <input type="text" name="name" placeholder={t("contactForm.namePlaceholder")} required className="mt-1 block w-full px-4 py-3 border rounded-lg bg-base-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content">{t("contactForm.email")}</label>
            <input type="email" name="email" placeholder={t("contactForm.emailPlaceholder")} required className="mt-1 block w-full px-4 py-3 border rounded-lg bg-base-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content">{t("contactForm.message")}</label>
            <textarea rows={5} name="message" placeholder={t("contactForm.massagePlaceholder")} required className="mt-1 block w-full px-4 py-3 border rounded-lg bg-base-200"></textarea>
          </div>
          <button type="submit" disabled={loading} className="btn bg-green-600 text-white w-full text-lg">
            {loading ? <span className="loading loading-spinner"></span> : "Send Message →"}
          </button>
        </form>
      </div>
    </div>
  );
}
