import { useEffect } from 'react';
import { usePromise } from '../../helpers/usePromise'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';


export const useAuthState = () => {
  const { isLoading, setIsLoading, isError, setError, error, setData, data } = usePromise<User | null>();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setData(null);
        return setIsLoading(false);
      };
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const unsub = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot.empty) return setIsLoading(false);
          const data: User[] = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data() as User);
          });


          setData(data[0]);
          setIsLoading(false);
        },
        (error) => setError(error.message)
      );

      return () => unsub();
    });

    return () => {
      listener();
    };
  }, [setData, setError, setIsLoading]);

  return { data, isLoading, isError, error };
};