import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/authPage.css";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json(); // Extract JSON from response
      })
      .then((data) => {
        const token = data.token; // Extract the token
        localStorage.setItem("token", token); // Store the token in localStorage
        console.log(token);
        navigate(-1); //to prievious page
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Username</label>
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="register-link">
          Not registered yet? <Link to="/register">Create an account</Link>
        </p>
        <button className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default AuthPage;
