import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contexts';
import './Header.css';

export const Header = () => {
  const navigation = useNavigate();
  const context = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchItemHandler = () => {
    localStorage.setItem('search', inputRef.current!.value);
    navigation(`/${String(inputRef.current!.value)}`);
  }

  return (
    <header className='header'>
      <h2>Pokemon</h2>
      <div className='text-field-container'>
        <span className='text-field'>
          <input
            ref={inputRef}
            defaultValue={context!.state.search}
            id='search-input'
            type='text'
            required
          />
          <label htmlFor='search-input'>Search</label>
        </span>
        <button
          className='button-icon-search'
          onClick={searchItemHandler}
        >
          <img src='/search-icon.svg' alt='search icon' />
        </button>
      </div>
    </header>
  );
}
