import React from "react";
import "../styles/homePage.css";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div className="welcome-message">
        <p>
          Discover a world of endless stories, knowledge, and community right at
          your fingertips. Our public library is more than just a collection of
          books; it's a haven for bibliophiles, a hub for intellectual
          exploration, and a place where every page turns into an adventure.
        </p>
        <p>
          Dive into our extensive collection of books covering every genre
          imaginable. From timeless classics to the latest bestsellers, there's
          a story waiting for every reader.
        </p>
        <p>
          Borrowing a book is just the beginning. Join our vibrant community by
          sharing your thoughts and insights. Post comments, recommendations,
          and engage in conversations with fellow readers. Your unique
          perspective adds another layer to the tapestry of our literary
          sanctuary.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
