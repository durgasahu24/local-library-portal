import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux'




function Dashboard() {

  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const { authUser } = useSelector(store => store.user);

  console.log('authuser in dashboard : ', authUser);
  console.log('borowe books :', borrowedBooks);

  useEffect(() => {

    const fetchBorrowedBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/book/borrowBooks", {
          withCredentials: true,
        });

        console.log("res.data ", res.data);

        if (res.status === 200) {
          setBorrowedBooks(res.data);

        }
      } catch (error) {
        console.error("error in  fetch books", error);
      }
    };

    fetchBorrowedBooks();
  }, []);





  return (
    <div className="max-w-5xl mx-auto p-6 h-screen pt-17">
      <h1 className="text-3xl font-bold mb-6">📚 {authUser?.fullName}'s Dashboard</h1>


      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Borrowed Books</h2>
        {borrowedBooks?.length === 0 ? (
          <p className="text-gray-600">You haven't borrowed any books yet.</p>
        ) : (
          borrowedBooks?.map((book) => (
            <div
              key={book?.id}
              className="mb-6 p-4 border rounded-xl shadow-sm bg-white"
            >
              <h3 className="text-xl font-semibold">{book?.title}</h3>
              <p className="text-gray-600">
                {/* Author: {book.author} | Genre: {book?.genre} */}
              </p>
              <p className="text-sm mb-3 text-gray-500">
                Return by: <strong>{book?.borrowedUntil}</strong>
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Dashboard;
