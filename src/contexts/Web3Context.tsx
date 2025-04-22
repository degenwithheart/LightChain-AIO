import React, { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  networkId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);

  // Connect to MetaMask
  const connect = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        // Get network ID
        const networkId = await web3Instance.eth.net.getId();
        setNetworkId(networkId);

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0] || null);
        });

        // Listen for network changes
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  // Disconnect MetaMask
  const disconnect = () => {
    setWeb3(null);
    setAccount(null);
    setNetworkId(null);
  };

  return (
    <Web3Context.Provider value={{ web3, account, networkId, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};