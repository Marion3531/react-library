import React from "react";
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

const NavBar = () => {
    return(
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <span>Books</span>
            <ul>
              <li><Link to="/all-books">All Books</Link></li>
              <li><Link to="/add-book">Add a Book</Link></li>
            </ul>
          </li>

          <li>
            <span>Authors</span>
            <ul>
              <li><Link to="/all-authors">All Authors</Link></li>
              <li><Link to="/add-author">Add an Author</Link></li>
            </ul>
          </li>
          
          <li>
            <span>Users</span>
            <ul>
              <li><Link to="/all-users">All Users</Link></li>
              <li><Link to="/add-user">Add a User</Link></li>
            </ul>
          </li>

          <li>
            <Link to="/all-loans">Loans</Link>
          </li>
        </ul>
      </nav>
    );
}

export default NavBar;