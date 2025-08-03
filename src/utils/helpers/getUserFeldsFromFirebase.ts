import { User } from "firebase/auth";

export const getUserFeldsFromFirebase = (user: User) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoUrl: user.photoURL,
  phoneNumber: user.phoneNumber,
});
