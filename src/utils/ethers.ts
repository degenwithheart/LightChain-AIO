import { ethers, providers, Signer, Contract } from 'ethers';

declare global {
  interface Window { ethereum?: any; }
}

export type ProviderOrSigner = providers.Provider | Signer;

export function getProvider(): providers.BaseProvider {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum, 'any');
  }
  const rpc = process.env.REACT_APP_RPC_URL || 'https://cloudflare-eth.com';
  return new ethers.providers.StaticJsonRpcProvider(rpc);
}

export async function connectWallet(): Promise<{ provider: providers.Web3Provider; signer: Signer; address: string }> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No injected Ethereum provider found in the browser.');
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  try {
    await provider.send('eth_requestAccounts', []);
  } catch (err) {
    throw new Error('User denied account access.');
  }
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { provider, signer, address };
}

export function getContract(address: string, abi: any, providerOrSigner?: ProviderOrSigner): Contract {
  const resolved = providerOrSigner ?? getProvider();
  return new Contract(address, abi, resolved as any);
}

export async function read<T = any>(contract: Contract, method: string, args: any[] = []): Promise<T> {
  if (!contract || typeof (contract as any)[method] !== 'function') {
    throw new Error(`Contract method "${method}" not found.`);
  }
  // @ts-ignore
  return (contract as any)[method](...args);
}

export async function write(
  contract: Contract,
  method: string,
  args: any[] = [],
  overrides: ethers.CallOverrides | ethers.PayableOverrides = {},
  confirmations = 1
): Promise<ethers.providers.TransactionReceipt> {
  if (!contract || typeof (contract as any)[method] !== 'function') {
    throw new Error(`Contract method "${method}" not found or not a function.`);
  }
  const signerPresent = Boolean((contract as any).signer && (contract as any).signer._isSigner);
  if (!signerPresent) {
    throw new Error('Contract must be connected to a signer for write operations.');
  }
  try {
    // @ts-ignore
    const txResponse: ethers.providers.TransactionResponse = await (contract as any)[method](...args, overrides);
    const receipt = await txResponse.wait(confirmations);
    if (receipt.status === 0) {
      throw new Error(`Transaction failed: ${txResponse.hash}`);
    }
    return receipt;
  } catch (err: any) {
    const message = err?.error?.message || err?.message || String(err);
    throw new Error(`Transaction error: ${message}`);
  }
}
