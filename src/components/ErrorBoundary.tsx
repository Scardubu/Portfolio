'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/shared/Button'
import { Card } from '@/components/ui/shared/Card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center p-4">
            <Card variant="outline" className="max-w-lg w-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Something went wrong
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
                <div className="space-x-4">
                  <Button onClick={() => window.location.reload()}>Refresh Page</Button>
                  <Button variant="outline" onClick={this.handleReset}>
                    Try Again
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )
      )
    }

    return this.props.children
  }
}
