import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/addBookPage.css';

const AddBookPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { title, description };

        fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            navigate('/all-books');
          })
          .catch((error) => {
            console.error('Error adding book:', error);
          });
      };

    return(
    <div>
        <Layout />
        <h2>Add a book</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Description:</label>
                <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button type="submit">Add</button>
        </form>
    </div>
    );

}

export default AddBookPage;