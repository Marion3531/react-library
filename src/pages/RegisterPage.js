import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/registerPage.css";

const AddUserPage = () => {
  const navigate = useNavigate();

  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{5,19}$/;
  const emailRegex =
    /^(?=[a-zA-Z0-9._-]{1,64}@[^-.][a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,})[a-zA-Z0-9._-]+@[^-.][a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$/;

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [validationMessage, setValidationMessage] = useState("");

  const validateUsername = () => {
    if (!username) {
      setValidationMessage(true);
      setIsUsernameValid(false);
      return;
    }
    if (usernameRegex.test(username)) {
      setValidationMessage(false);
      setIsUsernameValid(true);
    } else {
      setValidationMessage(
        "Username must be 6-20 characters long. It can only contain lowercase, uppercase letters, digits and underscores (_). It can't start with a digit."
      );
      setIsUsernameValid(false);
    }
  };

  const validateEmail = () => {
    if (!email) {
      setValidationMessage(true);
      setIsEmailValid(false);
      return;
    }
    if (emailRegex.test(email)) {
      setValidationMessage(false);
      setIsEmailValid(true);
    } else {
      setValidationMessage("Invalid email address");
      setIsEmailValid(false);
    }
  };

  const validatePassword = () => {
    if (!password) {
      setValidationMessage(true);
      setIsPasswordValid(false);
      return;
    }
    if (passwordRegex.test(password)) {
      setValidationMessage(false);
      setIsPasswordValid(true);
    } else {
      setValidationMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8-20 characters long."
      );
      setIsPasswordValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, email, password };

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((data) => {
        const token = data.token; // Extract the token
        localStorage.setItem("token", token); // Store the token in localStorage
        navigate(-1); //to prievious page
      })
      .catch((error) => {
        console.error("Error posting user:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <form className="createAccountForm" onSubmit={handleSubmit}>
        <h2 className="form-header">Create an account</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        <div className="form-group">
          <label>Confirm password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        <button
          // className={`register-form-button ${
          //   isPasswordValid ? "" : "invalid-password"
          // }`}
          type="submit"
          disabled={!isUsernameValid || !isEmailValid || !isPasswordValid}
        >
          Create account
        </button>
        {validationMessage && (
          <span className="validation-message">{validationMessage}</span>
        )}
      </form>
    </div>
  );
};

export default AddUserPage;
