import React from 'react';
import CodeEditor from '../components/DeveloperTools/CodeEditor';
import APIConsole from '../components/DeveloperTools/APIConsole';

const DeveloperTools = () => {
    return (
        <div className="flex flex-col space-y-4 p-6">
            <h1 className="text-2xl font-bold">Developer Tools</h1>
            <CodeEditor />
            <APIConsole />
        </div>
    );
};

export default DeveloperTools;