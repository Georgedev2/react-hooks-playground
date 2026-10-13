
import { useEffect, useState } from "react";

export default function SearchUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setUsers([]);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?username_like=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <div>
      <h2>Search Users</h2>

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Type a username..."
      />

      {loading && <p>Searching...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading &&
        !error &&
        users.map((user) => (
          <p key={user.id}>{user.username}</p>
        ))}
    </div>
  );
}