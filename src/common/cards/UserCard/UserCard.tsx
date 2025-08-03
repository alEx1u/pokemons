import { useNavigate } from "react-router";
import styles from "./UserCard.module.css";
import userNoImg from "../../../assets/userNoImg.jpg";

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();
  const { pokemons } = user;

  return (
    <div className="card">
      <div className={styles.content}>
        <div className={styles.body}>
          <img
            src={!user.photoUrl ? userNoImg : user.photoUrl}
            alt="user photo"
            className="h-20 rounded object-cover"
          />

          <div>
            <div className={styles.display_name}>{user.displayName}</div>
            <div className={styles.data}>{user.email}</div>
            <div className={styles.data}>{user.city}</div>
          </div>
        </div>

        {!!pokemons.length && (
          <div className={styles.pokemons}>
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} className={styles.pokemon}>
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter")
                      return navigate(`/pokemon/${pokemon.name}`);
                  }}
                  onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                >
                  <img src={pokemon.image || ""} alt={pokemon.name} />{" "}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
