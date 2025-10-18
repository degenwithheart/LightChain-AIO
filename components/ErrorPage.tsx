'use client';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { APP_CONFIG } from '../lib/constants';

interface ErrorPageProps {
  title: string;
  message: string;
  code?: string | number;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline';
  }>;
  showDetails?: boolean;
  details?: string;
}

export function ErrorPage({
  title,
  message,
  code,
  actions = [],
  showDetails = false,
  details
}: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main 
        className="container mx-auto px-4 py-8 flex items-center justify-center pt-16"
        style={{ 
          minHeight: `clamp(${APP_CONFIG.ui.minContentHeight.mobile}, 50vh, ${APP_CONFIG.ui.minContentHeight.desktop})`
        }}
      >
        <div className="text-center max-w-md w-full">
          {code && (
            <div className="text-8xl font-bold text-primary mb-4 opacity-20">
              {code}
            </div>
          )}
          <h1 className="text-4xl font-bold text-primary mb-4">{title}</h1>
          <p className="text-xl text-foreground/70 mb-8">{message}</p>

          {actions.length > 0 && (
            <div className="flex gap-2 justify-center flex-wrap">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant || 'default'}
                  className="glass-button"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {showDetails && details && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-foreground/70 hover:text-foreground mb-2">
                Error Details
              </summary>
              <pre className="text-xs bg-card-bg p-3 rounded overflow-auto max-h-40 border">
                {details}
              </pre>
            </details>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}