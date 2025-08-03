import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "../requests/loginWithEmailAndPassword";

interface LoginPayload {
  email: string;
  password: string;
}

type LoginResponse = Awaited<ReturnType<typeof loginWithEmailAndPassword>>;

export const useRequestloginWithEmailAndPassword = (
  options?: UseMutationOptions<LoginResponse, Error, LoginPayload>
) => {
  return useMutation({
    mutationKey: ["loginWithEmailAndPassword"],
    mutationFn: async ({ email, password }) =>
      loginWithEmailAndPassword(email, password),
    ...(options ?? {}),
  });
};
