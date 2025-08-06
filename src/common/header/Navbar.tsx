import { Link, useLocation } from "react-router";
import { ROUTES } from "../../utils/constants/routes";
import { Typography } from "../typography/Typography";
import { useAuthState } from "../../utils/firebase/hooks/useAuthState";
import userNoImg from "../../assets/userNoImg.jpg";
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { ThemeButton } from '../buttons/ThemeButton/ThemeButton';

const Navbar = () => {
  const location = useLocation();
  const authState = useAuthState();

  if (location.pathname == "/auth" || authState.isLoading) return null;

  const user = authState.data;

  const navItems = [
    { label: "Pokemon Page", to: ROUTES.POKEMONS },
    { label: "Users", to: ROUTES.USERS },
    { label: "Settings", to: ROUTES.SETTINGS },
    { label: "Profile", to: ROUTES.PROFILE },
  ];

  return (
    <div>
      <nav className={styles.navbar}>
        <div>
          <Typography>{"GCTA"}</Typography>
          <Typography variant="sub-body">{"gotta catch them all"}</Typography>
        </div>
        <ul className={styles['navbar__links']}>
          <li>
            <ThemeButton/>
          </li>
          {navItems.map(({ label, to }) => {
            const isActive = location.pathname == to;
            const linksClass = clsx(styles.navbar__link, {
              [styles['navbar__link--active']]: isActive
            });

            return (
              <li key={label}>
                <Typography variant="title-regular">
                  <Link to={to} className={linksClass}                  >
                    {label === "Profile" ? (
                      <img
                        src={user?.photoUrl ?? userNoImg}
                        alt="user photo"
                      />
                    ) : (
                      label
                    ) }
                  </Link>
                </Typography>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
