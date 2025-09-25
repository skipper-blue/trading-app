import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

// Simple error boundary for catching render errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-400">
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <ErrorBoundary>
        <header>
          <Navbar />
        </header>
        <main className="p-6 container mx-auto max-w-6xl" role="main">
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
