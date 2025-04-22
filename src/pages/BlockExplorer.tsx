import React from 'react';
import BlockList from '../components/BlockExplorer/BlockList';
import BlockDetails from '../components/BlockExplorer/BlockDetails';

const BlockExplorer: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Block Explorer</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BlockList />
                <BlockDetails />
            </div>
        </div>
    );
};

export default BlockExplorer;