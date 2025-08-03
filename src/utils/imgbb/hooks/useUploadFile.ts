import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { uploadFile } from "./../requests/uploadFile";
import { Collection } from "../../firebase/firebase";

interface UseUploadFileProps {
  collection: Collection;
  file: File;
  id: string;
}

type UploadfileResult = Awaited<ReturnType<typeof uploadFile>>;

export const useUploadFile = (
  options?: UseMutationOptions<UploadfileResult, Error, UseUploadFileProps>
) =>
  useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: ({ collection, file, id }) =>
      uploadFile({ collection, file, id }),
    ...(options ?? {}),
  });
