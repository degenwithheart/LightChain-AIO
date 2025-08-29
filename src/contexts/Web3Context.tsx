import React, { createContext, useContext, useEffect, useState } from 'react';
import { providers, Signer } from 'ethers';
import { getProvider, connectWallet } from '../utils/ethers';

type Web3State = {
  provider: providers.BaseProvider | null;
  signer: Signer | null;
  address: string | null;
  connect: () => Promise<void>;
};

const Web3Context = createContext<Web3State | undefined>(undefined);

export const Web3Provider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [provider, setProvider] = useState<providers.BaseProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setProvider(getProvider());
  }, []);

  const connect = async () => {
    const result = await connectWallet();
    setProvider(result.provider);
    setSigner(result.signer);
    setAddress(result.address);
  };

  return <Web3Context.Provider value={{ provider, signer, address, connect }}>{children}</Web3Context.Provider>;
};

export function useWeb3() {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error('useWeb3 must be used inside Web3Provider');
  return ctx;
}
