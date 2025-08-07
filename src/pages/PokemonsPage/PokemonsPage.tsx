import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { baseQuery } from "../../api/requests/base";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Typography } from "../../common/typography/Typography";
import styles from "./PokemonsPage.module.scss";
import { PokeballLoader } from "../../common/loader/PokeballLoader";
import clsx from 'clsx';
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

  if (isFetching || !data) return <PokeballLoader />;
  if (error || !data.pages) return <div className={styles.wrong}>Ошибка</div>;

  const pokemons = data.pages.reduce(
    (pokemons: NamedAPIResource[], { data }) => [...pokemons, ...data.results],
    []
  );

  return (
    <>
      <Typography variant="title" className={styles.title}>
        Pokemon List
      </Typography>
      <div className={styles.pokemons}>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className={clsx('card',styles["pokemons__pokemon-item"])}
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
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default PokemonsPage;
