import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const users = useSelector(state => Object.values(state.users));

  const userComponents = users?.map((user) => {
    return (
      <li key={user?.id}>
        <NavLink to={`/users/${user?.id}`}>{user?.email}</NavLink>
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
