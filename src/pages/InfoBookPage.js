import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InfoBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  

  useEffect(() => {
    const fetchBookDetails = () => {
      fetch(`http://localhost:8080/books/${id}`)
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
          console.error("Error fetching book:", error);
        });
    };

    fetchBookDetails();
  });

  return (
    <div>
      {/* <h1>{book.title}</h1>
      <p>{book.description}</p> */}

      {/* <ul>
        {book.authors.map((author) => (
          <li key={author.id}>{`${author.firstname} ${author.lastname}`}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default InfoBookPage;
