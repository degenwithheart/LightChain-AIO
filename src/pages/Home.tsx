import React from "react";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
      <p className="text-lg mb-8">{t("description")}</p>
      <div className="flex space-x-4">
        <a href="/block-explorer" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {t("exploreBlocks")}
        </a>
        <a href="/token-launch" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          {t("launchTokens")}
        </a>
        <a href="/ai-integration" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          {t("aiIntegration")}
        </a>
        <a href="/developer-tools" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          {t("developerTools")}
        </a>
      </div>
    </div>
  );
};

export default Home;