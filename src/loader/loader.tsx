import React from 'react';
import './loader.css';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader-progress">
        <span className="loader-open"></span>
        <span className="loader-close"></span>
      </div>
    );
  }
}
