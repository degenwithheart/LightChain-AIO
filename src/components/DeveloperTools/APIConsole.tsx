import React, { useState } from 'react';

const APIConsole: React.FC = () => {
    const [endpoint, setEndpoint] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        setLoading(true);
        setResponse('');
        try {
            const res = await fetch(endpoint);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">API Console</h2>
            <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="Enter API endpoint"
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={handleFetch}
                className="bg-blue-500 text-white p-2 rounded"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Fetch Data'}
            </button>
            <pre className="mt-4 bg-gray-100 p-2 border rounded">
                {response}
            </pre>
        </div>
    );
};

export default APIConsole;