import { UserCard } from "../../common/cards/UserCard/UserCard";
import { useUsersCollection } from "../../utils/firebase/hooks/useUsersCollection";

export const UsersPage = () => {
  const { data, isLoading } = useUsersCollection();

  if (!data || isLoading) return null;

  return (
    <div className="page">
      <div className="flex flex-col gap-5">
        {data.map((user) => (
          <UserCard user={user} key={user.uid}/>
        ))}
      </div>
    </div>
  );
};
