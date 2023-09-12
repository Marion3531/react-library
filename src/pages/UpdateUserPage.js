import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateData } from "../functions/fetchFunctions.js";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUserData = { username, email };

    updateData(`http://localhost:8080/api/users/${userId}`, updatedUserData)
      .then(() => {
        console.log(userId);
        console.log(updatedUserData);
        navigate("/all-users");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div>
      <h2>Update a User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserPage;
