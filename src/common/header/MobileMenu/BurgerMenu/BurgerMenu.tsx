import { useState } from 'react';
import styles from './BurgerMenu.module.scss';
import clsx from 'clsx';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={clsx(styles.burger, isOpen && styles['burger--open'])}>
      <button
        className={styles['pokeball-button']}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="toggle-menu"
      >
        <div className={styles.pokeball}>
          <div className={styles.line}></div>
          <div className={styles.circle}></div>
        </div>
      </button>
    </div>
  );
};
