import React from 'react';
import LaunchForm from '../components/TokenLaunch/LaunchForm';
import LaunchList from '../components/TokenLaunch/LaunchList';

const TokenLaunch: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Token Launch Management</h1>
            <LaunchForm />
            <LaunchList />
        </div>
    );
};

export default TokenLaunch;