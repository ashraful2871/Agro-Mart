import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {/* <button
        onClick={() => changeLanguage("english")}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("bangla")}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        বাংলা
      </button> */}
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-slate-100"
      >
        <option value="english">ENG</option>
        <option value="bangla">BN</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
