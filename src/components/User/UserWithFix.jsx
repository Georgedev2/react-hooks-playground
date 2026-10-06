import { useEffect, useState } from "react";

function UserWithFix({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setUser(null);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        // call graphanalytics to log the response
        
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {

        if (err.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        // Only stop loading if the request wasn't aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      });
      
    return () => {
      controller.abort();
    };
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <h1>{user?.name}</h1>;
}

export default UserWithFix;

// Prevents Race Conditions: If a user clicks quickly between multiple IDs, older slow responses won't overwrite newer fast ones out of order.

// Avoids Memory Leaks & Warnings: Prevents React from trying to update state (setLoading or setUser) on a component that has already unmounted.