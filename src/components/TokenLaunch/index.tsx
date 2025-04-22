import React from 'react';
import LaunchForm from './LaunchForm';
import LaunchList from './LaunchList';

const TokenLaunch: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Token Launch Management</h1>
            <LaunchForm />
            <LaunchList />
        </div>
    );
};

export default TokenLaunch;