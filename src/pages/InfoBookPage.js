import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData } from "../functions/fetchFunctions.js";

const InfoBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState();
  //const [borrowStatus, setBorrowStatus] = useState(book.borrowed ? "unavailable" : "available");
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem('token');

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
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
        });
    };

    fetchBookDetails();
  }, [bookId]);

  const handleBorrowButton = (book) => {
    fetch(`http://localhost:8080/api/books/borrow/${book.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        //setBorrowStatus("unavailable");
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleDelete = (bookId) => {
    deleteData(`http://localhost:8080/api/books/${bookId}`)
      .then(() => {
        navigate("/all-books");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  //////////////Comments Section

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
  }, []);

  //post a comment
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = { content };

    fetch(`http://localhost:8080/api/comments/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: commentData.content, // Envoyer seulement la chaîne de caractères du contenu sinon ça affiche {"content":"ok"}
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        setContent(""); //vider le champ commentaire
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleUpdate = (data) => {

    
  }

  //delete a comment
  const handleCommentDelete = (commentId) => {
    deleteData(`http://localhost:8080/api/comments/${commentId}`)
      .then(() => {
        console.log("hello");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <div>
      {book && (
        <div>
          <h3>{book.title}</h3>
          <ul>
            {book.authors.map((author) => (
              <li key={author.id}>
                {author.firstname} {author.lastname}
              </li>
            ))}
          </ul>
          <p>{book.description}</p>
          {/* <p>
            {borrowStatus === "empruntable" && (
              <button onClick={handleBorrowButton}>Emprunter le livre</button>
            )}
            {borrowStatus === "unavailable" && <p>Non disponible</p>}
          </p> */}
          <button onClick={() => navigate(`update-book/${book.id}`)}>
            Update
          </button>
          <button onClick={() => handleDelete(bookId)}>Delete</button>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write something"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Ok</button>
        </form>
      </div>
      <div className="commentsSection">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.user.username}</p>
            <p>{comment.date}</p>
            <p>{comment.content}</p>
            <button onClick={() => handleCommentDelete(comment.id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBookPage;
