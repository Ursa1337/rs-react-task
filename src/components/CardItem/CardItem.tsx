import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux';
import { ResultItem } from '../../models';
import './CardItem.css';
import { useGetPokemonByNameQuery } from '../../redux/pokemonApi';

interface PropsType {
  item: ResultItem;
}

export const CardItem = (props: PropsType) => {
  const navigate = useNavigate();
  const search = useSelector((state: RootState) => state.search);
  const { data } = useGetPokemonByNameQuery(props.item.name);

  const openRightBlock = () => {
    if (search.request) {
      navigate(`/${search.request}/${data?.id}?page=${search.currentPage}&count=${search.count}&detail=1`);
    }
    else {
      navigate(`/${props.item.name}/${data?.id}?page=${search.currentPage}&count=${search.count}&detail=1`);
    }
  }

  const getImage = () => {
    return data?.sprites.other['official-artwork'].front_default;
  }

  return (
    <div
      className='card-pokemon'
      key={props.item.name + props.item.url}
      onClick={openRightBlock}
    >
      <img src={getImage()} alt={props.item.name} />
      <div>
        <span className='pokemon-name'>{props.item.name}</span>
        <div className='pokemon-stats'>
          {data?.stats.map((i) => {
            return (
              <span key={i.stat.url}>
                {i.stat.name}: {i.base_stat}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
