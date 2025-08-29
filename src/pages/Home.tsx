import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Lightchain AIO</h1>
      <p className="mt-2 text-slate-600">Explorer, AI analytics, developer tools and token launchpad.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Link to="/explorer" className="p-4 border rounded-lg bg-white">Explorer</Link>
        <Link to="/ai" className="p-4 border rounded-lg bg-white">AI Assistant</Link>
        <Link to="/dev" className="p-4 border rounded-lg bg-white">Developer Tools</Link>
        <Link to="/launch" className="p-4 border rounded-lg bg-white">Token Launchpad</Link>
      </div>
    </div>
  );
}
