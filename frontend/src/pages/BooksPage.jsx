import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Books from "../components/Books.jsx";
import { setBooks } from "../redux/bookSlice.js";
import { useDispatch } from "react-redux";

const genresList = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography", "Fantasy", "History"];
const authorsList = ["J.K. Rowling", "George Orwell", "Isaac Asimov", "Jane Austen"];
const ratingsList = ["5", "4", "3", "2", "1"];

export default function BookPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [expandedFilter, setExpandedFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    genre: [],
    author: [],
    rating: "",
  });

  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filters = {
      genre: params.get("genre") ? params.get("genre").split(",") : [],
      author: params.get("author") ? params.get("author").split(",") : [],
      rating: params.get("rating") || "",
    };
    setActiveFilters(filters);
  }, [location.search]);


  useEffect(() => {
    fetchFilteredBooks();
  }, [activeFilters]);

  const toggleFilter = (filterName) => {
    setExpandedFilter(expandedFilter === filterName ? "" : filterName);
  };


  const handleCheckboxChange = (value, filterKey) => {
    let updated = [...activeFilters[filterKey]];
    if (updated.includes(value)) {
      updated = updated.filter((v) => v !== value);
    } else {
      updated.push(value);
    }
    const newFilters = { ...activeFilters, [filterKey]: updated };
    setActiveFilters(newFilters);
    updateFiltersInURL(newFilters);
  };


  const handleRadioChange = (value, filterKey) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    updateFiltersInURL(newFilters);
  };

  const updateFiltersInURL = (filters) => {
    const params = new URLSearchParams();

    if (filters.genre.length) params.set("genre", filters.genre.join(","));
    if (filters.author.length) params.set("author", filters.author.join(","));
    if (filters.rating) params.set("rating", filters.rating);

    navigate({ search: params.toString() });
  };


  const fetchFilteredBooks = async () => {
    const query = new URLSearchParams();

    activeFilters.genre.forEach((g) => query.append("genre", g));
    activeFilters.author.forEach((a) => query.append("author", a));
    if (activeFilters.rating) query.append("rating", activeFilters.rating);


    console.log("query ; ", query.toString());

    try {
      const res = await axios.get(`http://localhost:4000/api/v1/book/filterBooks?${query.toString()}`);
      console.log("res books filter : ", res.data.books);
      dispatch(setBooks(res.data.books));
      console.log("res in fetch books : ", res);
    } catch (err) {
      console.error("Failed to fetch filtered books:", err);
    }
  };

  return (
    <div className="w-full flex min-h-screen pt-14">
      <div className="flex-shrink-0 w-full max-w-xs p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Filter Books</h2>


        <div className="mb-4">
          <h3 onClick={() => toggleFilter("genre")} className="flex justify-between items-center cursor-pointer font-semibold mb-2">
            Genre {expandedFilter === "genre" ? <RemoveIcon /> : <AddIcon />}
          </h3>
          {expandedFilter === "genre" &&
            genresList.map((genre) => (
              <label key={genre} className="flex items-center space-x-2 mb-1">
                <input
                  type="checkbox"
                  checked={activeFilters.genre.includes(genre)}
                  onChange={() => handleCheckboxChange(genre, "genre")}
                />
                <span>{genre}</span>
              </label>
            ))}
        </div>


        <div className="mb-4">
          <h3 onClick={() => toggleFilter("author")} className="flex justify-between items-center cursor-pointer font-semibold mb-2">
            Author {expandedFilter === "author" ? <RemoveIcon /> : <AddIcon />}
          </h3>
          {expandedFilter === "author" &&
            authorsList.map((author) => (
              <label key={author} className="flex items-center space-x-2 mb-1">
                <input
                  type="checkbox"
                  checked={activeFilters.author.includes(author)}
                  onChange={() => handleCheckboxChange(author, "author")}
                />
                <span>{author}</span>
              </label>
            ))}
        </div>


        <div className="mb-4">
          <h3 onClick={() => toggleFilter("rating")} className="flex justify-between items-center cursor-pointer font-semibold mb-2">
            Rating {expandedFilter === "rating" ? <RemoveIcon /> : <AddIcon />}
          </h3>
          {expandedFilter === "rating" &&
            ratingsList.map((rating) => (
              <label key={rating} className="flex items-center space-x-2 mb-1">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={activeFilters.rating === rating}
                  onChange={() => handleRadioChange(rating, "rating")}
                />
                <span>{rating} stars & up</span>
              </label>
            ))}
        </div>
      </div>


      <div className="flex-grow p-4">
        <Books books={booksData} />
      </div>
    </div>
  );
}
