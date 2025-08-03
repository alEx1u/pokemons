import { useQueries } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useState, useMemo } from "react";
import { useRequestBase } from "../../api/hooks/useRequestBase";
import { requestPokemonByName } from "../../api/requests/pokemon";

const Pokedex = () => {
  const {
    data: baseData,
    isLoading: baseLoading,
    error: baseError,
  } = useRequestBase({ limit: 8, offset: 0 });
  const [selectedPokemonId, setSelectedPokemonId] = useState<Pokemon["id"]>(1);

  const queries = useMemo(() => {
    if (!baseData?.data.results) return [];
    return baseData.data.results.map((data) => ({
      queryKey: ["pokemon", data.name],
      queryFn: () => requestPokemonByName({ params: { name: data.name } }),
      enabled: !!data.name,
    }));
  }, [baseData]);

  const pokemonQueries = useQueries({ queries });

  const isPokemonLoading = pokemonQueries.some((query) => query.isLoading);
  const isPokemonError = pokemonQueries.some((query) => query.isError);
  const isPokemonSuccess = pokemonQueries.every((query) => query.isSuccess);

  if (baseLoading || isPokemonLoading) {
    return <div className="text-center mt-[40vh]">Загрузка...</div>;
  }

  if (baseError || isPokemonError) {
    return <div className="text-center mt-[40vh]">Ошибка загрузки данных</div>;
  }

  if (!isPokemonSuccess || pokemonQueries.length === 0) {
    return <div className="text-center mt-[40vh]">Покемоны не найдены</div>;
  }

  const pokemons = pokemonQueries.map((pokemon) => pokemon.data.data);

  return (
    <div className="flex gap-5 mt-10 justify-center">
      <div className="border rounded-3xl flex flex-col justify-between items-center h-120 w-90 p-10">
        <div className="card_title">
          <h2 className="text-3xl text-transform capitalize">
            {pokemons[selectedPokemonId - 1].name}
          </h2>
        </div>
        <div className="card_img">
          <img
            className="w-50"
            src={pokemons[selectedPokemonId - 1].sprites.front_default || ""}
            alt="pokemon-img"
          />
        </div>
        <div className="flex justify-between">
          <ul className="text-start">
            {pokemons[selectedPokemonId].stats.map((stat) => {
              return (
                <li className="underline">
                  {stat.stat.name} : {stat.base_stat}
                </li>
              );
            })}
          </ul>
          <ul className="text-start">
            {pokemons[selectedPokemonId].abilities.map((ability) => {
              return <li className="underline">{ability.ability.name}</li>;
            })}
          </ul>
        </div>
      </div>
      <ul className="flex flex-col gap-2 items-center">
        {pokemons.map((pokemon) => {
          const isActive = pokemon.id == selectedPokemonId;
          const classes = clsx(
            "flex",
            "gap-3",
            "p-2",
            "items-center",
            "rounded-l-4xl",
            "w-[200px]",
            "h-[60px]",
            {
              "bg-red-400 scale-110": isActive,
              "bg-stone-300 transition hover:scale-110 hover:bg-stone-400":
                !isActive,
            }
          );
          return (
            <li
              className={classes}
              key={pokemon.id}
              onClick={() => setSelectedPokemonId(pokemon.id)}
            >
              <img
                className="border w-[50px] rounded-full"
                src={pokemon.sprites.front_default || ""}
                alt="pokemon_img"
              />
              <p className="pokemon_name">{pokemon.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pokedex;
