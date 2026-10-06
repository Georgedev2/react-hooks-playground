
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
//   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p>{error}</p>}
      {success && <p>Login successful!</p>}
    </form>
  );
}

export default LoginForm;

