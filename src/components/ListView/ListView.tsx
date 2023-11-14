import { useContext } from 'react';
import { SearchContext } from '../../contexts';
import { Outlet, useNavigate } from 'react-router-dom';
import { CardItem, Loader, Pagination } from '..';
import './ListView.css';

export const ListView = () => {
  const navigate = useNavigate();
  const context = useContext(SearchContext);

  return (
    <>
      {context!.state.loading && <Loader />}
      <main className='main'>
        <div className='list-item'>
          {
            context!.state.items.length ? (
              context!.state.items.map((i) => {
                return <CardItem key={i.name + i.url} item={i} />
              })
            ) : (
              context!.state.loading === false && (
                <div className='not-found-wrapper'>
                  <span>Pokemons not found</span>
                  <button
                    className='button-not-found-main'
                    onClick={() => {navigate('/')}}
                  >
                    Go to main
                  </button>
                </div>
              )
            )
          }
          {
            context!.state.items.length !== 0 && context!.state.loading === false && (
              <Pagination />
            )
          }
        </div>
        <Outlet />
      </main>
    </>
  );
}
