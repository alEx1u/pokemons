import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { addDocument } from "./addDocument";
import { updateDocument } from './updateDocument';

interface RegisterWithEmailAndPasswordProps {
  user: User & { email: string };
  password: string;
  city : string;
}

export const registerWithEmailAndPasswor = async ({ user, password, city } : RegisterWithEmailAndPasswordProps) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      password
    );
    if (user.displayName)
      await updateProfile(userCredential.user, {
        displayName: user.displayName,
      });

    await addDocument(
      "users",
      { ...user, uid: userCredential.user.uid, pokemons: [] },
      userCredential.user.uid
    );

    await updateDocument<{ city : string }>('users', { city }, userCredential.user.uid);

    return { ...userCredential, ...user, pokemons: [] };
  } catch (error) {
    throw (error as Error).message;
  }
};
