import { useEffect, useState } from 'react';

function User({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      
      
    
  }, [userId]);

  console.log(user);
  return <h1>{user?.name}</h1>;
}

export default User;

