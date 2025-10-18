'use client';

import * as React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { APP_CONFIG } from '../../lib/constants';

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main 
        className="container mx-auto px-4 py-8 pt-16"
        style={{ 
          minHeight: `clamp(${APP_CONFIG.ui.minContentHeight.mobile}, 50vh, ${APP_CONFIG.ui.minContentHeight.desktop})`
        }}
      >
        <h1 className="text-3xl font-orbitron text-primary mb-8">AI Trading Agents</h1>
        <p className="text-foreground/70">
          Agent system is under development. Check back soon for autonomous trading capabilities.
        </p>
      </main>
      <Footer />
    </div>
  );
}