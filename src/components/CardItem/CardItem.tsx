import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonDescription, StatType } from '../../models/pokemon.model';
import { ResultItem } from '../../models';
import { SearchContext } from '../../contexts';
import './CardItem.css';

interface PropsType {
  item: ResultItem;
}

interface StateType {
  id: number;
  img: string;
  stats: StatType[];
}

export const CardItem = (props: PropsType) => {
  const context = useContext(SearchContext);
  const navigate = useNavigate();

  const [state, setState] = useState<StateType>({
    id: 0,
    img: '',
    stats: [],
  });

  useEffect(() => {
    fetch(props.item.url)
    .then((response) => response.json())
    .then((response: PokemonDescription) => {
      setState((prevState) => ({
        ...prevState,
        id: response.id,
        img: response.sprites.other['official-artwork'].front_default,
        stats: response.stats,
      }));
    });
  }, [props.item.url]);

  const openRightBlock = () => {
    if (context!.state.search) {
      navigate(`/${context!.state.search}/${state.id}?page=${context!.state.currentPage}&count=${context!.state.count}&detail=1`);
    }
    else {
      navigate(`/${props.item.name}/${state.id}?page=${context!.state.currentPage}&count=${context!.state.count}&detail=1`);
    }
  }

  return (
    <div
      className='card-pokemon'
      key={props.item.name + props.item.url}
      onClick={openRightBlock}
    >
      <img src={state.img} alt={props.item.name} />
      <div>
        <span className='pokemon-name'>{props.item.name}</span>
        <div className='pokemon-stats'>
          {state.stats.map((i) => {
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
