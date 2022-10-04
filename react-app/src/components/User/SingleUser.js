import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../UserCard';

function SingleUser() {
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
    <div>
      <div>
        <strong>User Id</strong> {userId}
      </div>
      <UserCard user={user} />
    </div>
  );
}
export default SingleUser;
