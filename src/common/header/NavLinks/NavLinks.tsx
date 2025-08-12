// components/layout/NavLinks.tsx
import { Link, useLocation } from 'react-router';
import clsx from 'clsx';
import userNoImg from '../../../assets/userNoImg.svg';
import styles from '../Navbar.module.scss';
import { ROUTES } from '../../../utils/constants/routes';
import { Typography } from '../../typography/Typography';
import { ThemeButton } from '../../buttons/ThemeButton/ThemeButton';
import Button from '../../buttons/Button/Button';

interface NavLinksProps {
  photoUrl?: string | null;
  onClickLink?: () => void;
  showLogout?: boolean;
  onLogoutClick?: () => void;
  className?: string;
  showUserImage?: boolean;
}

export const NavLinks = ({
  photoUrl,
  onClickLink,
  showLogout = false,
  onLogoutClick,
  className,
  showUserImage = true,
}: NavLinksProps) => {
  const location = useLocation();

  const navItems = [
    { label: 'Pokemon Page', to: ROUTES.POKEMONS },
    { label: 'Users', to: ROUTES.USERS },
    { label: 'Settings', to: ROUTES.SETTINGS },
    { label: 'Profile', to: ROUTES.PROFILE },
  ];

  return (
    <ul className={clsx(styles['navbar__links'], className)}>
      <li>
        <ThemeButton />
      </li>
      {navItems.map(({ label, to }) => {
        const isActive = location.pathname === to;
        const linkClass = clsx(styles['navbar__link'], {
          [styles['navbar__link--active']]: isActive,
        });

        return (
          <li key={label} onClick={onClickLink}>
            <Typography variant="title-regular">
              <Link to={to} className={linkClass}>
                {label === 'Profile' ? (
                  showUserImage && photoUrl ? (
                    <img src={photoUrl ?? userNoImg} alt="user" />
                  ) : (
                    label
                  )
                ) : (
                  label
                )}
              </Link>
            </Typography>
          </li>
        );
      })}

      {showLogout && (
        <li onClick={onLogoutClick}>
          <Typography variant="title-regular">
            <Button theme="red">{'Logout'}</Button>
          </Typography>
        </li>
      )}
    </ul>
  );
};
