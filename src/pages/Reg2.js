import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register2 = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
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
            navigate(-1); //to prievious page
          })
          .catch((error) => {
            console.error("Error posting user:", error);
          });
      };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>register sql intrusion test</h2>
        <div>
            <label>Username:</label>
            <input
            type = "text"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
            }} 
            />
        </div>
        <div>
            <label>Email:</label>
            <input
            type = "text" 
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
            }} 
            />
        </div>
        <div>
            <label>Password:</label>
            <input
            type = "text" 
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }} 
            />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Register2;
