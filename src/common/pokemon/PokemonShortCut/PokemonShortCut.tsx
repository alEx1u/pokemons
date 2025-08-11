import { useNavigate } from 'react-router';
import { useRequestPokemonByName } from '../../../api/hooks/useRequestPokemonByName';
import { PokeballLoader } from '../../loader/PokeballLoader';
import styles from './PokemonShortCut.module.scss';
import { PokemonTypes } from '../PokemonTypes/PokemonTypes';
import { Typography } from '../../typography/Typography';

interface PokemonShortCutProps {
  name: Pokemon['name'];
}

export const PokemonShortCut = ({ name }: PokemonShortCutProps) => {
  const { data, isLoading } = useRequestPokemonByName({ name });
  const navigate = useNavigate();

  const isPokemon = !!data && !isLoading;

  if (!isPokemon) return <PokeballLoader />;

  const pokemon = data.data;
  return (
    <div
      className={styles['pokemon-shortcut']}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key == 'Enter') {
          navigate(`/pokemon/${pokemon.name}`);
        }
      }}
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
    >
      <img src={pokemon.sprites.front_default ?? ''} alt="pokemon img" className={styles.icon} />
      <Typography variant="sub-body">{pokemon.name}</Typography>
      <PokemonTypes types={pokemon.types} />
    </div>
  );
};
