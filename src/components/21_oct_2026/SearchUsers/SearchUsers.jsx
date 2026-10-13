
import { useState } from "react";

export default function SearchUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  async function handleSearch(value) {
    setSearch(value);

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?username_like=${value}`
    );

    const data = await response.json();
    setUsers(data);
  }

  return (
    <div>
      <label htmlFor="search">Search Users</label>

      <input
        id="search"
        type="text"
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Type a username..."
      />

      {users.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
}