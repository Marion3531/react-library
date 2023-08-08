import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search-results?query=${query}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchInput = event.target.searchInput.value;
    handleSearch(searchInput);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <span>Books</span>
          <ul>
            <li>
              <Link to="/all-books">All Books</Link>
            </li>
            <li>
              <Link to="/add-book">Add a Book</Link>
            </li>
          </ul>
        </li>

        <li>
          <span>Authors</span>
          <ul>
            <li>
              <Link to="/all-authors">All Authors</Link>
            </li>
            <li>
              <Link to="/add-author">Add an Author</Link>
            </li>
          </ul>
        </li>

        <li>
          <span>Users</span>
          <ul>
            <li>
              <Link to="/all-users">All Users</Link>
            </li>
            <li>
              <Link to="/add-user">Add a User</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/all-loans">Loans</Link>
        </li>

        <li>
          <div className="searchBar">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="searchInput"
                placeholder="Search book or author..."
              />
              <button type="submit">OK</button>
            </form>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
