import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../common/buttons/Button/Button";
import { ROUTES } from "../../utils/constants/routes";
import { useLoginWithGoogle } from "../../utils/firebase/hooks/useLoginWithGoogle";
import { SignUp } from "./SignUp/SignUp";
import { SignIn } from "./SignIn/SignIn";
import { GoogleButton } from "../../common/buttons/GoogleButton/GoogleButton";
import { useAppDispatch } from '../../utils/contexts/store/store';
import { sessionSlice } from '../../utils/contexts/store/session.slice';

const Auth = () => {
  const [signinIn, setSigninIn] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: loginWithGoogle } = useLoginWithGoogle({
    onSuccess: () => {
      dispatch(sessionSlice.actions.logginIn())
      navigate(ROUTES.POKEMONS);
    },
  });

  const inputStyles =
    "border border-stone-500 rounded py-2 px-1 focus:outline-none focus:border-red-400 hover:border-stone-900 transition";
  const errorStyles = "text-red-700 text-sm mt-[-5px]";

  return (
    <div>
      {!signinIn ? (
        <div className="flex items-center justify-center flex-col h-[100vh] bg-stone-200 gap-1">
          <SignUp inputStyles={inputStyles} errorStyles={errorStyles} />
          <Button
            children="I already have an account"
            theme="blue"
            onClick={() => setSigninIn(true)}
          />
          <GoogleButton onClick={() => loginWithGoogle()} className="mt-10" />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col h-[100vh] bg-stone-200 gap-1">
          <SignIn inputStyles={inputStyles} errorStyles={errorStyles} />
          <Button
            children="Sign Up"
            theme="blue"
            onClick={() => setSigninIn(false)}
          ></Button>
          <GoogleButton onClick={() => loginWithGoogle()} className="mt-10" />
        </div>
      )}
    </div>
  );
};

export default Auth;
