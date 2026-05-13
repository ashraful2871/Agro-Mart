"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <select onChange={(e) => changeLanguage(e.target.value)} className="bg-slate-100">
        <option value="english">ENG</option>
        <option value="bangla">BN</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
