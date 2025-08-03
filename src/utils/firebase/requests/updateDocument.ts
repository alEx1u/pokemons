import { doc, updateDoc } from "firebase/firestore";
import { Collection, db } from "../firebase";

export const updateDocument = async <T>(
  collection: Collection,
  data: T,
  id: string
): Promise<T> => {
  const docRef = doc(db, collection, id);
  await updateDoc(docRef, data!);
  return data as T;
};
