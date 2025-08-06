import { useNavigate, useParams } from "react-router";
import { useRequestPokemonByName } from "../../api/hooks/useRequestPokemonByName";
import Button from "../../common/buttons/Button/Button";
import { useAuthState } from "../../utils/firebase/hooks/useAuthState";
import { useUpdateDocumentMutation } from "../../utils/firebase/hooks/useUpdateDocumentMutation";
import { CloseButton } from "../../common/buttons/CloseButton/CloseButton";
import styles from "./PokemonPage.module.scss";
import { Typography } from "../../common/typography/Typography";
import { PokeballLoader } from "../../common/loader/PokeballLoader";

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

  if (isLoading || !authState.data) return <PokeballLoader />;

  if (error || !data) {
    return <div className={styles.wrong}>Ошибка загрузки данных</div>;
  }

  const isShowAddButton =
    authState.data.pokemons.length < MAX_USER_POKEMONS &&
    !authState.data.pokemons.some((pokemon) => pokemon.name == pokemonName);

  const pokemon = data.data;

  const user = authState.data;

  return (
    <div className={styles.container}>
      <CloseButton onClick={() => navigate(-1)} />
      <div className={styles["pokemon-card"]}>
        <Typography variant="title">{pokemon.name}</Typography>
        <img src={pokemon.sprites.front_default || ""} alt="pokemon-img" />
        <div className={styles["pokemon-card__stats"]}>
          <ul>
            {pokemon.stats.map((stat) => {
              return (
                <li key={stat.stat.name}>
                  {stat.stat.name} : {stat.base_stat}
                </li>
              );
            })}
          </ul>
          <ul>
            {pokemon.abilities.map((ability) => {
              return <li key={ability.ability.name}>{ability.ability.name}</li>;
            })}
          </ul>
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
