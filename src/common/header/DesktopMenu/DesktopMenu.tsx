import { useAuthState } from '../../../utils/firebase/hooks/useAuthState';
import { Typography } from '../../typography/Typography';
import { NavLinks } from '../NavLinks/NavLinks';
import styles from './DesktopMenu.module.scss';

export const DesktopMenu = () => {
  const authState = useAuthState();
  if (!authState.data || authState.isLoading) return null;
  const user = authState.data;
  return (
    <nav className={styles['desktop-menu_header']}>
      <div>
        <Typography>{'GCTA'}</Typography>
        <Typography variant="sub-body">{'gotta catch them all'}</Typography>
      </div>
      <NavLinks photoUrl={user.photoUrl ?? null} />
    </nav>
  );
};
