import React, { useEffect, useState } from "react";
import { logError } from "../../utils/errorLogger";
import axios from "axios";

const Analytics: React.FC = () => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://api.example.com/analytics");
        setInsights(response.data.insights);
      } catch (err) {
        logError(err, "Analytics - fetchInsights");
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">AI-Generated Analytics</h2>
      {loading && <p className="text-center">Loading insights...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {insights && (
        <div className="p-4 bg-white rounded shadow mt-4">
          <p>{insights}</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;