import { Component, type ReactNode } from 'react';

/** Shows the error instead of a blank white page if rendering fails. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: 32, color: '#002B49' }}>
        <h1 style={{ fontSize: 20 }}>Something went wrong while loading the page.</h1>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#EBEBEE', padding: 16, borderRadius: 8, fontSize: 13 }}>
          {String(this.state.error?.stack || this.state.error)}
        </pre>
      </div>
    );
  }
}
