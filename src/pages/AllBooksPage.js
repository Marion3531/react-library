import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/books');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Layout>
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
          </div>
        ))}
      </Layout>
    </div>
  );
};

export default AllBooksPage;
