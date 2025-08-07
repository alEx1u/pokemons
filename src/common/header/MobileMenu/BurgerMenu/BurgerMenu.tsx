import styles from './BurgerMenu.module.scss';
import clsx from 'clsx';

interface BurgerMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

export const BurgerMenu = ({ onClick, isOpen }: BurgerMenuProps) => {
  return (
    <div className={clsx(styles.burger, isOpen && styles['burger--open'])}>
      <button className={styles['pokeball-button']} onClick={onClick} aria-label="toggle-menu">
        <div className={styles.pokeball}>
          <div className={styles.line}></div>
          <div className={styles.circle}></div>
        </div>
      </button>
    </div>
  );
};
