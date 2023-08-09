import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InfoBookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    const fetchBookDetails = () => {
      fetch(`http://localhost:8080/books/${bookId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setBook(data);
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
        });
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <div>
      {book && (
        <div>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          {/* Autres éléments d'information */}
        </div>
      )}
    </div>
  );
};

export default InfoBookPage;
