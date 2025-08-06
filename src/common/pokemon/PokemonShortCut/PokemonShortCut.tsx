import { useRequestPokemonByName } from "../../../api/hooks/useRequestPokemonByName";
import { PokeballLoader } from '../../loader/PokeballLoader';
import styles from './PokemonShortCut.module.scss';

interface PokemonShortCutProps {
  name: Pokemon["name"];
  onClick: () => void;
}

export const PokemonShortCut = ({ name, onClick }: PokemonShortCutProps) => {
  const { data, isLoading } = useRequestPokemonByName({ name });

  const isPokemon = !!data && !isLoading;

  if (!isPokemon) return <PokeballLoader/>;

  const pokemon = data.data;
  return (
    <div
      className={styles['pokemon-shortcut']}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key == "Enter") {
          onClick();
        }
      }}
      onClick={() => onClick()}
    >
      <img src={pokemon.sprites.front_default ?? ""} alt="pokemon img" />
      <p>{pokemon.name}</p>
    </div>
  );
};
