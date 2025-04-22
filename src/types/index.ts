export interface Block {
    hash: string;
    number: number;
    timestamp: number;
    transactions: string[];
}

export interface TokenLaunch {
    id: string;
    name: string;
    symbol: string;
    totalSupply: number;
    launchDate: Date;
}

export interface AIAnalytics {
    insights: string[];
    trends: string[];
}

export interface DeveloperTool {
    id: string;
    name: string;
    description: string;
}

export interface Web3ContextType {
    account: string | null;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}