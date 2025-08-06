import { ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../common/buttons/Button/Button";
import { ROUTES } from "../../utils/constants/routes";
import { useLoginWithGoogle } from "../../utils/firebase/hooks/useLoginWithGoogle";
import { SignUp } from "./SignUp/SignUp";
import { SignIn } from "./SignIn/SignIn";
import { GoogleButton } from "../../common/buttons/GoogleButton/GoogleButton";
import { useAppDispatch } from "../../utils/contexts/store/store";
import { sessionSlice } from "../../utils/contexts/store/session.slice";
import styles from "./Auth.module.scss";
import pokeForm from "../../assets/pokeform.png";

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.auth}>{children}</div>
);

const Auth = () => {
  const [signinIn, setSigninIn] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: loginWithGoogle } = useLoginWithGoogle({
    onSuccess: () => {
      dispatch(sessionSlice.actions.logginIn());
      navigate(ROUTES.POKEMONS);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["card__img-wrapper"]}>
          <img src={pokeForm} alt="pokemons" />
        </div>
        <AuthLayout>
          {signinIn ? <SignIn /> : <SignUp />}
          <Button
            theme="blue"
            onClick={() => setSigninIn(!signinIn)}
            children={signinIn ? "Sign Up" : "I already have an account"}
          />
          <GoogleButton onClick={() => loginWithGoogle()} />
        </AuthLayout>
      </div>
    </div>
  );
};

export default Auth;
