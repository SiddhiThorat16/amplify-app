// amplify-app/frontend/src/components/ErrorBoundary.jsx

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
          <div className="text-center max-w-md space-y-4">
            <h1 className="text-6xl font-black text-red-500">😵</h1>
            <h2 className="text-2xl font-bold text-slate-200">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-medium"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
