import { collection, Query, query } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "./useCollection";

export const useUsersCollection = () => {
  const q = query(collection(db, "users")) as Query<UserDocument>;
  return useCollection<UserDocument>(q);
};
