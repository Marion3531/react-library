import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { deleteData } from "../functions/fetchFunctions.js";
import "../styles/allBooksPage.css";

const AllBooksPage = () => {
  const itemsPerPage = 8;
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
      fetch("http://localhost:8080/api/books")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setBooks(data);
          setTotalPages(Math.ceil(data.length / itemsPerPage));
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    };
    fetchBooks();
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = books.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleDeleteButton = (bookId) => {
    deleteData(`http://localhost:8080/api/books/${bookId}`)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const handleBorrow = (book) => {
    fetch(`http://localhost:8080/api/books/borrow/${book.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        setBooks((prevBooks) =>
          prevBooks.map((prevBook) =>
            prevBook.id === book.id ? { ...prevBook, borrowed: true } : prevBook
          )
        );
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  return (
    <div>
      <div id="addButtonContainer">
        <button onClick={() => navigate("add-book")}>Add a book</button>
      </div>
      <h3 id="title">All Books</h3>
      <div className="container">
        {subset.map((book) => (
          <div className="book" key={book.id}>
            <Link to={`/info-book/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <ul className="author-list">
              {book.authors.map((author) => (
                <li
                  key={author.id}
                >{`${author.firstname} ${author.lastname}`}</li>
              ))}
            </ul>
            <p>
              {book.borrowed ? (
                "Unavailable"
              ) : (
                <button className="bookButton" onClick={() => handleBorrow(book)}>Borrow</button> //if loan.borrowed is true, it will render the text "Unavailable." else if false, it will render a button with the label "Borrow."
              )}
            </p>
            <button className="bookButton" onClick={() => navigate(`update-book/${book.id}`)}>
              Update book
            </button>
            <button className="bookButton" onClick={() => handleDeleteButton(book.id)}>
              Delete book
            </button>
          </div>
        ))}
      </div>
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageLinkClassName="page-link"
        activeClassName="active"
        containerClassName="pagination"
      />
    </div>
  );
};

export default AllBooksPage;
