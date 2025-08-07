import { sessionSlice } from '../../../utils/contexts/store/session.slice';
import { useAppDispatch } from '../../../utils/contexts/store/store';
import { useLogoutMutation } from '../../../utils/firebase/hooks/useLogoutMutation';
import styles from './MobileMenu.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '../../typography/Typography';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { NavLinks } from '../NavLinks/NavLinks';
import { useAuthState } from '../../../utils/firebase/hooks/useAuthState';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const overlayRef = useRef<HTMLDivElement>(null);
  const authState = useAuthState();

  const { mutate: logoutMutation } = useLogoutMutation({
    onSuccess: () => {
      setIsOpen(false);
      dispatch(sessionSlice.actions.logOut());
    },
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!authState.data || authState.isLoading) return null;

  return (
    <div className={styles['mobile-menu_header']}>
      <div className={styles.header_top}>
        <div className={styles.title}>
          <Typography>{'GCTA'}</Typography>
          <Typography variant="sub-body">{'gotta catch them all'}</Typography>
        </div>
        <BurgerMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen && (
        <div className={styles.overlay}>
          <nav className={styles.menu_nav} ref={overlayRef}>
            <NavLinks
              showLogout
              onClickLink={() => setIsOpen(!isOpen)}
              onLogoutClick={logoutMutation}
              showUserImage={false}
              className={styles.menu_links}
            />
          </nav>
        </div>
      )}
    </div>
  );
};
