import { useSelector } from 'react-redux';
import UserCard from '../UserCard';

function UsersList() {
  const users = useSelector(state => Object.values(state.users));

  const userComponents = users?.map((user) => {
    return (
      <li key={user?.id}>
        <UserCard user={user} />
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
