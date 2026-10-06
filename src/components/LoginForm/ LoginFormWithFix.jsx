
import { useState } from "react";

function LoginFormWithFix() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginState({
      loading: true,
      error: null,
      success: false,
    });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      setLoginState({
        loading: false,
        error: null,
        success: true,
      });
    } catch (error) {
      setLoginState({
        loading: false,
        error: error.message,
        success: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.username}
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
        placeholder="Username"
      />

      <input
        type="password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
        placeholder="Password"
      />

      <button type="submit" disabled={loginState.loading}>
        {loginState.loading ? "Logging in..." : "Login"}
      </button>

      {loginState.error && <p>{loginState.error}</p>}

      {loginState.success && <p>Login successful!</p>}
    </form>
  );
}

export default LoginFormWithFix;


