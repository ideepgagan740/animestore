'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@shared/ui/atoms/Button';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UI error boundary captured an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center p-6">
          <section className="max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-3 text-sm text-foreground/70">Refresh the page or try again later.</p>
            <Button className="mt-6" onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
