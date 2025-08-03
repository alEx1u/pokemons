import { useNavigate, useParams } from "react-router";
import { useRequestPokemonByName } from "../../api/hooks/useRequestPokemonByName";
import Button from "../../common/buttons/Button/Button";
import { useAuthState } from "../../utils/firebase/hooks/useAuthState";
import { useUpdateDocumentMutation } from "../../utils/firebase/hooks/useUpdateDocumentMutation";
import { CloseButton } from "../../common/buttons/CloseButton/CloseButton";

const MAX_USER_POKEMONS = 6;

const PokemonPage = () => {
  const navigate = useNavigate();
  const { pokemonName } = useParams<Pokemon["name"]>();
  const { data, isLoading, error } = useRequestPokemonByName({
    name: pokemonName!,
  });

  const authState = useAuthState();

  const {
    mutate: updatePokemonMutataion,
    isPending: updatePokemonMutataionPending,
  } = useUpdateDocumentMutation();

  if (isLoading || !authState.data) {
    return <div className="text-center mt-[40vh]">Загрузка...</div>;
  }

  if (error || !data) {
    return <div className="text-center mt-[40vh]">Ошибка загрузки данных</div>;
  }

  const isShowAddButton =
    authState.data.pokemons.length < MAX_USER_POKEMONS &&
    !authState.data.pokemons.some((pokemon) => pokemon.name == pokemonName);

  const pokemon = data.data;

  const user = authState.data;

  return (
    <div className="flex flex-col items-center mt-5">
      <CloseButton onClick={() => navigate(-1)} />
      <div className="flex gap-5 m-4 justify-center">
        <div className="border rounded-3xl flex flex-col justify-between items-center h-120 w-90 p-10">
          <div className="card_title">
            <h2 className="text-3xl text-transform capitalize">
              {pokemon.name}
            </h2>
          </div>
          <div className="card_img">
            <img
              className="w-50"
              src={pokemon.sprites.front_default || ""}
              alt="pokemon-img"
            />
          </div>
          <div className="flex justify-between">
            <ul className="text-start">
              {pokemon.stats.map((stat) => {
                return (
                  <li className="underline" key={stat.stat.name}>
                    {stat.stat.name} : {stat.base_stat}
                  </li>
                );
              })}
            </ul>
            <ul className="text-start">
              {pokemon.abilities.map((ability) => {
                return (
                  <li className="underline" key={ability.ability.name}>
                    {ability.ability.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {isShowAddButton && (
        <Button
          disabled={updatePokemonMutataionPending}
          theme="red"
          children="ADD To Team"
          onClick={() =>
            updatePokemonMutataion({
              collection: "users",
              data: {
                pokemons: [
                  ...user.pokemons,
                  {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default,
                  },
                ],
              },
              id: user.uid!,
            })
          }
        />
      )}
    </div>
  );
};

export default PokemonPage;
