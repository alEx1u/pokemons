import { doc, getDoc } from 'firebase/firestore';
import { Collection, db } from '../firebase';

export const checkDocumentExist = async (collection: Collection, id: string) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return true;
  return false;
};
