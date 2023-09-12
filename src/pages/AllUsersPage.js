import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../functions/fetchFunctions.js";
import "../styles/allUsersPage.css";

const AllUsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      fetch("http://localhost:8080/api/users", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`, 
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };
    fetchUsers();
  }, [token]);

  const handleDeleteButton = (userId) => {
    deleteData(`http://localhost:8080/api/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); //à la place de window.location.reload()
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <h3>Users</h3>
      <div className="users-container">
        <div className="users-list users-header">
          <p>Username</p>
          <p>Email</p>
          <p>Action</p>
        </div>
        
        {users.map((user) => (
          <div className="users-list" key={user.id}>
            <p>{`${user.username}`}</p>
            <p>{`${user.email}`}</p>
            <div className="user-actions">
              <button onClick={() => navigate(`/all-users/update-user/${user.id}`)}>Update User</button>
              <button onClick={() => handleDeleteButton(user.id)}>
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllUsersPage;
