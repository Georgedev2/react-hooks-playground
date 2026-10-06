import { useState, useEffect } from "react";

function UserProfileWithFix({ userId }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    fetch(`${process.env.BASE_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  return <>
  <br></br>
  profile with useEffect
  <p>User ID: {userId}</p>
  <p>User Name: {user?.name}</p>
  <p>User Email: {user?.email}</p>
  <p>User Phone: {user?.phone}</p>
  <p>User Website: {user?.website}</p>
  <p>User Company: {user?.company?.name}</p>    
  </>
  
  ;
}

export default UserProfileWithFix;