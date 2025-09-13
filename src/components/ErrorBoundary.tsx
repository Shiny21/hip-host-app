import React from 'react';

type Props = {
  fallback?: React.ReactNode;
  children?: React.ReactNode;   // ✅ add this
};
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.fallback || 'Something went wrong.'}</div>;
    }
    return this.props.children;
  }
}
