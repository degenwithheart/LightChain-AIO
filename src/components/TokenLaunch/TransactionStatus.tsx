import React, { useEffect, useState } from 'react';
import { getProvider } from '../../utils/ethers';
import Loader from '../common/Loader';

export default function TransactionStatus({ txHash, confirmations = 1 }: { txHash: string; confirmations?: number }) {
  const [status, setStatus] = useState<'pending'|'success'|'failed'|'unknown'>('pending');
  const [receipt, setReceipt] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!txHash) return;
    let mounted = true;
    const provider = getProvider();
    const poll = async () => {
      try {
        const r = await provider.getTransactionReceipt(txHash);
        if (!mounted) return;
        if (!r) { setStatus('pending'); return; }
        setReceipt(r);
        setStatus(r.status === 1 ? 'success' : 'failed');
      } catch (err: any) {
        setError(err?.message || String(err));
      }
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => { mounted = false; clearInterval(id); };
  }, [txHash, confirmations]);

  return (
    <div className="mt-3 p-3 rounded border bg-white">
      <div className="font-semibold">Transaction status</div>
      <div className="mt-2">
        {status === 'pending' && <div className="flex items-center gap-2"><Loader size={16} /> Pending</div>}
        {status === 'success' && <div className="text-green-700">✅ Confirmed (block {receipt?.blockNumber})</div>}
        {status === 'failed' && <div className="text-red-700">❌ Failed (block {receipt?.blockNumber})</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
    </div>
  );
}
