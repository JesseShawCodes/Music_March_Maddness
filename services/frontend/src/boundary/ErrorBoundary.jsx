/* eslint-disable */
import * as React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div>There is an error</div>
          <div>{this.state.error.message}</div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
