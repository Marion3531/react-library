import React from "react";
import "../styles/banner.css";
import { Link } from "react-router-dom";
import { useAuth } from '../authentication/AuthProvider';

//title (name of the library) + log in/log out button according to the auth status of the user (Cf. functions in AuthProvider.js)
const Banner = () => {
  const auth = useAuth();

  return (
    <div>
      {auth.isLoggedIn ? (
        //if user is authenticated, display 'loug out' button
        <button className="logInAndOut-btn" onClick={auth.handleLogOut}>
          Log out
        </button>
      ) : (
        //otherwise display 'log in' button
        <button className="logInAndOut-btn">
          <Link to="/authenticate">Log in</Link>
        </button>
      )}
      <h1>Twin Peaks Public Library</h1>
    </div>
  );
};

export default Banner;
