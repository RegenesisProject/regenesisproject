import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center font-inter">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D0D0D] border border-[#7E4F11]/60 shadow-[0_0_40px_rgba(226,177,61,0.2)]">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FCE289] bg-[#000000] px-3 py-1 rounded-full border border-[#E2B13D]/40">
              Application Notice
            </span>
            <h2 className="text-xl font-bold font-plus-jakarta text-[#F3EFE0] mt-4 mb-2">
              Something encountered an unexpected state
            </h2>
            <p className="text-sm text-[#A69B89] mb-6 leading-relaxed">
              We've protected the session state. You can refresh or return to the main view seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-black font-semibold text-xs uppercase tracking-[0.15em] hover:scale-105 transition-all cursor-pointer shadow-md"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    window.location.href = '/';
                  } catch {
                    window.location.reload();
                  }
                }}
                className="px-5 py-2.5 rounded bg-[#1A1A1A] border border-[#7E4F11]/50 text-[#F3EFE0] font-semibold text-xs uppercase tracking-[0.15em] hover:bg-[#252525] transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
