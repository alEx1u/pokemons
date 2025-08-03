import { PokemonShortCut } from "../../common/pokemon/PokemonShortCut";
import { useAuthState } from "../../utils/firebase/hooks/useAuthState";
import { useLogoutMutation } from "../../utils/firebase/hooks/useLogoutMutation";
import { useNavigate } from "react-router";
import { ROUTES } from "../../utils/constants/routes";
import Button from "../../common/buttons/Button/Button";
import { CloseButton } from "../../common/buttons/CloseButton/CloseButton";
import { useUpdateDocumentMutation } from "../../utils/firebase/hooks/useUpdateDocumentMutation";
import { Typography } from "../../common/typography/Typography";
import { UserCard } from "../../common/cards/UserCard/UserCard";
import { useAppDispatch } from '../../utils/contexts/store/store';
import { sessionSlice } from '../../utils/contexts/store/session.slice';

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

  if (!authState.data)
    return (
      <>
        <p>Войдите в аккаунт</p>
        <Button
          children="Авторизация"
          theme="red"
          onClick={() => navigate(ROUTES.AUTH)}
        />
      </>
    );

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
      <div className="card flex flex-col gap-4 items-center">
        <Typography variant="title-regular">
          Ваша команда: {user.pokemons?.length}
        </Typography>
        <div className="flex flex-col gap-3 mb-2">
          {user.pokemons?.map((teamMember) => (
            <div className="flex items-center gap-5" key={teamMember.id}>
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
      <div className="pt-4 flex justify-center">
        <Button
          children={logoutMutationPending ? "Logging out..." : "Logout"}
          theme="blue"
          disabled={logoutMutationPending}
          onClick={() => {
            logoutMutation();
          }}
        />
      </div>
    </div>
  );
};
