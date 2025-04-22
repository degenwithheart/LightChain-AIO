import React from "react";
import { useWeb3 } from "../../contexts/Web3Context";
import { useTranslation } from "react-i18next";

const WalletConnector: React.FC = () => {
  const { account, connect, disconnect } = useWeb3();
  const { t } = useTranslation();

  return (
    <div className="wallet-connector">
      {account ? (
        <div className="flex items-center space-x-4">
          <p className="text-sm">
            {t("connected")}: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t("disconnectWallet")}
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t("connectWallet")}
        </button>
      )}
    </div>
  );
};

export default WalletConnector;