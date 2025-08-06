import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Navbar from "./common/header/Navbar";
import PokemonsPage from "./pages/PokemonsPage/PokemonsPage";
import "./assets/styles/global.scss";
import { ROUTES } from "./utils/constants/routes";
import PokemonPage from "./pages/PokemonPage/PokemonPage";
import Auth from "./pages/AuthPage/Auth";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "./utils/firebase/hooks/useAuthState";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";
import { UsersPage } from "./pages/UsersPage/UsersPage";
import { useAppDispatch } from "./utils/contexts/store/store";
import { useEffect } from "react";
import { sessionSlice } from "./utils/contexts/store/session.slice";
import { PokeballLoader } from "./common/loader/PokeballLoader";

const AuthApp = () => {
  return (
    <Routes>
      <Route path={ROUTES.AUTH} element={<Auth />} />
      <Route path="*" element={<Navigate to={ROUTES.AUTH} />} />
    </Routes>
  );
};

export default function App() {
  const authState = useAuthState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authState.isLoading && authState.data) {
      sessionSlice.actions.logginIn();
    }
  }, [authState.isLoading, authState.data, dispatch]);

  if (authState.isLoading) return <PokeballLoader />;

  return (
    <BrowserRouter>
      <Navbar />
      {!authState.data?.uid ? (
        <AuthApp />
      ) : (
        <Routes>
          <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
          <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTES.USERS} element={<UsersPage />} />
          <Route path="*" element={<Navigate to={ROUTES.POKEMONS} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
