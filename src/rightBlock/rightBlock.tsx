import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/loader";
import "./rightBlock.css";
import { useEffect, useState } from "react";
import { PokemonDescription } from "../models/pokemon.model";

export default function RightBlock() {
  const navigation = useNavigate();
  const location = useLocation();
  const params = useParams();
  const detail = Number(new URLSearchParams(location.search).get('detail'));
  const currentPage = Number(new URLSearchParams(location.search).get('page')); 
  const id = params.id;

  const [state, setState] = useState<PokemonDescription>();
  const [loaded, setLoadead] = useState<boolean>(false);

  const closePage = () => {
    navigation(`${location.pathname}?page=${currentPage}`);
  }

  useEffect(() => {
    if (detail === 1) {
      setLoadead(false);
      fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then((response) => response.json())
        .then((response: PokemonDescription) => {
          setTimeout(() => {
            setState({
              id: response.id,
              name: response.name,
              base_experience: response.base_experience,
              weight: response.weight,
              height: response.height,
              sprites: response.sprites,
              stats: response.stats,
            });
            setLoadead(true);
          }, 500);
        })
        .catch(() => {
          setTimeout(closePage, 500);
        })
    }
  }, [id, detail]);

  return (
    <div
      className={`description-block ${detail ? "description-block-show" : ""}`}
    >
      {loaded ? (
        <div style={{"padding": 8}} className="description-main">
          <h2>{ state!.name }</h2>
          <div>Base Exp: { state!.base_experience }</div>
          <div>Weight: { state!.weight }</div>
          <div>Height: { state!.height }</div>
          <div>Base Exp: { state!.base_experience }</div>
          <button
            onClick={closePage}
            className="close-description"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="description-main">
          <Loader />
        </div>
      )}
    </div>
  )
}