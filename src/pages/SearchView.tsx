
import { useLocation, useParams } from 'react-router-dom';
import { Header, ListView } from '../components';
import { SearchResult } from '../models';
import { SearchProvider, SearchContext } from '../contexts';
import { useContext, useEffect } from 'react';

export const SearchView = () => {
  return (
    <SearchProvider>
      <SearchViewWrapper />
    </SearchProvider>
  );
}

const SearchViewWrapper = () => {
  const location = useLocation();
  const params = useParams();
  const context = useContext(SearchContext);

  const count = Number(new URLSearchParams(location.search).get('count')) || 5;
  const currentPage = Number(new URLSearchParams(location.search).get('page')) || 0;
  const detail = Number(new URLSearchParams(location.search).get('detail')) || 0;
  const search = params.search || localStorage.getItem('search') || '';
  const id = Number(params.id) || 0;

  useEffect(() => {
    context!.dispatch((prevState) => ({
      ...prevState,
      search: search,
      currentPage: currentPage,
      count: count,
      id: id,
      detail: detail,
    }));
  }, [search, currentPage, count, id, detail])

  useEffect(() => {
    context?.dispatch((prevState) => ({ ...prevState, loading: true }));
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9999')
      .then((response) => response.json())
      .then((response: SearchResult) => {
        const result = response.results.filter((v) => v.name.includes(search));
        setTimeout(() => {
          context?.dispatch((prevState) => ({
            ...prevState,
            items: result.slice(
              count * currentPage, 
              count * (currentPage + 1)
            ),
            itemsCount: result.length,
            loading: false,
          }));
        }, 500);
      });
  }, [search, currentPage, count]);


  return (
    <>
      <Header />
      <ListView  />
    </>
  );
}
