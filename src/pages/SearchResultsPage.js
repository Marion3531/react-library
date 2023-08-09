import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/searchResults.css";

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/books?query=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id} className="book-item">
            <Link to={`/info-book/${book.id}`} className="book-link">
              <h3>{book.title}</h3>
              <ul className="author-list">
                {book.authors.map((author) => (
                  <li
                    key={author.id}
                  >{`${author.firstname} ${author.lastname}`}</li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
