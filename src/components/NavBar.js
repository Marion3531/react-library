import React from "react";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return(
        <nav>
        <ul>
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
          <li>
            <span>Books ▼</span>
            <ul>
              <li>
                <NavLink to="/all-books">All Books</NavLink>
              </li>
              <li>
                <NavLink to="/add-book">Add a Book</NavLink>
              </li>
            </ul>
          </li>
          {/*<li>
            <NavLink to="/authors">Authors</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/loans">Loans</NavLink>
    </li>*/}
        </ul>
      </nav>
    );
}

export default NavBar;