import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from './Icons/Avatar';

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <li className="flex-row">
        <strong>Avatar</strong> <Avatar user={user} />
      </li>
      <li>
        <strong>Display Name</strong> {user.display_name}
      </li>
    </ul>
  );
}
export default User;
