import { useRequestPokemonByName } from "../../api/hooks/useRequestPokemonByName";

interface PokemonShortCutProps {
  name: Pokemon["name"];
  onClick: () => void;
}

export const PokemonShortCut = ({ name, onClick }: PokemonShortCutProps) => {
  const { data, isLoading } = useRequestPokemonByName({ name });

  const isPokemon = !!data && !isLoading;

  if (!isPokemon) return null;

  const pokemon = data.data;
  return (
    <div
      className="border border-red-400 hover:border-teal-400 hover:bg-teal-400 hover:text-white text-red-400 transition rounded-2xl flex items-center justify-between px-3 py-1 h-20 w-80"
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
