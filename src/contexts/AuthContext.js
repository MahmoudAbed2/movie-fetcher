import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/keys");
        const data = await response.json();
        if (data.success) {
          setApiKey(data.data);
        } else {
          throw new Error("Failed to fetch API key");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchApiKey();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      throw new Error("Invalid username or password");
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(
        "Username already exists. Please choose a different one."
      );
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setUser(null);
        localStorage.removeItem("user");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, apiKey, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
