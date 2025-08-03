import { Link, useLocation } from "react-router";
import { ROUTES } from "../../utils/constants/routes";
import { Typography } from "../typography/Typography";
import { useAuthState } from "../../utils/firebase/hooks/useAuthState";
import userNoImg from "../../assets/userNoImg.jpg";

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
      <nav className="flex h-10 p-10 justify-between  items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div>
            <Typography>{"GCTA"}</Typography>
            <Typography variant="sub-body">{"gotta catch them all"}</Typography>
          </div>
          {/* img */}
        </div>
        <ul className="flex items-center gap-3">
          {navItems.map(({ label, to }) => {
            const isActive = location.pathname == to;
            return (
              <Typography variant="title-regular" key={label}>
                <Link
                  key={label}
                  to={to}
                  className={`transition-colors duration-200 hover:text-red-500
                            ${
                              isActive
                                ? "text-red-400 font-semibold"
                                : "text-black"
                            }`}
                >
                  {label !== "Profile" ? (
                    label
                  ) : (
                    <img
                      src={!user || !user.photoUrl ? userNoImg : user.photoUrl}
                      alt="user photo"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                </Link>
              </Typography>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
