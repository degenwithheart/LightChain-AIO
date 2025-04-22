import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState('// Write your code here...');

    const handleCodeChange = (editor: any, data: any, value: string) => {
        setCode(value);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Code Editor</h2>
            <CodeMirror
                value={code}
                options={{
                    lineNumbers: true,
                    mode: 'javascript',
                    theme: 'material',
                }}
                onBeforeChange={handleCodeChange}
            />
        </div>
    );
};

export default CodeEditor;