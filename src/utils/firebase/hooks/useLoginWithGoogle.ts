import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { loginWithGoogle } from "../requests/loginWithGoogle";
import { UserCredential } from "firebase/auth";

export const useLoginWithGoogle = (
  options?: UseMutationOptions<UserCredential, Error>
) =>
  useMutation({
    mutationKey: ["loginWithGoogle"],
    mutationFn: () => loginWithGoogle(),
    ...(options ?? {}),
  });
