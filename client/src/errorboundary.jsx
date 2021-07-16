import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
      return { hasError: true}
  }

  render() {
      if(this.state.hasError) {
          return <a href="/">Uh Oh! There was an error with the website, return to the home page.</a>
      }
      return this.props.children;
  }
}

export default ErrorBoundary