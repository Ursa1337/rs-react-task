import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux';
import { Loader } from '..';
import './DetailBlock.css';
import { useGetPokemonByNameQuery } from '../../redux/pokemonApi';

export const DetailBlock = () => {
  const search = useSelector((state: RootState) => state.search);
  const { data, isLoading } = useGetPokemonByNameQuery(String(search.id));
  const navigation = useNavigate();

  const closePage = () => {
    navigation(`/${search.request}?page=${search.currentPage}&count=${search.count}`);
  }

  return (
    <div
      className={
        `description-block ${search.detail ? 'description-block-show' : ''}`
      }
    >
      {!isLoading ? (
        <div style={{'padding': 8}} className='description-main'>
          <h2>{ data?.name }</h2>
          <div>Base Exp: { data?.base_experience }</div>
          <div>Weight: { data?.weight }</div>
          <div>Height: { data?.height }</div>
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