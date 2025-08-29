import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import { register, applyUpdate } from './serviceworkerRegistration';

const Home = React.lazy(() => import('./pages/Home'));
const Explorer = React.lazy(() => import('./components/BlockExplorer/ExplorerDashboard'));
const AI = React.lazy(() => import('./components/AIIntegration/ChatWidget'));
const DevTools = React.lazy(() => import('./components/DeveloperTools/ApiConsole'));
const Launch = React.lazy(() => import('./components/TokenLaunch/LaunchForm'));

function Nav() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex gap-6 items-center">
        <Link to="/" className="font-semibold text-lg">Lightchain AIO</Link>
        <div className="flex gap-4">
          <Link to="/explorer" className="text-sm text-slate-600">Explorer</Link>
          <Link to="/ai" className="text-sm text-slate-600">AI</Link>
          <Link to="/dev" className="text-sm text-slate-600">Dev Tools</Link>
          <Link to="/launch" className="text-sm text-slate-600">Launch</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App(): JSX.Element {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    register();
    const onSwUpdated = (e: Event) => {
      const custom = e as CustomEvent<{ registration: ServiceWorkerRegistration }>;
      const reg = custom?.detail?.registration;
      if (reg) {
        setRegistration(reg);
        setUpdateAvailable(true);
      }
    };
    window.addEventListener('swUpdated', onSwUpdated as EventListener);
    return () => window.removeEventListener('swUpdated', onSwUpdated as EventListener);
  }, []);

  const onApply = async () => {
    if (!registration) return;
    setIsApplying(true);
    try {
      await applyUpdate(registration as any);
      window.location.reload();
    } catch (err) {
      console.error('applyUpdate failed', err);
      setIsApplying(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="container mx-auto p-6 flex-1">
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/dev" element={<DevTools />} />
                <Route path="/launch" element={<Launch />} />
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        {updateAvailable && (
          <div className="fixed left-4 right-4 bottom-6 z-50">
            <div className="bg-slate-800 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <div className="font-semibold">New version available</div>
                <div className="text-sm opacity-80">Apply the update to load the latest version.</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setUpdateAvailable(false); setRegistration(null); }} className="px-3 py-1 rounded border border-white/20">Dismiss</button>
                <button onClick={onApply} disabled={isApplying} className="px-3 py-1 rounded bg-teal-400 text-teal-900 font-semibold">
                  {isApplying ? 'Updating…' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
