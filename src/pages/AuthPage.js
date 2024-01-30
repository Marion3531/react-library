import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authentication/AuthProvider";
import "../styles/authPage.css";

//the authentication management logic is in AuthProvider.js
const AuthPage = () => {
  const auth = useAuth(); //auth context

  //authentication form with link to registration form (RegisterPage.js)
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={auth.handleLogIn}>
        <div className="input-group">
          <label className="input-label">Username</label>
          <input
            className="input-field"
            type="text"
            value={auth.username}
            onChange={(e) => auth.setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            className="input-field"
            type="password"
            value={auth.password}
            onChange={(e) => auth.setPassword(e.target.value)}
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
