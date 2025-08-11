import clsx from 'clsx';
import styles from '../PokemonTypes.module.scss';

export const PokemonType = ({ type }: { type: PokemonType }) => (
  <div className={clsx(styles.type, styles[`${type.type.name}`])}>{type.type.name}</div>
);
