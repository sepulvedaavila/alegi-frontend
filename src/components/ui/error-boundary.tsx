import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Widget Error Boundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading widget</AlertTitle>
          <AlertDescription className="mt-2">
            <div className="space-y-2">
              <p>Please try refreshing the page or contact support if the problem persists.</p>
              {this.state.error && (
                <details className="text-xs">
                  <summary className="cursor-pointer">Error details</summary>
                  <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={this.resetError}
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to use error boundaries
export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    throw error;
  }

  return setError;
};

export default ErrorBoundary; 