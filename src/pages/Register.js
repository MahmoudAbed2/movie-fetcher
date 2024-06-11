import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password length
    if (username.length < 5) {
      setError("Username length must be at least 5 characters long.");
      return;
    }

    if (password.length < 8) {
      setError("Password length must be at least 8 characters long.");
      return;
    }

    // Clear previous error message
    setError("");

    try {
      // Call register function
      await register(username, password);

      // Set success message
      setMessage(`Registered as ${username}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="username-container">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </div>
        <div className="password-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default Register;
