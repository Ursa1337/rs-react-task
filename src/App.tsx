import React from 'react';
import Header from './header/header';
import Main from './main/main';
import Loader from './loader/loader';
import { ResultItem, SearchResult } from './models/search.model';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

interface StateType {
  defaultValue: string;
  search: string;
  result: ResultItem[];
  loading: boolean;
}

interface PropsType {}

export default class App extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    const valueStorage = (localStorage.getItem('lastSearch') as string) || '';
    this.state = {
      defaultValue: valueStorage,
      search: valueStorage,
      result: [],
      loading: false,
    };

    this.changeSearchEvent = this.changeSearchEvent.bind(this);
    this.clickSearchHandler = this.clickSearchHandler.bind(this);
  }

  componentDidMount() {
    this.clickSearchHandler();
  }

  changeSearchEvent(value: string) {
    this.setState({ ...this.state, search: value });
    localStorage.setItem('lastSearch', value);
  }

  clickSearchHandler() {
    this.setState({ ...this.state, loading: true });
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9999')
      .then((response) => response.json())
      .then((response: SearchResult) => {
        const result = response.results
          .filter((v) => v.name.includes(this.state.search))
          .slice(0, 50);
        setTimeout(() => {
          this.setState({ ...this.state, result: result, loading: false });
        }, 500);
      })
      .catch(() => this.setState({ ...this.state, loading: false }));
  }

  render() {
    return (
      <ErrorBoundary>
        <Header
          defaultValue={this.state.defaultValue}
          changeSearchEvent={this.changeSearchEvent}
          clickSearchEvent={this.clickSearchHandler}
        />
        {this.state.loading && <Loader />}
        <Main list={this.state.result} />
      </ErrorBoundary>
    );
  }
}
