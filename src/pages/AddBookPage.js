import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../styles/addBookPage.css";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  //fetch get all authors
  useEffect(() => {
    const fetchAuthors = () => {
      fetch("http://localhost:8080/authors")
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

    fetch("http://localhost:8080/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        authors: selectedValues,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        console.log(selectedValues);
        navigate("/all-books");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  return (
    <div>
      <h2>Add a book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
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
