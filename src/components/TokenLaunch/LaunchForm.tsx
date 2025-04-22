import React, { useState } from "react";
import Form from "../common/Form";

const LaunchForm: React.FC = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, symbol });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Token Name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Token Symbol"
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Launch Token
      </button>
    </Form>
  );
};

export default LaunchForm;