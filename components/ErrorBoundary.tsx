'use client';

import * as React from 'react';
import { Component } from 'react';
import { ErrorPage } from './ErrorPage';
import { ErrorBoundaryState, ErrorBoundaryProps } from '../lib/error-handling';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to external service in production
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would send this to a logging service like Sentry
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
    // Mock logging service - in real implementation, use Sentry, LogRocket, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    };

    // Store in localStorage for debugging (in production, send to server)
    if (typeof window !== 'undefined') {
      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      existingLogs.push(errorReport);
      localStorage.setItem('error_logs', JSON.stringify(existingLogs.slice(-10))); // Keep last 10 errors
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  private handleReportError = () => {
    // In a real app, send error report to server
    const errorReport = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    };

    // Mock API call
    console.log('Reporting error:', errorReport);
    alert('Error reported. Thank you for helping us improve!');
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message || 'An unexpected error occurred';
      const errorDetails = process.env.NODE_ENV === 'development' && this.state.error?.stack
        ? `${this.state.error.stack}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack}`
        : undefined;

      return (
        <ErrorPage
          title="Something went wrong"
          message="We encountered an unexpected error. Our team has been notified and is working to fix it."
          code="Error"
          actions={[
            {
              label: 'Try Again',
              onClick: this.handleReset,
            },
            {
              label: 'Reload Page',
              onClick: () => window.location.reload(),
              variant: 'outline',
            },
            {
              label: 'Report Error',
              onClick: this.handleReportError,
              variant: 'outline',
            },
          ]}
          showDetails={process.env.NODE_ENV === 'development'}
          details={errorDetails}
        />
      );
    }

    return this.props.children;
  }
}