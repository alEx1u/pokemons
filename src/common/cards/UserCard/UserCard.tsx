import { useNavigate } from "react-router";
import styles from "./UserCard.module.scss";
import userNoImg from "../../../assets/userNoImg.jpg";

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();
  const { pokemons } = user;

  return (
    <div className="card">
      <div className={styles['user-card']}>
        <div className={styles['user-card__body']}>
          <img
            src={!user.photoUrl ? userNoImg : user.photoUrl}
            alt="user photo"
            className={styles['user-card__avatar']}
          />

          <div>
            <div className={styles['user-card__display-name']}>{user.displayName}</div>
            <div className={styles['user-card__data']}>{user.email}</div>
            <div className={styles['user-card__data']}>{user.city}</div>
          </div>
        </div>

        {!!pokemons.length && (
          <div className={styles['user-card__pokemons']}>
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} className={styles['user-card__pokemon']}>
                <div
                  className={styles['user-card__pokemon__item']}
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
