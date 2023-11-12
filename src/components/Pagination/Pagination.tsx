import { useContext } from 'react';
import { SearchContext } from '../../contexts';
import { useNavigate, Link } from 'react-router-dom';
import './Pagination.css'

export const Pagination = () => {
  const navigate = useNavigate();
  const context = useContext(SearchContext);

  const countPage = Math.ceil(context.itemsCount / context.count);

  const getNavigationRange = () => {
    const spread = Math.floor(context.count / 2);
    const start = Math.max(context.currentPage - spread, 0);
    const end = Math.min(context.currentPage + spread, countPage);
    return new Array(Math.abs(end - start)).fill(null).map((_, i) => start + i)
  }

  const getPageLink = (page: number, count: number) => {
    return `/${context.search}?page=${page}&count=${count}`;
  }

  const setCount = (count: number) => {
    navigate(getPageLink(0, count));
  }

  const setPage = (page: number) => {
    navigate(getPageLink(page, context.count));
  }

  return (
    <div className='button-pagination-wrapper'>
      <div className='pagination-wrapper'>
        {
          context.currentPage !== 0 && (
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
                key={'paginationButto' + i}
                className='pagination-item'
                to={getPageLink(i, context.count)}
              >
                {i + 1}
              </Link>
            )
          })
        }
        {
          context.currentPage !== (countPage - 1) && (
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