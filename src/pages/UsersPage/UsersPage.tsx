import { UserCard } from "../../common/cards/UserCard/UserCard";
import { PokeballLoader } from '../../common/loader/PokeballLoader';
import { useUsersCollection } from "../../utils/firebase/hooks/useUsersCollection";
import styles from './UsersPage.module.scss';

export const UsersPage = () => {
  const { data, isLoading } = useUsersCollection();

  if (!data || isLoading) return <PokeballLoader/>;

  return (
    <div className="page">
      <div className={styles.users}>
        {data.map((user) => (
          <UserCard user={user} key={user.uid}/>
        ))}
      </div>
    </div>
  );
};
