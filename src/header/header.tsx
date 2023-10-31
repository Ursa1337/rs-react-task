import React from 'react';
import './header.css';

interface propsType {
  defaultValue: string;
  changeSearchEvent: (value: string) => void;
  clickSearchEvent: () => void;
}

export default class Header extends React.Component<propsType> {
  keyUpHandler(event: EventTarget) {
    const el = event as HTMLInputElement;
    this.props.changeSearchEvent(el.value);
  }

  render() {
    return (
      <header className="header">
        <h2>Pokemon</h2>
        <div className="text-field-container">
          <span className="text-field">
            <input
              defaultValue={this.props.defaultValue}
              onKeyUp={(e) => this.keyUpHandler(e.target)}
              id="search-input"
              type="text"
              required
            />
            <label htmlFor="search-input">Search</label>
          </span>
          <button
            className="button-icon-search"
            onClick={this.props.clickSearchEvent}
          >
            <img src="./search-icon.svg" alt="search icon" />
          </button>
        </div>
      </header>
    );
  }
}
