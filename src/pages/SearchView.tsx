
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { set } from '../redux/SearchSlice';
import { Header, ListView } from '../components';
import { useGetPokemonQuery } from '../redux/pokemonApi';
import store from '../redux';

export const SearchView = () => {
  return (
    <Provider store={store}>
      <SearchViewWrapper />
    </Provider>
  );
}

const SearchViewWrapper = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const count = Number(new URLSearchParams(location.search).get('count')) || 5;
  const currentPage = Number(new URLSearchParams(location.search).get('page')) || 0;
  const detail = Number(new URLSearchParams(location.search).get('detail')) || 0;
  const search = params.search || '';
  const id = Number(params.id) || 0;

  const { data, isLoading } = useGetPokemonQuery({
    request: '/pokemon?limit=9999',
    search: search,
    currentPage: currentPage,
    count: count,
  });

  useEffect(() => {
    console.log(data?.count)
    dispatch(
      set({
        items: data?.results || [],
        loading: isLoading,
        itemsCount: data?.count,
      })
    );
  }, [data, isLoading])

  useEffect(() => {
    dispatch(
      set({
        currentPage: currentPage,
        count: count,
        id: id,
        detail: detail,
        request: search,
      })
    );
  }, [search, currentPage, count, id, detail])

  return (
    <>
      <Header />
      <ListView  />
    </>
  );
}
