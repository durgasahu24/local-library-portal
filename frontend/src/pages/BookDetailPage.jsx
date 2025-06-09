import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

function BookDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id inside bookdetail ", id);
  const [book, setBook] = useState({});
  console.log("book", book);
  const authUser = useSelector(store => store.user);



  useEffect(() => {

    const fetchBooksById = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/book/getBookById/${id}`);
        console.log("res.data  fetch id ", res.data);


        if (res.status === 200) {
          setBook(res.data)
        }
      } catch (error) {
        console.error("error in  fetch books", error);

      }
    };

    fetchBooksById();
  }, [dispatch, id]);



  const handleBorrowClick = async () => {

    if (!authUser) {
      toast.warning("Please login or register to borrow books!");
      return
    }

    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/book/borrowBook/${id}`,
        {},
        { withCredentials: true }
      );

      console.log("res.data borrowed book", res.data);

      if (res.status === 200) {
        toast.success()
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error in borrowing book:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6 bg-white shadow-md rounded-xl min-h-screen">

      <div>
        <img
          src="https://covers.openlibrary.org/b/id/6979861-L.jpg"
          alt={book.title}
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{book?.title || "this is title of the book"}</h1>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          <p className="mb-4 text-gray-700">{book.description || "this is the description of the book "}</p>
        </div>


        <button
          onClick={handleBorrowClick}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Borrow Book
        </button>


        {book.reviews && book.reviews.length > 0 && (
          <div className="mt-6">
            {book.reviews.map((review, index) => (
              <div key={index} className="mb-2 p-2 ">
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Review:</strong> {review.review}</p>
                <p><strong>Reflection:</strong> {review.learningReflection}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetailPage;
