import { useState, useLayoutEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // BAD: Making an asynchronous network request inside useLayoutEffect
  useLayoutEffect(() => {
    fetch(`${process.env.BASE_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  return <>
  profile with useLayoutEffect
  <p>User ID: {userId}</p>
  <p>User Name: {user?.name}</p>
  <p>User Email: {user?.email}</p>
  <p>User Phone: {user?.phone}</p>
  <p>User Website: {user?.website}</p>
  <p>User Company: {user?.company?.name}</p>    
  </>
  
  ;
}

export default UserProfile;
// 