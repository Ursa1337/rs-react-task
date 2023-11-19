import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../redux';
import './Pagination.css'

export const Pagination = () => {
  const navigate = useNavigate();
  const search = useSelector((state: RootState) => state.search);

  const countPage = Math.ceil(search.itemsCount / search.count);

  const getNavigationRange = () => {
    const spread = Math.floor(5 / 2);
    const start = Math.max(search.currentPage - spread, 0);
    const end = Math.min(search.currentPage + spread, countPage);
    return new Array(Math.abs(end - start)).fill(null).map((_, i) => start + i)
  }

  const getPageLink = (page: number, count: number) => {
    return `/${search.request}?page=${page}&count=${count}`;
  }

  const setCount = (count: number) => {
    navigate(getPageLink(0, count));
  }

  const setPage = (page: number) => {
    navigate(getPageLink(page, search.count));
  }

  return (
    <div className='button-pagination-wrapper'>
      <div className='pagination-wrapper'>
        {
          search.currentPage !== 0 && (
            <button
              className='button-pagination-back'
              onClick={() => setPage(0)}
            >
              &#8249;
            </button>
          )
        }
        {
          getNavigationRange().map((i) => {
            return (
              <Link
                key={'paginationButton' + i}
                className='pagination-item'
                to={getPageLink(i, search.count)}
              >
                {i + 1}
              </Link>
            )
          })
        }
        {
          search.currentPage !== (countPage - 1) && (
            <button
              className='button-pagination-next'
              onClick={() => setPage(countPage - 1)}
            >
              &#8250;
            </button>
          )
        }
      </div>
      <div className='pagination-count'>
        <button 
          style={{'width': 32}} 
          className='button-pagination-set'
          onClick={() => setCount(5)}
        >
          5
        </button>
        <button 
          style={{'width': 32}}
          className='button-pagination-set'
          onClick={() => setCount(10)}
        >
          10
        </button>
        <button 
          style={{'width': 32}} 
          className='button-pagination-set'
          onClick={() => setCount(15)}
        >
          15
        </button>
      </div>
    </div>
  )
}