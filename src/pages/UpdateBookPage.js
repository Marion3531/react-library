import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

const UpdateBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");

  const [authors, setAuthors] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //fetch book avec son id obtenu depuis l'url
  useEffect(() => {
    const fetchBooks = async () => {
      fetch(`http://localhost:8080/books/${bookId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setBook(data);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    };
    fetchBooks();
  }, [bookId]);

  console.log(book);

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

  const authorOptions = authors.map((author) => ({
    value: author,
    label: `${author.firstname} ${author.lastname}`,
  }));

  //PUT request when clicking on update
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedValues = selectedOptions.map((option) => option.value);

    fetch(`http://localhost:8080/books/${bookId}`, {
      method: "PUT",
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
        navigate("/all-books");
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
          <Select
            options={authorOptions}
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
