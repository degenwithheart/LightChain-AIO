/**
 * Production-ready ethers.js helpers
 * - getProvider(): read-only provider (injected or RPC fallback)
 * - connectWallet(): requests account access and returns provider, signer, address
 * - getContract(): returns ethers.Contract connected to provider or signer
 * - read(): typed read-only call
 * - write(): send tx and wait for confirmations with robust error handling
 *
 * Usage:
 *  const { provider, signer, address } = await connectWallet();
 *  const contract = getContract(CONTRACT_ADDRESS, ABI, signer);
 *  const balance = await read(contract, 'balanceOf', [address]);
 *  const receipt = await write(contract, 'transfer', [to, amount], { gasLimit: 100000 });
 */
import { ethers, providers, Signer, Contract } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type ProviderOrSigner = providers.Provider | Signer;

/**
 * Returns a provider:
 * - If injected (MetaMask / WalletConnect provider), returns Web3Provider
 * - Else returns StaticJsonRpcProvider using REACT_APP_RPC_URL fallback
 */
export function getProvider(): providers.BaseProvider {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum, "any");
  }
  const rpc = process.env.REACT_APP_RPC_URL || "https://cloudflare-eth.com";
  return new ethers.providers.StaticJsonRpcProvider(rpc);
}

/**
 * Request account access and return provider, signer and address.
 * Throws a descriptive error if no injected provider or user rejects.
 */
export async function connectWallet(): Promise<{
  provider: providers.Web3Provider;
  signer: Signer;
  address: string;
}> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No injected Ethereum provider (e.g. MetaMask) found in the browser.");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  try {
    // ask user to connect accounts
    await provider.send("eth_requestAccounts", []);
  } catch (err) {
    throw new Error("User denied account access.");
  }

  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { provider, signer, address };
}

/**
 * Returns a Contract instance connected to provider or signer.
 * Use a signer for write operations.
 */
export function getContract(address: string, abi: any, providerOrSigner?: ProviderOrSigner): Contract {
  const resolved = providerOrSigner ?? getProvider();
  return new Contract(address, abi, resolved as any);
}

/**
 * Read helper. Throws if method missing.
 */
export async function read<T = any>(contract: Contract, method: string, args: any[] = []): Promise<T> {
  if (!contract || typeof (contract as any)[method] !== "function") {
    throw new Error(`Contract method "${method}" not found.`);
  }
  // @ts-ignore
  return (contract as any)[method](...args);
}

/**
 * Write helper: sends a transaction and waits for confirmations (default 1).
 * Throws with details if transaction reverts or returns status 0.
 */
export async function write(
  contract: Contract,
  method: string,
  args: any[] = [],
  overrides: ethers.CallOverrides | ethers.PayableOverrides = {},
  confirmations = 1
): Promise<ethers.providers.TransactionReceipt> {
  if (!contract || typeof (contract as any)[method] !== "function") {
    throw new Error(`Contract method "${method}" not found or not a function.`);
  }

  // Ensure we have a signer attached
  const signerPresent = Boolean((contract as any).signer && (contract as any).signer._isSigner);
  if (!signerPresent) {
    throw new Error("Contract must be connected to a signer for write operations.");
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
    // Extract revert reason if available
    const message = err?.error?.message || err?.message || String(err);
    throw new Error(`Transaction error: ${message}`);
  }
}

/**
 * Wait for a tx hash to be mined using the provided or default provider.
 */
export async function waitForTx(hash: string, provider?: providers.Provider, confirmations = 1) {
  const p = provider ?? getProvider();
  return p.waitForTransaction(hash, confirmations);
}
