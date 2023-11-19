import { RootState } from '../../redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { CardItem, Loader, Pagination } from '..';
import './ListView.css';
import { useSelector } from 'react-redux';

export const ListView = () => {
  const search = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();

  return (
    <>
      {search.loading && <Loader />}
      <main className='main'>
        <div className='list-item'>
          {
            search.items.length ? (
              search.items.map((i) => {
                return <CardItem key={i.name + i.url} item={i} />
              })
            ) : (
              search.loading === false && (
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
            search.items.length !== 0 && search.loading === false && (
              <Pagination />
            )
          }
        </div>
        <Outlet />
      </main>
    </>
  );
}
