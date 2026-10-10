import { useState } from 'react';

function ControlledLoginForm() {
  // Form field states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Track whether fields have been touched/interacted with for cleaner validation UX
  const [touched, setTouched] = useState({ username: false, password: false });

  
  // Instant validation logic
  const usernameError = touched.username && username.trim().length < 3 
    ? 'Username must be at least 3 characters long.' 
    : '';

  const passwordError = touched.password && password.length < 6 
    ? 'Password must be at least 6 characters long.' 
    : '';

  const isFormValid = username.trim().length >= 3 && password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // Process login logic here
    alert(`Logging in with Username: ${username}`);
  };

  console.log('Username:', username);
  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      {/* Username Field Group */}
      <div className="input-group">
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
          aria-invalid={!!usernameError}
          aria-describedby={usernameError ? 'username-error' : undefined}
        />
        {usernameError && (
          <span id="username-error" className="error-text" role="alert">
            {usernameError}
          </span>
        )}
      </div>

      {/* Password Field Group */}
      <div className="input-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          aria-invalid={!!passwordError}
          aria-describedby={passwordError ? 'password-error' : undefined}
        />
        {passwordError && (
          <span id="password-error" className="error-text" role="alert">
            {passwordError}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button style={{backgroundColor:"red", color:"white"}}  type="submit" disabled={!isFormValid}>
        Sign In
      </button>
    </form>
  );
}

export default ControlledLoginForm;