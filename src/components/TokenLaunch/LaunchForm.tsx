import React, { useState } from 'react';
import { connectWallet, getContract, write } from '../../utils/ethers';
import Button from '../common/Button';
import Loader from '../common/Loader';
import TransactionStatus from './TransactionStatus';

const FACTORY_ADDRESS = process.env.REACT_APP_TOKEN_FACTORY_ADDRESS || '';
const FACTORY_ABI = [
  'function createToken(string name, string symbol, uint256 supply) public returns (address)'
];

export default function LaunchForm(): JSX.Element {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('1000000');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!FACTORY_ADDRESS) { setError('Token factory not configured'); return; }
    setLoading(true);
    try {
      const { signer } = await connectWallet();
      const contract = getContract(FACTORY_ADDRESS, FACTORY_ABI, signer);
      const receipt = await write(contract, 'createToken', [name, symbol, supply], {}, 1);
      setTxHash(receipt.transactionHash);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Create Token</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow-sm space-y-3">
        <label className="block">
          <div className="text-sm mb-1">Name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        </label>
        <label className="block">
          <div className="text-sm mb-1">Symbol</div>
          <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className="w-full p-2 border rounded" required />
        </label>
        <label className="block">
          <div className="text-sm mb-1">Total Supply</div>
          <input value={supply} onChange={(e) => setSupply(e.target.value)} className="w-full p-2 border rounded" required />
        </label>

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>{loading ? <Loader /> : 'Create Token'}</Button>
        </div>

        {txHash && <TransactionStatus txHash={txHash} />}
      </form>
    </div>
  );
}
