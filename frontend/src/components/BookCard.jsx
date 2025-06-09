import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';


const BookCard = ({ book }) => {
  const {
    _id,
    title,
    author,
    genre,
    rating,
    readerLevel,
    coverImage = "https://via.placeholder.com/150",
  } = book;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authUser } = useSelector(store => store.user);

  console.log("auth user in bok card ", authUser);


  const onBorrow = async () => {

    try {

      if (!authUser) {
        toast.warning("Please login or register to borrow books!");
        return
      }



      const res = await axios.post(
        `http://localhost:4000/api/v1/book/borrowBook/${_id}`,
        {},
        { withCredentials: true }
      );

      console.log("res.data borrowed book", res.data);

      if (res.status === 200) {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Error in borrowing book:", error);
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="bg-whiteshadow-lg rounded-2xl overflow-hidden p-4 flex flex-col justify-between transition hover:shadow-xl">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600">by {author}</p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Genre:</strong> {genre}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Reader Level:</strong> {readerLevel}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          to={`/bookdetail/${_id}`}
          className="bg-yellow-400 text-black text-center py-1.5 rounded-lg hover:bg-yellow-500 transition"
        >
          View Details
        </Link>


        <button
          onClick={onBorrow}
          className="bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 transition"
        >
          Borrow
        </button>

      </div>
    </div>
  );
};


export default BookCard; 