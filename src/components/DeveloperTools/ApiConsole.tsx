import React, { useState } from 'react';
import Button from '../common/Button';
import Loader from '../common/Loader';
import CodeEditor from './CodeEditor';

export default function ApiConsole(): JSX.Element {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [body, setBody] = useState('{}');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: method === 'POST' ? body : undefined });
      const text = await res.text();
      setResult(text);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-lg font-semibold mb-3">API Console</h2>
      <div className="bg-white p-4 rounded shadow-sm space-y-3">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <select value={method} onChange={(e) => setMethod(e.target.value as any)} className="p-2 border rounded">
            <option>GET</option>
            <option>POST</option>
          </select>
          <Button onClick={run} disabled={!url || loading}>{loading ? <Loader /> : 'Send'}</Button>
        </div>
        {method === 'POST' && <CodeEditor value={body} onChange={setBody} />}
        {error && <div className="text-red-600">{error}</div>}
        {result && <pre className="bg-slate-900 text-slate-100 p-3 rounded overflow-auto">{result}</pre>}
      </div>
    </div>
  );
}
