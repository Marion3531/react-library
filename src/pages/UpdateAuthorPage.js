import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateData } from "../functions/fetchFunctions.js";

const UpdateAuthorPage = () => {
  const navigate = useNavigate();
  const { authorId } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    const fetchAuthors = () => {
      fetch(`http://localhost:8080/api/authors/${authorId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setFirstname(data.firstname);
          setLastname(data.lastname);
        })
        .catch((error) => {
          console.error("Error fetching authors:", error);
        });
    };

    fetchAuthors();
  }, [authorId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAuthorData = { firstname, lastname };

    updateData(`http://localhost:8080/api/authors/${authorId}`, updatedAuthorData)
      .then(() => {
        navigate("/all-authors");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div>
      <h2>Update an Author</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateAuthorPage;
