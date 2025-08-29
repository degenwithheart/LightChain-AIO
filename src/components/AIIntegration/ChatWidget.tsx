import React, { useState } from 'react';
import { useAi } from '../../hooks/useAI';
import Button from '../common/Button';
import Loader from '../common/Loader';

export default function ChatWidget(): JSX.Element {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<{ text: string }[]>([]);
  const mutation = useAi();

  const onAsk = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) return;
    mutation.mutate({ prompt: prompt.trim(), maxTokens: 256 }, {
      onSuccess(resp) {
        setHistory((h) => [...h, { text: resp.text }]);
      }
    });
    setPrompt('');
  };

  return (
    <section className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-3">AI Assistant</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="min-h-[120px] max-h-80 overflow-auto">
          {history.length === 0 && <div className="text-slate-500">Ask about a transaction, token, or address...</div>}
          {history.map((m, i) => (
            <div key={i} className="mb-3">
              <div className="text-sm text-slate-500">AI</div>
              <pre className="whitespace-pre-wrap mt-1 text-sm">{m.text}</pre>
            </div>
          ))}
        </div>
        <form className="mt-3 flex gap-2" onSubmit={onAsk}>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Explain this transaction..."
            className="flex-1 p-2 rounded border"
            disabled={mutation.isLoading}
          />
          <Button type="submit" disabled={mutation.isLoading || !prompt.trim()}>
            {mutation.isLoading ? <Loader size={16} /> : 'Ask'}
          </Button>
        </form>
        {mutation.isError && <div className="text-red-600 mt-2">{(mutation.error as Error).message}</div>}
      </div>
    </section>
  );
}
