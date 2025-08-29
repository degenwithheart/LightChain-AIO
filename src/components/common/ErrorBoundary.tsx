import React from 'react';

type State = { hasError: boolean; error?: Error | null };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<unknown>, State> {
  constructor(props: React.PropsWithChildren<unknown>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Optionally: send to Sentry if REACT_APP_SENTRY_DSN present
    // eslint-disable-next-line no-console
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-4 rounded bg-red-50 text-red-800">
          <strong>Something went wrong</strong>
          <div className="mt-2">{this.state.error?.message || 'An unexpected error occurred.'}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
