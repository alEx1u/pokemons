import { UseQueryResult } from "@tanstack/react-query";

type PokemonCardProps = {
  pokemon: UseQueryResult<Pokemon, Error>;
  onClick?: () => void;
  isActive?: boolean;
};

const PokemonCard = ({ pokemon, onClick, isActive }: PokemonCardProps) => {
  if (!pokemon.data) return <div>Ошибка</div>;
  return (
    <div>
      <div
        className={`text-center border p-4 rounded cursor-pointer shadow-lg hover:scale-105 shadow-stone-400 transition ${isActive ? "bg-red-400" : "bg-stone-300"}`}
        onClick={onClick}
      >
        <h2>{pokemon.data.name}</h2>
        <img
          src={pokemon.data.sprites.front_default!}
          alt={pokemon.data.name}
          className="m-auto"
        />
      </div>
    </div>
  );
};

export default PokemonCard;
