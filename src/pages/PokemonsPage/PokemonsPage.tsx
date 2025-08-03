import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { baseQuery } from "../../api/requests/base";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Typography } from "../../common/typography/Typography";

const PokemonsPage = () => {
  const limit = 50;
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: ({ pageParam }) =>
        baseQuery({ params: { limit, offset: pageParam } }),
      initialPageParam: 0,
      getNextPageParam: (lastPokemonsData, allPokemonsData) => {
        const pokemonsCount = allPokemonsData.length * limit;

        const hasNextPage = pokemonsCount < lastPokemonsData.data.count;
        if (hasNextPage) return pokemonsCount;
      },
    });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isFetching || !data) {
    return <div className="text-center mt-[40vh]">Загрузка...</div>;
  }
  if (error || !data.pages)
    return <div className="text-center mt-[40vh]">Ошибка</div>;

  const pokemons = data.pages.reduce(
    (pokemons: NamedAPIResource[], { data }) => [...pokemons, ...data.results],
    []
  );

  return (
    <>
      <Typography variant="title" className="text-center mt-5">
        Pokemon List
      </Typography>
      <div className="page flex flex-wrap gap-5 mt-5 items-center justify-center">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="border rounded p-3 shadow-md hover:shadow-2xl w-[25vw] text-center"
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            role="button"
            tabIndex={0}
            aria-label="Открыть покемона"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                navigate(`/pokemon/${pokemon.name}`);
              }
            }}
          >
            <Typography variant="body">{pokemon.name}</Typography>
          </div>
        ))}
        <div className="h-[1px]" ref={ref}></div>
      </div>
    </>
  );
};

export default PokemonsPage;

// const buttonStyles =
//   "border rounded p-1.5 hover:bg-red-300 transition-colors";
// const disabledStyles = "opacity-0 cursor-not-allowed";
