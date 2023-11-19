import React from 'react';
import { NavigateOptions, To } from 'react-router-dom';
import './ErrorBoundary.css';

interface PropsType {
  children: React.ReactNode;
  navigate: (to: To, options?: NavigateOptions) => void;
}

interface StateType {
  error: boolean;
  text: string;
  stack: string;
}

export class ErrorBoundary extends React.Component<
  PropsType,
  StateType
> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      error: false,
      text: '',
      stack: '',
    };

    this.closeError = this.closeError.bind(this);
  }

  componentDidCatch(error: Error) {
    this.setState({
      ...this.setState,
      error: true,
      text: error.message,
      stack: error.stack!,
    });
  }

  closeError() {
    this.props.navigate('/');
    this.setState({
      error: false,
      text: '',
      stack: ''
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className='error-description'>
          <h2>Unhandled exception</h2>
          <span>{this.state.text}</span>
          <span>{this.state.stack}</span>
          <button onClick={this.closeError}>Close</button>
        </div>
      );
    }
    return this.props.children;
  }
}