import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { updateData } from "../functions/fetchFunctions.js";

const UpdateBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState();
  const [title, setTitle] = useState();
  const [yearOfPublication, setYearOfPublication] = useState();
  const [numberOfPages, setNumberOfPages] = useState();
  const [description, setDescription] = useState("");

  const [authors, setAuthors] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //fetch book avec son id obtenu depuis l'url
  useEffect(() => {
    const fetchBooks = async () => {
      fetch(`http://localhost:8080/api/books/${bookId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setYearOfPublication(data.yearOfPublication);
          setNumberOfPages(data.numberOfPages);
          setBook(data);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    };
    fetchBooks();
  }, [bookId]);

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
        })
        .catch((error) => {
          console.error("Error fetching authors:", error);
        });
    };

    fetchAuthors();
  }, []);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const authorsOptions = authors.map((author) => ({
    value: author,
    label: `${author.firstname} ${author.lastname}`,
  }));

  //PUT request when clicking on update
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedValues = selectedOptions.map((option) => option.value);
    const updatedBookdata = { title, description, yearOfPublication, numberOfPages, authors: selectedValues };

    updateData(`http://localhost:8080/api/books/${bookId}`, updatedBookdata)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  return (
    <div>
      <h2>Update a book</h2>
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
        </div>
        <div>
          <label>Year of publication:</label>
          <input
            className="input-add"
            type="number"
            value={yearOfPublication}
            onChange={(e) => setYearOfPublication(e.target.value)}
          />
        </div>
        <div>
          <label>Number of pages:</label>
          <input
            className="input-add"
            type="number"
            min="0"
            value={numberOfPages}
            onChange={(e) => setNumberOfPages(e.target.value)}
          />
        </div>
        <div>
          <label>Authors:</label>
          <Select
            options={authorsOptions}
            value={selectedOptions}
            onChange={handleSelectChange}
            isMulti
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateBookPage;
