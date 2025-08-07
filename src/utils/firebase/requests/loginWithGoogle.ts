import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { checkDocumentExist } from './checkDocumentExist';
import { addDocument } from './addDocument';
import { getUserFeldsFromFirebase } from '../../helpers/getUserFeldsFromFirebase';

export const loginWithGoogle = async () => {
  const response = await signInWithPopup(auth, googleProvider);
  const userExist = await checkDocumentExist('users', response.user.uid);

  if (!userExist) {
    await addDocument<User>(
      'users',
      { ...getUserFeldsFromFirebase(response.user), pokemons: [], city: '' },
      response.user.uid
    );
  }

  return response;
};
