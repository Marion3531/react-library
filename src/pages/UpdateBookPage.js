import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Select from 'react-select';

const UpdateBookPage = () => {
    const { bookId } = useParams();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState('');
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

//fetch get all authors
useEffect(() => {
    const fetchAuthors = async () => {
        try {
        const response = await fetch('http://localhost:8080/authors');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        const authorList = data._embedded.authorList;
        setAuthors(authorList);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    fetchAuthors();
    }, []);

    const options = authors.map((author) => ({
        value: `${author.firstname} ${author.lastname}`,
        label: `${author.firstname} ${author.lastname}`,
      }));

    //PUT request when clicking on update  
    const handleSubmit = (e) => {
        e.preventDefault();

        //const data = { title, description };
        const data = { title, description, selectedAuthors };

        fetch(`http://localhost:8080/books/${bookId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            window.location.href = '/all-books';
          })
          .catch((error) => {
            console.error('Error adding book:', error);
          });
      };

    return (
        <div>
            <Layout />
            <h2>Update a book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                    type="text"
                    placeholder="Enter book title"
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
                <div>
                    <Select options={options}
                    placeholder="select author(s)"
                    value={selectedAuthors}
                    isMulti
                    onChange={(selectedOptions) => setSelectedAuthors(selectedOptions)}
                    />
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateBookPage;