import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { deleteData } from '../functions/fetchFunctions.js';
import { format } from "date-fns";
import "../styles/infoBookPage.css";

const InfoBookPage = () => {
  const token = localStorage.getItem("token");
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState();
  //const [borrowStatus, setBorrowStatus] = useState(book.borrowed ? "unavailable" : "available");
  let [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  //TODO : if user not logged in and tries to post a comment : redirect log in page
  //delete one's one comment, and admins can delete all comments ; responsive
  //all the mess with the user permissions (update book, delete, etc)

  //////////////Display book information
  useEffect(() => {
    const fetchBookDetails = () => {
      fetch(`http://localhost:8080/api/books/${bookId}`)
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
  }, [bookId]);

  // const handleBorrowButton = (book) => {
  //   fetch(`http://localhost:8080/api/books/borrow/${book.id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }
  //       //setBorrowStatus("unavailable");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating book:", error);
  //     });
  // };

  // const handleDelete = (bookId) => {
  //   deleteData(`http://localhost:8080/api/books/${bookId}`)
  //     .then(() => {
  //       navigate("/all-books");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting book:", error);
  //     });
  // };

  //////////////Comments Section (display comments)
  useEffect(() => {
    const fetchComments = () => {
      fetch(`http://localhost:8080/api/comments?bookId=${bookId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setComments(data);
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
        });
    };

    fetchComments();
  }, [bookId]);

  //sort the comments from most recent to oldest
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  //////////////Post a comment (display comments)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      console.log("Please log in to add a comment.");
    }

    const commentData = { content };

    fetch(`http://localhost:8080/api/comments/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: commentData.content,
      //Send only the string of the content otherwise {"content":"ok"} is displayed
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        setContent(""); //empty the posting field after posting
        return response.json();
      })
      .then((newComment) => {
        setComments((prevComments) => [...prevComments, newComment]); // Update comments state with new comment
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  //const handleUpdate = (data) => {};

  //delete a comment
  // const handleCommentDelete = (commentId) => {
  //   deleteData(`http://localhost:8080/api/comments/${commentId}`)
  //     .then(() => {
  //       console.log("hello");
  //       setComments((prevComments) =>
  //         prevComments.filter((comment) => comment.id !== commentId)
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting book:", error);
  //     });
  // };

  return (
    <div>
      {book && (
        <div className="book-info">
          <h3 className="titles">{book.title}</h3>
          <ul className="author-name">
            {book.authors.map((author) => (
              <li key={author.id}>
                {author.firstname} {author.lastname}
              </li>
            ))}
          </ul>
          <p>{book.description}</p>
          <p className="book-details">
            Published in {book.yearOfPublication} ; {book.numberOfPages} pages
          </p>
          {/* <p>
            {borrowStatus === "empruntable" && (
              <button onClick={handleBorrowButton}>Emprunter le livre</button>
            )}
            {borrowStatus === "unavailable" && <p>Non disponible</p>}
          </p> */}
          {/* <button onClick={() => navigate(`update-book/${book.id}`)}>
            Update
          </button> */}
          {/* <button onClick={() => handleDelete(bookId)}>Delete</button> */}
        </div>
      )}
      <div>
        <form className="post-comment-form" onSubmit={handleSubmit}>
          <textarea
            className="comment-input"
            placeholder="What did you think of the book?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="post-comment-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      {/* display section of the comments regarding one book */}
      <div className="commentsSection">
        <h3 className="titles">Comments</h3>
        {sortedComments.map((comment) => (
          <div className="user-comment" key={comment.id}>
            <p className="user-name">{comment.user.username}</p>
            <p>{format(comment.date, "MMMM dd, yyyy")}</p>
            <p>{comment.content}</p>
            {/* <button onClick={() => handleCommentDelete(comment.id)}>
              delete
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBookPage;
