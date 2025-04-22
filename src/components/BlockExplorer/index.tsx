import React from 'react';
import BlockList from './BlockList';
import BlockDetails from './BlockDetails';

const BlockExplorer: React.FC = () => {
    return (
        <div className="block-explorer">
            <h1 className="text-2xl font-bold mb-4">Block Explorer</h1>
            <div className="flex">
                <div className="w-1/2 pr-4">
                    <BlockList />
                </div>
                <div className="w-1/2 pl-4">
                    <BlockDetails />
                </div>
            </div>
        </div>
    );
};

export default BlockExplorer;