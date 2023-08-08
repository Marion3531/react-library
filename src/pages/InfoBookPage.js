import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const InfoBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:8080/books/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setBook(data);

      console.error("Error fetching data:");
    };
    fetchBook();
  });

  return (
    <div>
      <Layout />
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
