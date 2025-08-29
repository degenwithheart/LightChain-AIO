import { useMutation } from '@tanstack/react-query';

type AiRequest = { prompt: string; maxTokens?: number };
type AiResponse = { id?: string; text: string; meta?: Record<string, unknown> };

async function callAi(body: AiRequest): Promise<AiResponse> {
  const endpoint = process.env.REACT_APP_AI_ENDPOINT || '/api/ai';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export function useAi() {
  return useMutation(callAi);
}
