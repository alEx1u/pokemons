import { PokemonShortCut } from "../../common/pokemon/PokemonShortCut/PokemonShortCut";
import { useAuthState } from "../../utils/firebase/hooks/useAuthState";
import { useLogoutMutation } from "../../utils/firebase/hooks/useLogoutMutation";
import { useNavigate } from "react-router";
import { ROUTES } from "../../utils/constants/routes";
import Button from "../../common/buttons/Button/Button";
import { CloseButton } from "../../common/buttons/CloseButton/CloseButton";
import { useUpdateDocumentMutation } from "../../utils/firebase/hooks/useUpdateDocumentMutation";
import { Typography } from "../../common/typography/Typography";
import { UserCard } from "../../common/cards/UserCard/UserCard";
import { useAppDispatch } from "../../utils/contexts/store/store";
import { sessionSlice } from "../../utils/contexts/store/session.slice";
import styles from "./ProfilePage.module.scss";
import clsx from "clsx";
import { PokeballLoader } from "../../common/loader/PokeballLoader";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAuthState();
  const { mutate: logoutMutation, isPending: logoutMutationPending } =
    useLogoutMutation({
      onSuccess: () => {
        dispatch(sessionSlice.actions.logOut());
        navigate(ROUTES.POKEMONS);
      },
    });

  const { mutate: deletePokemon } = useUpdateDocumentMutation();

  if (!authState.data) return <PokeballLoader />;

  const user = authState.data;

  const pokemonFilter = (pokemonName: string) => {
    const currentPokemons = user.pokemons;
    const updatedPokemons = currentPokemons.filter(
      (pokemon) => pokemon.name !== pokemonName
    );
    return updatedPokemons;
  };

  return (
    <div className="page">
      <UserCard user={user} />
      <div className={clsx("card", styles["pokemons-team__wrapper"])}>
        <Typography variant="title-regular">
          Ваша команда: {user.pokemons?.length}
        </Typography>
        <div className={styles["pokemons-team"]}>
          {user.pokemons?.map((teamMember) => (
            <div className={styles["pokemons-team__item"]} key={teamMember.id}>
              <PokemonShortCut
                name={teamMember.name}
                onClick={() => navigate(`/pokemon/${teamMember.name}`)}
                key={teamMember.name}
              />
              <CloseButton
                onClick={() =>
                  deletePokemon({
                    collection: "users",
                    data: {
                      pokemons: pokemonFilter(teamMember.name),
                    },
                    id: user.uid!,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.logout}>
        <Button
          children={logoutMutationPending ? "Logging out..." : "Logout"}
          theme="red"
          disabled={logoutMutationPending}
          onClick={() => {
            logoutMutation();
          }}
        />
      </div>
    </div>
  );
};
