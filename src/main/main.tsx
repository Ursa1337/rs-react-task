import React from 'react';
import CardItem from '../CardItem/cardItem';
import { ResultItem } from '../models/search.model';
import './main.css';

interface PropsType {
  list: ResultItem[];
}

interface StateType {
  error: boolean;
}

export default class Main extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      error: false,
    };
  }

  emitError() {
    this.setState({ ...this.state, error: true });
  }

  render() {
    if (this.state.error) {
      throw new Error('Test Error');
    }

    return (
      <main className="main">
        {this.props.list.map((i) => {
          return <CardItem key={i.name + i.url} item={i} />;
        })}
        <div className="button-container">
          <button onClick={this.emitError.bind(this)}>
            Test Error Boundary
          </button>
        </div>
      </main>
    );
  }
}
