import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ROUTES } from '../../../utils/constants/routes';
import { useRequestloginWithEmailAndPassword } from '../../../utils/firebase/hooks/useRequestloginWithEmailAndPassword';
import { useNavigate } from 'react-router';
import { FirebaseError } from 'firebase/app';
import Button from '../../../common/buttons/Button/Button';
import { Input } from '../../../common/input/Input';
import { useAppDispatch } from '../../../utils/contexts/store/store';
import { sessionSlice } from '../../../utils/contexts/store/session.slice';
import styles from '../Auth.module.scss';
import clsx from 'clsx';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum value is 6'),
});

type FormType = z.infer<typeof loginSchema>;

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fireBaseError, setFireBaseError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginWithEmailAndPasswordMutation, isPending: isLogging } =
    useRequestloginWithEmailAndPassword({
      onSuccess: () => {
        dispatch(sessionSlice.actions.logginIn());
        navigate(ROUTES.POKEMONS);
      },
      onError: (error) => {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/user-not-found':
              setError('email', { message: 'User not found' });
              break;
            case 'auth/wrong-password':
              setError('password', { message: 'Wrong password' });
              break;
            case 'auth/invalid-email':
              setError('email', { message: 'Invalid email' });
              break;
            default:
              setFireBaseError('Unexpected error. Try again.');
          }
        }
      },
    });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const { email, password } = data as z.infer<typeof loginSchema>;
    loginWithEmailAndPasswordMutation({ email, password });
  };

  const loading = isLogging || isSubmitting;

  return (
    <>
      <form className={styles['auth__form']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={clsx(styles.input, {
            [styles['input--error']]: errors.email,
          })}
          {...register('email')}
          placeholder="email"
          error={errors.email?.message}
        />
        <Input
          className={clsx(styles.input, {
            [styles['input--error']]: errors.password,
          })}
          {...register('password')}
          type="password"
          placeholder="password"
          error={errors.password?.message}
        />
        <Button
          style={{ marginTop: 15 }}
          type="submit"
          children="Sign In"
          theme="red"
          disabled={loading}
        />
      </form>
      {fireBaseError && <p className={styles.error}>{fireBaseError}</p>}
    </>
  );
};
