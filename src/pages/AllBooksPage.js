import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  //console.log(books);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:8080/books");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      const bookList = data._embedded.bookList;
      setBooks(bookList);

      console.error("Error fetching data:");
    };
    fetchBooks();
  }, []);

  const handleDeleteButton = (bookId) => {
    fetch(`http://localhost:8080/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete book.");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleBorrow = (bookId) => {
      //fetch borrow book
  }

  return (
    <div>
      <Layout>
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <ul>
              {book.authors.map((author) => (
                <li
                  key={author.id}
                >{`${author.firstname} ${author.lastname}`}</li>
              ))}
            </ul>

            <ul>
              {book.loans.map((loan) => (
                <li key={loan.id}>
                  {loan.borrowed ? (
                    "Unavailable"
                  ) : (
                    <button onClick={() => handleBorrow(loan.id)}>
                      Borrow
                    </button> //if loan.borrowed is true, it will render the text "Unavailable." else if false, it will render a button with the label "Borrow." 
                  )}
                </li>
              ))}
            </ul>

            <p>{book.description}</p>
            <button onClick={() => navigate(`update-book/${book.id}`)}>
              Update book
            </button>
            <button onClick={() => handleDeleteButton(book.id)}>
              Delete book
            </button>
          </div>
        ))}
      </Layout>
    </div>
  );
};

export default AllBooksPage;
