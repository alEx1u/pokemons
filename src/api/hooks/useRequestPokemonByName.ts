import { useQuery } from '@tanstack/react-query';
import { requestPokemonByName } from '../requests/pokemon';


interface UseRequestPokemonByNameProps {
  name : Pokemon['name'];
}

export const useRequestPokemonByName = ({ name } : UseRequestPokemonByNameProps) => 
  useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => requestPokemonByName({ params: { name } })
  })


// import { useRequestPokemonByName } from './useRequestPokemonByName';
// import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
// import { requestPokemonByName } from '../requests/pokemon';
// import { baseQuery } from '../requests/base';



// type UsePokemonDataProps = {
//   limit: number;
//   offset: number;
// };

// type PagesSwitchType = {
//   next: string | null;
//   prev: string | null;
// };

// type usePokemonData = {
//   isLoading: boolean;
//   isFetching: boolean;
//   error: Error | null;
//   pokemonQueries: UseQueryResult<Pokemon, Error>[];
//   selectedPokemonId: number;
//   setSelectedPokemonId: React.Dispatch<React.SetStateAction<number>>;
//   pagesSwitch: PagesSwitchType;
// };

// export const useRequestPokemonByName = (
//   { limit, offset }: UsePokemonDataProps = { limit: 10, offset: 0 }
// ): usePokemonData => {
//   const [pokemonNames, setPokemonNames] = useState<string[]>([]);
//   const [selectedPokemonId, setSelectedPokemonId] = useState<number>(1);
//   const [pagesSwitch, setPagesSwitch] = useState<PagesSwitchType>({
//     next: null,
//     prev: null,
//   });


//   const pokemonQueries = useQueries({
//     queries: pokemonNames.map((name) => ({
//       queryKey: ["pokemon", name],
//       queryFn: () => requestPokemonByName({ params: { name } }),
//       enabled: !!name,
//     })),
//   });

//   useEffect(() => {
//     if (data?.results) {
//       const names = data.results.map((el: { name: string }) => el.name);
//       setPagesSwitch({ next: data.next, prev: data.previous });
//       setPokemonNames(names);
//       setSelectedPokemonId((prev) => (prev > names.length ? 1 : prev));
//     }
//   }, [data]);

//   return {
//     isLoading,
//     isFetching,
//     error,
//     pokemonQueries,
//     selectedPokemonId,
//     setSelectedPokemonId,
//     pagesSwitch,
//   };
// };