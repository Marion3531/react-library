import React, { useState, useEffect } from "react";
import { getData } from "../functions/fetchFunctions";
import dayjs from "dayjs";
import "../styles/allLoansPage.css";

const token = localStorage.getItem("token");

const AllLoansPage = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    getData("http://localhost:8080/api/loans")
      .then((response) => response.json())
      .then((data) => {
        setLoans(data);
      })
      .catch((error) => console.error("Erreur lors de la requête:", error));
  }, []);

  const handleReturn = (loan) => {
    fetch(`http://localhost:8080/api/books/return/${loan.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        setLoans((prevLoans) =>
          prevLoans.map((prevLoan) =>
            prevLoan.id === loan.id
              ? { ...prevLoan, borrowed: false }
              : prevLoan
          )
        );
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  return (
    <>
      <h3>Loans</h3>
      <div className="loan-container">
        <div className="loan-header">
          <h4>Loan Number</h4>
          <h4>Status</h4>
          <h4>User</h4>
          <h4>Book Title</h4>
          <h4>Borrowing Date</h4>
          <h4>Borrowing Period</h4>
        </div>
        {loans.map((loan) => (
          <div key={loan.id} className="loan-item">
            <p>{loan.id}</p>
            <p>
              {!loan.borrowed ? (
                "Archived"
              ) : (
                <button
                  onClick={() => {
                    handleReturn(loan);
                  }}
                >
                  Return
                </button>
              )}
            </p>
            <p>{loan.user.username}</p>
            <p>{loan.book.title}</p>
            <p>{dayjs(loan.borrowingDate).format("DD/MM/YYYY HH:mm:ss")}</p>
            <p>{loan.borrowingPeriod} days</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllLoansPage;
