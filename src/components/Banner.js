import React from "react";
import "../styles/banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <button className="connexion-btn">
        <Link to="/authenticate">Connexion</Link>
      </button>
      <h1>Library exercise</h1>
    </>
  );
};

export default Banner;
