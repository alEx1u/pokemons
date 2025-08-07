import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw (error as Error).message;
  }
};
