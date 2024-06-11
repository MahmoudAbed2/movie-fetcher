import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { login, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username and password are not empty
    if (username.trim() === "" || password.trim() === "") {
      setError("Username or password cannot be empty. Please try again.");
      return;
    }

    try {
      // Call the login function
      await login(username, password);
      setMessage(`Logged in as ${username}`);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    setMessage("You have been logged out.");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {message && <p className="message">{message}</p>}
        </div>
      ) : (
        <form className="login-container-form" onSubmit={handleSubmit}>
          <div className="username-container">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="password-container">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
        </form>
      )}
    </div>
  );
};

export default Login;
