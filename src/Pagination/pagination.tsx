import { useNavigate, Link } from "react-router-dom";
import "./pagination.css"

interface PropsType {
  search: string;
  countPage: number;
}

export default function Pagination(props: PropsType) {
  const countElPagination = 5;
  const navigate = useNavigate();
  const currentPage = Number(new URLSearchParams(location.search).get('page'));

  const getNavigationRange = () => {
    const spread = Math.floor(countElPagination / 2);
    const start = Math.max(currentPage - spread, 0);
    const end = Math.min(currentPage + spread, props.countPage);
    return new Array(Math.abs(end - start)).fill(null).map((_, i) => start + i)
  }
  return (
    <div className="button-pagination-wrapper">
      {
        currentPage !== 0 && (
          <button
          className="button-pagination-back"
          onClick={() => navigate(`/${props.search}?page=0`)}
        >
          &#8249;
        </button>
        )
      }
      {
        getNavigationRange().map((i) => {
          const link = `/${props.search}?page=${i}`;
          return (
            <Link
              key={"paginationButto" + i}
              className="pagination-item"
              to={link}
            >
              {i + 1}
            </Link>
          )
        })
      }
      {
        currentPage !== (props.countPage - 1) && (
          <button
            className="button-pagination-next"
            onClick={() => navigate(`/${props.search}?page=${props.countPage - 1}`)}
          >
            &#8250;
          </button>
        )
      }
    </div>
  )
}