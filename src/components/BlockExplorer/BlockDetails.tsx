import React from "react";
import { useTranslation } from "react-i18next";

interface BlockDetailsProps {
  block: {
    number: number;
    hash: string;
    transactions: string[];
    timestamp: string;
    miner: string;
    gasUsed: number;
    gasLimit: number;
  };
}

const BlockDetails: React.FC<BlockDetailsProps> = ({ block }) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">{t("blockExplorerTitle")}</h2>
      <p>
        <strong>{t("blockNumber")}:</strong> {block.number}
      </p>
      <p>
        <strong>{t("hash")}:</strong> {block.hash}
      </p>
      <p>
        <strong>{t("transactions")}:</strong> {block.transactions.length}
      </p>
      <p>
        <strong>{t("timestamp")}:</strong> {new Date(block.timestamp).toLocaleString()}
      </p>
      <p>
        <strong>{t("miner")}:</strong> {block.miner}
      </p>
      <p>
        <strong>{t("gasUsed")}:</strong> {block.gasUsed}
      </p>
      <p>
        <strong>{t("gasLimit")}:</strong> {block.gasLimit}
      </p>
    </div>
  );
};

export default BlockDetails;