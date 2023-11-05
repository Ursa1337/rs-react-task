import { useState, useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import CardItem from "../cardItem/cardItem";
import Loader from "../loader/loader";
import Pagination from "../pagination/pagination";
import { ResultItem, SearchResult } from "../models/search.model";
import "./main.css";

interface StateType {
  loading: boolean;
  results: ResultItem[];
  itemsCount: number;
}

export default function Main() {
  const location = useLocation();
  const params = useParams();
  const [state, setState] = useState<StateType>({
    loading: false,
    results: [],
    itemsCount: 0,
  });

  const elPerPage = 9;
  const currentPage = Number(new URLSearchParams(location.search).get('page'));
  const countPage = Math.ceil(state.itemsCount / elPerPage);
  const search = params.search || "";

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    fetch("https://pokeapi.co/api/v2/pokemon?limit=9999")
      .then((response) => response.json())
      .then((response: SearchResult) => {
        const result = response.results.filter((v) => v.name.includes(search));
        setTimeout(() => {
          setState((prevState) => ({ 
            ...prevState,
            results: result.slice(
              elPerPage * currentPage, 
              elPerPage * (currentPage + 1)
            ),
            itemsCount: result.length,
            loading: false,
          }));
        }, 500);
      })
      .catch(() => setState((prevState) => ({ ...prevState, loading: true })));
  }, [params.search, currentPage]);

  return (
    <>
      {state.loading && <Loader />}
      <main className="main">
        <div className="list-item">
          {state.results.map((i) => {
            return <CardItem key={i.name + i.url} item={i} />
          })}
          {
            state.results.length !== 0 && (
              <Pagination search={search} countPage={countPage} />
            )
          }
        </div>
        <Outlet />
      </main>
    </>
  );
}
