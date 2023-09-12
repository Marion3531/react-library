import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, deleteData } from "../functions/fetchFunctions.js";
import "../styles/allAuthorsPage.css";

const AllAuthorsPage = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getData("http://localhost:8080/api/authors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        const authorList = data._embedded.authorList;
        setAuthors(authorList);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  const handleDeleteButton = (authorId) => {
    deleteData(`http://localhost:8080/api/authors/${authorId}`)
      .then(() => {
        setAuthors((prevAuthor) =>
          prevAuthor.filter((author) => author.id !== authorId)
        );
      })
      .catch((error) => {
        console.error("Error deleting author:", error);
      });
  };

  return (
    <div>
      <div id="addAuthorBtnContainer">
        <button onClick={() => navigate("add-author")}>Add an author</button>
      </div>
      <table className="author-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.firstname}</td>
              <td>{author.lastname}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/all-authors/update-author/${author.id}`)
                  }
                >
                  Update Author
                </button>
                <button onClick={() => handleDeleteButton(author.id)}>
                  Delete Author
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAuthorsPage;
