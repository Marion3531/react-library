import React from "react";
import "../styles/banner.css";
import { Link } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";

const Banner = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <button className="connexion-btn">
        {user ? (
          `Welcome ${user.username}`
        ) : (
          <Link to="/authenticate">Connexion</Link>
        )}
      </button>
      <h1>Library exercise</h1>
    </>
  );
};

export default Banner;
