import React, { Component } from 'react';

class errorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to indicate the error.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI here
            return (
                <section className='bError' id='bError'>
                    <h1>Something went wrong.</h1>
                </section>
            );
        }

        return this.props.children;
    }
}

export default errorBoundary;
