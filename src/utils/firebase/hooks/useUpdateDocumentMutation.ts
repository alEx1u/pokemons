import { updateDocument } from "./../requests/updateDocument";
import { Collection } from "../firebase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface UseUpdateDocumentMutationUserProps {
  collection: Extract<Collection, "users">;
  data: Partial<UserDocument>;
  id: string;
}

interface UseUpdateDocumentMutationPokemonProps {
  collection: Extract<Collection, "pokemons">;
  data: Partial<PokemonDocument>;
  id: string;
}

type UseUpdateDocumentMutationProps =
  | UseUpdateDocumentMutationUserProps
  | UseUpdateDocumentMutationPokemonProps;

type UpdateResponse = Partial<PokemonDocument> | Partial<UserDocument>;

export const useUpdateDocumentMutation = (
  options?: UseMutationOptions<
    UpdateResponse,
    Error,
    UseUpdateDocumentMutationProps
  >
) =>
  useMutation({
    mutationKey: ["updateDocument"],
    mutationFn: async ({ collection, data, id }) =>
      updateDocument(collection, data, id),
    ...(options ?? {}),
  });
