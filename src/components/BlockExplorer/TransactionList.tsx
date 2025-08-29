import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProvider } from '../../utils/ethers';
import Loader from '../common/Loader';

async function fetchRecentTxs(limit = 12): Promise<string[]> {
  const provider = getProvider();
  const latest = await provider.getBlock('latest');
  const txs = latest.transactions.slice(0, limit).map((t) => (typeof t === 'string' ? t : t.hash));
  return txs;
}

export default function TransactionList(): JSX.Element {
  const { data, isLoading, isError, refetch } = useQuery(['recentTxs'], () => fetchRecentTxs(12), { staleTime: 5000, retry: 1 });

  if (isLoading) return <Loader />;
  if (isError) return (
    <div className="text-red-600">
      Failed to load recent transactions.
      <div className="mt-2">
        <button onClick={() => refetch()}>Retry</button>
      </div>
    </div>
  );

  return (
    <ul className="space-y-2">
      {data!.map((tx) => (
        <li key={tx} className="p-2 rounded border text-xs break-words bg-white">{tx}</li>
      ))}
    </ul>
  );
}
