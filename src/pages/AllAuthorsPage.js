import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const AllAuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch("http://localhost:8080/authors");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      const authorList = data._embedded.authorList;
      setAuthors(authorList);

      console.error("Error fetching data:");
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      <Layout />
      {authors.map((author) => (
        <div key={author.id}>
          <h3>
            {author.firstname} {author.lastname}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AllAuthorsPage;
