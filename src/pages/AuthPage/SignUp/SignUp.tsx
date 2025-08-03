import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ROUTES } from "../../../utils/constants/routes";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";
import Button from "../../../common/buttons/Button/Button";
import { Input } from "../../../common/input/Input";
import { useRequestRegisterWithEmailAndPasswor } from "../../../utils/firebase/hooks/useRequestRegisterWithEmailAndPassword";
import { useAppDispatch } from '../../../utils/contexts/store/store';
import { sessionSlice } from '../../../utils/contexts/store/session.slice';

interface SignUpProps {
  inputStyles: string;
  errorStyles: string;
}

const registerSchema = z.object({
  firstName: z.string().min(3, "First name should be here"),
  lastName: z.string().min(3, "Last name should be here"),
  city: z.string().min(2, "Real city"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum value is 6"),
});

type FormType = z.infer<typeof registerSchema>;

export const SignUp = ({ inputStyles, errorStyles }: SignUpProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fireBaseError, setFireBaseError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const { mutate: registerWithEmailAndPasswordMutation, isPending: isLogging } =
    useRequestRegisterWithEmailAndPasswor({
      onSuccess: () => {
        dispatch(sessionSlice.actions.logginIn());
        navigate(ROUTES.POKEMONS);
      },
      onError: (error) => {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/email-already-in-use":
              setError("email", { message: "Email already in use" });
              break;
            case "auth/invalid-email":
              setError("email", { message: "Invalid email address" });
              break;
            case "auth/weak-password":
              setError("password", {
                message: "Password is too weak (min 6 characters)",
              });
              break;
            case "auth/operation-not-allowed":
              setFireBaseError("Email/password accounts are not enabled");
              break;
            case "auth/missing-password":
              setError("password", { message: "Password is required" });
              break;
            default:
              setFireBaseError("Unexpected error. Please try again.");
          }
        } else {
          setFireBaseError("An unknown error occurred.");
        }
      },
    });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const { firstName, lastName, email, password, city } = data as z.infer<
      typeof registerSchema
    >;
    registerWithEmailAndPasswordMutation({
      user: {
        email: email,
        displayName: `${firstName} ${lastName}`,
        pokemons: [],
        city: city
      },
      password,
    });
  };

  const loading = isLogging || isSubmitting;

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={inputStyles}
          {...register("firstName")}
          placeholder="firstname"
        />
        {errors.firstName && (
          <p className={errorStyles}>{errors.firstName.message}</p>
        )}
        <Input
          className={inputStyles}
          {...register("lastName")}
          placeholder="lastname"
        />
        {errors.lastName && (
          <p className={errorStyles}>{errors.lastName.message}</p>
        )}
        <Input
          className={inputStyles}
          {...register("city")}
          placeholder="city"
        />
        {errors.city && <p className={errorStyles}>{errors.city.message}</p>}
        <Input
          className={inputStyles}
          {...register("email")}
          placeholder="email"
        />
        {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
        <Input
          className={inputStyles}
          {...register("password")}
          type="password"
          placeholder="password"
        />
        {errors.password && (
          <p className={errorStyles}>{errors.password.message}</p>
        )}
        <Button children="Sign Up" theme="red" disabled={loading} />
      </form>
      {fireBaseError && <p className={errorStyles}>{fireBaseError}</p>}
    </>
  );
};
