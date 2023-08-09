import React, { useEffect, useState } from "react";

const AllAuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

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

  return (
    <div>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <h3>
              {author.firstname} {author.lastname}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAuthorsPage;
