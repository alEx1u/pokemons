import clsx from 'clsx';
import { sessionSlice } from "../../../utils/contexts/store/session.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/contexts/store/store";
import styles from './ThemeButton.module.scss';

export const ThemeButton = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  return (
    <button
        onClick={() => dispatch(sessionSlice.actions.switchTheme())}
        className={styles['pokeball-button']}
        aria-label='Switch a theme'
    >
        <div className={clsx(styles.pokeball, styles[`pokeball--${theme}`])}></div>
    </button>
  );
};
