import React from 'react';
import ChatBot from '../components/AIIntegration/ChatBot';
import Analytics from '../components/AIIntegration/Analytics';

const AIIntegration: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">AI Integration</h1>
            <ChatBot />
            <Analytics />
        </div>
    );
};

export default AIIntegration;