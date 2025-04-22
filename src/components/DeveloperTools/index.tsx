import React from 'react';
import CodeEditor from './CodeEditor';
import APIConsole from './APIConsole';

const DeveloperTools: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">Developer Tools</h1>
            <CodeEditor />
            <APIConsole />
        </div>
    );
};

export default DeveloperTools;