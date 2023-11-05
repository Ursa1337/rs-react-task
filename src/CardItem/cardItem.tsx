import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ResultItem } from "../models/search.model";
import { PokemonDescription, StatType } from "../models/pokemon.model";
import "./cardItem.css";

interface PropsType {
  item: ResultItem;
}

interface StateType {
  id: number;
  img: string;
  stats: StatType[];
}

export default function CardItem(props: PropsType) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = Number(new URLSearchParams(location.search).get('page')); 

  const [state, setState] = useState<StateType>({
    id: 0,
    img: "",
    stats: [],
  });

  useEffect(() => {
    fetch(props.item.url)
    .then((response) => response.json())
    .then((response: PokemonDescription) => {
      setState((prevState) => ({
        ...prevState,
        id: response.id,
        img: response.sprites.other["official-artwork"].front_default,
        stats: response.stats,
      }));
    });
  }, [props.item.url]);

  const openRightBlock = () => {
    navigate(`/${params.search}/${state.id}?page=${currentPage}&detail=1`);
  }

  return (
    <div
      className="card-pokemon"
      key={props.item.name + props.item.url}
      onClick={openRightBlock}
    >
      <img src={state.img} alt={props.item.name} />
      <div>
        <span>{props.item.name}</span>
        <div className="pokemon-stats">
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
