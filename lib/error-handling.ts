import { ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export type { ErrorBoundaryState, ErrorBoundaryProps };

// Hook for handling async errors
export function useErrorHandler() {
  const handleError = (error: Error | string, context?: string) => {
    const errorMessage = error instanceof Error ? error.message : error;
    const fullError = new Error(`${context ? `[${context}] ` : ''}${errorMessage}`);

    console.error(fullError);

    // In production, send to error reporting service
    // For now, just log to console and localStorage
    const errorReport = {
      message: fullError.message,
      stack: fullError.stack,
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : ''
    };

    if (typeof window !== 'undefined') {
      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      existingLogs.push(errorReport);
      localStorage.setItem('error_logs', JSON.stringify(existingLogs.slice(-10)));
    }
  };

  return { handleError };
}

// Global error handler for unhandled promise rejections
export function setupGlobalErrorHandling() {
  if (typeof window === 'undefined') return;

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);

    const errorReport = {
      type: 'unhandledrejection',
      reason: event.reason?.toString() || 'Unknown',
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
    existingLogs.push(errorReport);
    localStorage.setItem('error_logs', JSON.stringify(existingLogs.slice(-10)));
  });

  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);

    const errorReport = {
      type: 'global_error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
    existingLogs.push(errorReport);
    localStorage.setItem('error_logs', JSON.stringify(existingLogs.slice(-10)));
  });
}

// Utility function to safely execute async operations
export async function safeAsync<T>(
  operation: () => Promise<T>,
  errorMessage = 'Operation failed',
  context?: string
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error(`${context ? `[${context}] ` : ''}${errorMessage}:`, error);

    // Log to error reporting service
    const errorReport = {
      message: errorMessage,
      originalError: error instanceof Error ? error.message : String(error),
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : ''
    };

    if (typeof window !== 'undefined') {
      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      existingLogs.push(errorReport);
      localStorage.setItem('error_logs', JSON.stringify(existingLogs.slice(-10)));
    }

    return null;
  }
}

// Trading-specific error handling
export class TradingError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'TradingError';
  }
}

export class WalletError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'WalletError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Utility to handle trading operations with specific error types
export async function safeTradingOperation<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof TradingError || error instanceof WalletError || error instanceof NetworkError) {
      throw error; // Re-throw custom errors as-is
    }

    // Wrap unknown errors in TradingError
    const tradingError = new TradingError(
      `Trading operation "${operationName}" failed`,
      'TRADING_OPERATION_FAILED',
      { originalError: error instanceof Error ? error.message : String(error) }
    );

    console.error(tradingError);

    // Log error
    const errorReport = {
      type: 'trading_error',
      operation: operationName,
      message: tradingError.message,
      originalError: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : ''
    };

    if (typeof window !== 'undefined') {
      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      existingLogs.push(errorReport);
      localStorage.setItem('error_logs', JSON.stringify(existingLogs.slice(-10)));
    }

    throw tradingError;
  }
}

// API error handling utility
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  endpoint: string,
  timeout = 10000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      // Add other fetch options as needed
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new NetworkError(
        `API call to ${endpoint} failed with status ${response.status}`,
        'API_ERROR',
        { status: response.status, statusText: response.text }
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof NetworkError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError(
        `API call to ${endpoint} timed out after ${timeout}ms`,
        'API_TIMEOUT',
        { timeout }
      );
    }

    throw new NetworkError(
      `Network error calling ${endpoint}`,
      'NETWORK_ERROR',
      { originalError: error instanceof Error ? error.message : String(error) }
    );
  }
}

// Retry utility for operations that might fail temporarily
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000,
  backoffMultiplier = 2
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        console.warn(`Operation failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`, error);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= backoffMultiplier;
      }
    }
  }

  throw lastError!;
}