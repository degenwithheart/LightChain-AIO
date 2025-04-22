import { useEffect, useState } from 'react';
import Web3 from 'web3';

const useWeb3 = () => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [networkId, setNetworkId] = useState<number | null>(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);

                    const networkId = await web3Instance.eth.net.getId();
                    setNetworkId(networkId);
                } catch (error) {
                    console.error("User denied account access or error occurred:", error);
                }
            } else {
                console.error("Ethereum provider not found. Install MetaMask.");
            }
        };

        initWeb3();
    }, []);

    return { web3, account, networkId };
};

export default useWeb3;