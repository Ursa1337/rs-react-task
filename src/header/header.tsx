import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./header.css";

export default function Header() {
  const navigation = useNavigate();
  const params = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchItemHandler = () => {
    navigation(`/${inputRef.current!.value}`);
  }

  return (
    <header className="header">
      <h2>Pokemon</h2>
      <div className="text-field-container">
        <span className="text-field">
          <input
            ref={inputRef}
            defaultValue={params.search}
            id="search-input"
            type="text"
            required
          />
          <label htmlFor="search-input">Search</label>
        </span>
        <button
          className="button-icon-search"
          onClick={searchItemHandler}
        >
          <img src="/search-icon.svg" alt="search icon" />
        </button>
      </div>
    </header>
  );
}
