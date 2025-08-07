import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { logout } from '../requests/logout';

type LogoutResponse = Awaited<ReturnType<typeof logout>>;

export const useLogoutMutation = (options?: UseMutationOptions<LogoutResponse, Error>) =>
  useMutation({
    mutationKey: ['logoutMutation'],
    mutationFn: () => logout(),
    ...(options ?? {}),
  });
