import React, { Suspense } from 'react';
import Loader from '../common/Loader';
const BlockList = React.lazy(() => import('./BlockList'));
const TransactionList = React.lazy(() => import('./TransactionList'));

export default function ExplorerDashboard(): JSX.Element {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <main className="md:col-span-2 bg-white p-4 rounded shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Blocks</h2>
        <Suspense fallback={<Loader />}>
          <BlockList />
        </Suspense>
      </main>
      <aside className="bg-white p-4 rounded shadow-sm">
        <h3 className="text-md font-semibold mb-3">Recent Transactions</h3>
        <Suspense fallback={<Loader />}>
          <TransactionList />
        </Suspense>
      </aside>
    </div>
  );
}
