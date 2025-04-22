import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage("en")}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        {i18n.t("english")}
      </button>
      <button
        onClick={() => changeLanguage("es")}
        className="px-2 py-1 bg-green-500 text-white rounded"
      >
        {i18n.t("spanish")}
      </button>
      <button
        onClick={() => changeLanguage("fr")}
        className="px-2 py-1 bg-purple-500 text-white rounded"
      >
        {i18n.t("french")}
      </button>
      <button
        onClick={() => changeLanguage("de")}
        className="px-2 py-1 bg-yellow-500 text-white rounded"
      >
        {i18n.t("german")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;