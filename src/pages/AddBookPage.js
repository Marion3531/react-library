import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../styles/addBookPage.css";
import { createData } from "../functions/fetchFunctions";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  //fetch get all authors
  useEffect(() => {
    const fetchAuthors = () => {
      fetch("http://localhost:8080/api/authors")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          const authorList = data._embedded.authorList;
          setAuthors(authorList);
          //console.log(authorList);
        })
        .catch((error) => {
          console.error("Error fetching authors:", error);
        });
    };

    fetchAuthors();
  }, []);

  const options = authors.map((author) => ({
    value: author,
    label: `${author.firstname} ${author.lastname}`,
  }));

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedValues = selectedOptions.map((option) => option.value);

    const data = { title, description, authors: selectedValues };

    createData("http://localhost:8080/api/books", data)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        navigate("/all-books");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a book</h2>
        <div>
          <label>Title:</label>
          <input
            className="input-add"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            className="input-add"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <Select
              options={options}
              value={selectedOptions}
              onChange={handleSelectChange}
              isMulti
            />
          </div>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBookPage;
