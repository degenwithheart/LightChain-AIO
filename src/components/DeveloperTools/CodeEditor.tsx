import React from 'react';

export default function CodeEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={8}
      className="w-full p-2 rounded bg-slate-900 text-slate-100 font-mono"
    />
  );
}
