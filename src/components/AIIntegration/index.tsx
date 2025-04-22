import React from "react";
import ChatBot from "./ChatBot";
import Analytics from "./Analytics";

const AIIntegration: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded shadow max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center">AI Integration</h1>
      <ChatBot />
      <Analytics />
    </div>
  );
};

export default AIIntegration;