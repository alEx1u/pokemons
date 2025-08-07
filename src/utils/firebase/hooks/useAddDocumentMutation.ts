import { addDocument } from './../requests/addDocument';
import { Collection } from '../firebase';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UseAddDocumentMutationParams {
  collection: Collection;
  data: PokemonDocument;
  id?: string;
}

type AddDocumentResponse = Awaited<ReturnType<typeof addDocument>>;

export const useAddDocumentMutation = (
  options?: UseMutationOptions<AddDocumentResponse, Error, UseAddDocumentMutationParams>
) => {
  return useMutation({
    mutationKey: ['addDocumentMutation'],
    mutationFn: (params: UseAddDocumentMutationParams) =>
      addDocument(params.collection, params.data, params.id),
    ...(options ?? {}),
  });
};
