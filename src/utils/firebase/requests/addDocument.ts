import {
  doc,
  DocumentData,
  setDoc,
  WithFieldValue,
  collection as col,
  addDoc,
} from 'firebase/firestore';
import { Collection, db } from '../firebase';

export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  collection: Collection,
  data: T,
  id?: string
) => {
  if (id) {
    const documentRef = doc(db, collection, id);
    await setDoc(documentRef, data);
    return data;
  }

  await addDoc(col(db, collection), data);
  return data;
};
