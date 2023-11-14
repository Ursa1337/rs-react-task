import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PokemonDescription } from '../../models';
import { Loader } from '..';
import { SearchContext } from '../../contexts';
import './DetailBlock.css';

export const DetailBlock = () => {
  const context = useContext(SearchContext);
  const navigation = useNavigate();

  const [state, setState] = useState<PokemonDescription>();
  const [loaded, setLoadead] = useState<boolean>(false);

  const closePage = () => {
    navigation(`/${context!.state.search}?page=${context!.state.currentPage}&count=${context!.state.count}`);
  }

  useEffect(() => {
    if (context!.state.detail === 1) {
      setLoadead(false);
      fetch('https://pokeapi.co/api/v2/pokemon/' + context!.state.id)
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
  }, [context!.state.id, context!.state.detail]);

  return (
    <div
      className={
        `description-block ${context!.state.detail ? 'description-block-show' : ''}`
      }
    >
      {loaded ? (
        <div style={{'padding': 8}} className='description-main'>
          <h2>{ state!.name }</h2>
          <div>Base Exp: { state!.base_experience }</div>
          <div>Weight: { state!.weight }</div>
          <div>Height: { state!.height }</div>
          <button
            onClick={closePage}
            className='close-description'
          >
            Close
          </button>
        </div>
      ) : (
        <div className='description-main'>
          <Loader />
        </div>
      )}
    </div>
  )
}