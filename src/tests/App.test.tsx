import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi, Mock } from 'vitest';
import { App } from '../App';
import data from './testData.json';

test('Count items in page', async () => {
  window.history.pushState({}, '', '/?count=5');
  const { container }  = render(<App />);

  await waitFor(() => {
    const items = container.querySelectorAll('.card-pokemon');
    expect(items.length).toBe(5);
  }, {timeout: 10000});
}, {timeout: 10000});

test('Not found pokemons', async () => {
  window.history.pushState({}, '', '/?page=1123111&count=15');
  const { container } = render(<App />);

  await waitFor(() => {
    const loader = container.querySelector('.loader-progress');
    expect(loader).toBe(null);
  }, {timeout: 10000});

  const button = container.querySelector('.button-not-found-main') as HTMLButtonElement;
  screen.getByText(/Pokemons not found/i);
  fireEvent.click(button);
  expect(window.location.pathname, '/');
}, {timeout: 10000});

test('Data in card', async () => {
  window.history.pushState({}, '', '/bulbasaur');
  render(<App />);

  await waitFor(() => {
    screen.getByText(/bulbasaur/i);
    screen.getByText(/hp: 45/i);
    screen.getByText(/attack: 49/i);
    screen.getByText(/defense: 49/i);
    screen.getByText(/special-attack: 65/i);
    screen.getByText(/speed: 45/i);
  }, {timeout: 10000});
}, {timeout: 10000});

test('Open detail', async () => {
  window.history.pushState({}, '', '/bulbasaur');
  const { container } = render(<App />);

  await waitFor(() => {
    fireEvent.click(container.querySelector('.pokemon-name') as HTMLElement);
    const detail = container.querySelector('.description-main') as HTMLElement;
    expect(detail).not.toBe(null);
  }, {timeout: 10000});
}, {timeout: 10000});

test('Fetch data', async () => {
  let requestCount = 0;
  window.history.pushState({}, '', '/');
  const MockFetch = fetch;

  const { container } = render(<App />);

  await waitFor(() => {
    const card = container.querySelector('.card-pokemon') as HTMLElement;
    expect(card).not.toBe(null);
    global.fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit | undefined) => {
      requestCount += 1;
      return MockFetch(input, init);
    }) as Mock;
    fireEvent.click(card);
    expect(requestCount).not.toBe(0);
  }, {timeout: 10000});
}, {timeout: 10000});

test('Loading indicator detail', async () => {
  window.history.pushState({}, '', '/bulbasaur/1?page=0&count=5&detail=1');

  const { container } = render(<App />);

  await waitFor(() => {
    const loading = container.querySelector('.description-main > .loader-progress');
    expect(loading).not.toBe(null);
  }, {timeout: 10000});
}, {timeout: 10000});

test('Data in detail validation', async () => {
  window.history.pushState({}, '', '/bulbasaur/1?page=0&count=5&detail=1');
  const MockFetch = fetch;

  global.fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit | undefined) => {
    if (String(input).includes('https://pokeapi.co/api/v2/pokemon/1')) {
      return Promise.resolve({
        json: () => Promise.resolve(data),
      });
    }
    return MockFetch(input, init);
  }) as Mock;

  const { container } = render(<App />);

  await waitFor(() => {
    const loading = container.querySelector('.description-main > .loader-progress');
    expect(loading).toBe(null);
    const name = container.querySelector('.description-main > h2') as HTMLElement;
    expect(name.innerHTML).toBe('CheckData');
    const params = container.querySelectorAll('.description-main > div');
    expect(params[0].innerHTML).toBe(`Base Exp: ${data.base_experience}`);
    expect(params[1].innerHTML).toBe(`Weight: ${data.weight}`);
    expect(params[2].innerHTML).toBe(`Height: ${data.height}`);
  }, {timeout: 10000});
}, {timeout: 10000});

test('Detail close', async () => {
  window.history.pushState({}, '', '/bulbasaur/1?page=0&count=5&detail=1');
  const currentHref = window.location.href;
  const { container } = render(<App />);

  await waitFor(() => {
    const loading = container.querySelector('.description-main > .loader-progress');
    expect(loading).toBe(null);
    const closeButton = container.querySelector('.close-description') as HTMLElement;
    fireEvent.click(closeButton);
    expect(currentHref).not.toBe(window.location.href);
  }, {timeout: 10000});
}, {timeout: 10000});

test('Pagination url change', async () => {
  window.history.pushState({}, '', '/');
  const { container } = render(<App />);
  let currentHref = window.location.href;

  await waitFor(() => {
    const card = container.querySelector('.card-pokemon') as HTMLElement;
    expect(card).not.toBe(null);
  }, {timeout: 10000});

  const last = container.querySelector('.button-pagination-next') as HTMLElement;
  fireEvent.click(last);
  expect(currentHref).not.toBe(window.location.href);
  currentHref = window.location.href;
  await waitFor(() => {
    const loader = container.querySelector('.loader-progress') as HTMLElement;
    expect(loader).toBe(null);
  }, {timeout: 10000});
  const first = container.querySelector('.button-pagination-back') as HTMLElement;
  fireEvent.click(first);
  expect(currentHref).not.toBe(window.location.href);
}, {timeout: 10000});

test('Save search value to local storage', () => {
  window.history.pushState({}, '', '/');
  const { container } = render(<App />);
  const search = 'testLocalstorage';

  const searchInput = container.querySelector('#search-input') as HTMLInputElement;
  const button = container.querySelector('.button-icon-search') as HTMLButtonElement;
  fireEvent.change(searchInput, {target: {value: search}});
  fireEvent.click(button);
  expect(search).toBe(localStorage.getItem('search'));
}, {timeout: 10000});

test('Check value after mount', () => {
  window.history.pushState({}, '', '/');
  const { container } = render(<App />);

  const searchInput = container.querySelector('#search-input') as HTMLInputElement;
  expect(searchInput.value).toBe(localStorage.getItem('search'));
}, {timeout: 10000});

test('404 page', () => {
  window.history.pushState({}, '', '/foo/bar/foo/bar');
  render(<App />);

  screen.getByText(/Not found/i);
  screen.getByText(/0100 0000 0100/i);
  screen.getByText(/Go to main/i);
}, {timeout: 10000});

test('Check error boudnary', () => {
  window.history.pushState({}, '', '/error');
  render(<App />);

  screen.getByText(/Unhandled exception/i);
}, {timeout: 10000});

test('Check navigate in 404', () => {
  window.history.pushState({}, '', '/foo/bar/foo/bar');
  const { container } = render(<App />);

  const button = container.querySelector('#button-back-not-found') as HTMLButtonElement;
  fireEvent.click(button);
  expect(window.location.pathname).toBe('/');
}, {timeout: 10000});

test('Pagination by num page',  async () => {
  window.history.pushState({}, '', '/pikachu');
  const { container } = render(<App />);

  await waitFor(() => {
    const button = container.querySelector('.pagination-item') as HTMLElement;
    expect(button).not.toBe(null);
  }, {timeout: 10000});
  const button = container.querySelector('.pagination-item') as HTMLElement;
  fireEvent.click(button);

  expect(window.location.search).not.toBe('');
}, {timeout: 10000});
