import clsx from 'clsx';
import styles from '../PokemonTypes.module.scss';
import { Typography } from '../../../typography/Typography';

export const PokemonType = ({ type }: { type: PokemonType }) => (
  <div className={clsx(styles.type, styles[`${type.type.name}`])}>
    <Typography variant="sub-body">{type.type.name}</Typography>
  </div>
);
