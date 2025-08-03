import { UseQueryResult } from "@tanstack/react-query";
import PokemonCard from './PokemonCard';

type PokemonListProps = {
  pokemons: UseQueryResult<Pokemon, Error>[];
  selectedId: number;
  onSelect: (id: number) => void;
};

const PokemonList = ({ pokemons, selectedId, onSelect }: PokemonListProps) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mt-10 p-10">
        {pokemons.map((pokemon) => {
          if (!pokemon.data) return <div>Ошибка</div>;
          return (
            <PokemonCard
              key={pokemon.data.id}
              pokemon={pokemon}
              isActive={pokemon.data.id == selectedId}
              onClick={() => onSelect(pokemon.data.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
