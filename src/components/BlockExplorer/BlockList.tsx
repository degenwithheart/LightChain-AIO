import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProvider } from '../../utils/ethers';
import Loader from '../common/Loader';

type SimpleBlock = { number: number; hash: string; timestamp: number };

async function fetchBlocks(limit = 10): Promise<SimpleBlock[]> {
  const provider = getProvider();
  const latest = await provider.getBlockNumber();
  const arr: SimpleBlock[] = [];
  for (let i = 0; i < limit; i++) {
    const b = await provider.getBlock(latest - i);
    arr.push({ number: b.number, hash: b.hash, timestamp: b.timestamp });
  }
  return arr;
}

export default function BlockList(): JSX.Element {
  const { data, isLoading, isError, refetch } = useQuery(['blocks', 10], () => fetchBlocks(12), { staleTime: 10000, retry: 1 });

  if (isLoading) return <Loader />;
  if (isError) return (
    <div>
      <div className="text-red-600">Failed to load blocks</div>
      <button onClick={() => refetch()} className="mt-2">Retry</button>
    </div>
  );

  return (
    <div className="grid gap-3">
      {data!.map((b) => (
        <article key={b.number} className="p-3 rounded border">
          <div className="flex justify-between">
            <div className="font-semibold">#{b.number}</div>
            <div className="text-xs text-slate-500">{new Date(b.timestamp * 1000).toLocaleString()}</div>
          </div>
          <div className="mt-2 text-xs break-words">{b.hash}</div>
        </article>
      ))}
    </div>
  );
}
