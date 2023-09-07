import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createData } from "../functions/fetchFunctions.js";

const AddAuthorPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const authorData = { firstname, lastname };

    createData("http://localhost:8080/authors", authorData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        navigate("/all-authors");
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
          <input className="input-add"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label>Lastname:</label>
          <input className="input-add"
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
