import { PokemonType } from './PokemonType/PokemonType';
import styles from './PokemonTypes.module.scss';

export const PokemonTypes = ({ types }: { types: PokemonType[] }) => (
  <div className={styles.types}>
    {types.map((type) => (
      <PokemonType type={type} key={type.type.name} />
    ))}
  </div>
);
