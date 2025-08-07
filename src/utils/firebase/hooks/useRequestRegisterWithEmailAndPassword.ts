import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { registerWithEmailAndPasswor } from '../requests/registerWithEmailAndPassword';

interface RegisterPayload {
  user: User & { email: string };
  password: string;
}

type RegisterResponse = Awaited<ReturnType<typeof registerWithEmailAndPasswor>>;

export const useRequestRegisterWithEmailAndPasswor = (
  options?: UseMutationOptions<RegisterResponse, Error, RegisterPayload>
) => {
  return useMutation({
    mutationKey: ['loginWithEmailAndPassword'],
    mutationFn: async ({ user, password }) =>
      registerWithEmailAndPasswor({ user, password, city: user.city }),
    ...(options ?? {}),
  });
};
