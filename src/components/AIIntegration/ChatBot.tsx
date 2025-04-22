import React, { useState } from "react";
import { useAI } from "../../hooks/useAI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ChatBot: React.FC = React.memo(() => {
  const [input, setInput] = useState("");
  const { response, loading, error, fetchAIResponse } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      fetchAIResponse(input);
      setInput("");
    } else {
      toast.warn("Please enter a valid question.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">AI ChatBot</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      {response && (
        <div className="p-2 bg-white rounded shadow mt-4">
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div className="p-2 bg-red-100 text-red-500 rounded shadow mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
});

export default ChatBot;