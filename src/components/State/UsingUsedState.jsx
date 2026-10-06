import { useReducer } from "react";

const initialState = {
  form: {
    username: "",
    password: "",
  },
  authentication: {
    status: "idle", // "idle", "loading", "success", or "error"
    error: null,    // Dynamic error message
  },
};

function loginReducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        form: {
          ...state.form,
          username: action.value,
        },
      };

    case "SET_PASSWORD":
      return {
        ...state,
        form: {
          ...state.form,
          password: action.value,
        },
      };

    case "LOGIN_START":
      return {
        ...state,
        authentication: {
          ...state.authentication,
          status: "loading",
          error: null, // Clear old errors when trying again
        },
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        authentication: {
          ...state.authentication,
          status: "success",
          error: null,
        },
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        authentication: {
          ...state.authentication,
          status: "error",
          error: action.message, // Dynamic error message passed from action
        },
      };

    default:
      return state;
  }
}

function LoginFormWithUseReducer() {
  const [state, dispatch] = useReducer(
    loginReducer,
    initialState
  );

  function handleLogin() {
    dispatch({ type: "LOGIN_START" });

    // Simulated login request
    setTimeout(() => {
      const success = Math.random() > 0.5; // Random success/fail for demo
      if (success) {
        dispatch({ type: "LOGIN_SUCCESS" });
      } else {
        dispatch({ 
          type: "LOGIN_ERROR", 
          message: "Invalid username or password. Please try again." 
        });
      }
    }, 1000);
  }

  const { username, password } = state.form;
  const { status, error } = state.authentication;

  return (
    <div>
        <p>Login Form with useReducer</p>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          dispatch({
            type: "SET_USERNAME",
            value: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          dispatch({
            type: "SET_PASSWORD",
            value: e.target.value,
          })
        }
      />

      <button onClick={handleLogin} disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "Login"}
      </button>

      {/* Render feedback based on status */}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
      {status === "success" && <p style={{ color: "green" }}>Login successful!</p>}
    </div>
  );
}

export default LoginFormWithUseReducer;