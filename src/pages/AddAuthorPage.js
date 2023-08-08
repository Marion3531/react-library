import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddAuthorPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const data = { firstname, lastname };

    fetch("http://localhost:8080/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        navigate('/all-authors');
      })
      .catch((error) => {
        console.error("Error adding author:", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add an Author</h2>
        <div>
          <label>Firstname:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label>Lastname:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <button>Add an author</button>
      </form>
    </div>
  );
};

export default AddAuthorPage;
