import { onSnapshot, Query } from 'firebase/firestore';
import { usePromise } from '../../helpers/usePromise';
import { useEffect } from 'react';

export const useCollection = <T>(query: Query<T>) => {
  const { data, setData, error, setError, isLoading, isError } = usePromise<T[]>();

  useEffect(() => {
    const unsub = onSnapshot(
      query,
      (querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        setData(data);
      },
      (error) => setError(error.message)
    );

    return () => unsub();
  }, [query, setData, setError]);

  return { data, isLoading, isError, error };
};
