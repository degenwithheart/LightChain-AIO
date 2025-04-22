import { useState } from "react";
import axios from "axios";
import { logError } from "../utils/errorLogger";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AI_API_URL = "https://api.openai.com/v1/completions";
const API_KEY = process.env.REACT_APP_AI_API_KEY;

export const useAI = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAIResponse = async (prompt: string, retries = 3) => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post(
        AI_API_URL,
        {
          model: "text-davinci-003", // Replace with your model
          prompt,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setResponse(result.data.choices[0].text.trim());
    } catch (err) {
      if (retries > 0) {
        fetchAIResponse(prompt, retries - 1);
      } else {
        logError(err, "useAI - fetchAIResponse");
        setError("Failed to fetch AI response.");
        toast.error("Failed to fetch AI response. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, fetchAIResponse };
};