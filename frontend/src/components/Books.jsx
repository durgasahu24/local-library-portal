import React, { useEffect } from 'react'
import BookCard from '../components/BookCard.jsx'
import axios from 'axios'
import { setBooks } from '../redux/bookSlice.js'
import { useDispatch, useSelector } from 'react-redux';


function Books() {


    const dispatch = useDispatch();
    const books = useSelector(store => store.Books);

    console.log("books in books ", books);


    useEffect(() => {

        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/v1/book/allBooks");
                console.log("res.data ", res.data);

                if (res.status === 200) {
                    dispatch(setBooks(res.data));
                }
            } catch (error) {
                console.error("error in  fetch books", error);
            }
        };

        fetchBooks();
    }, [dispatch]);





    return (
        <div className="max-w-6xl mx-auto p-4 h-screen">
            <h1 className="text-2xl font-bold mb-4">📚 Browse Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books?.books?.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}
            </div>
        </div>
    );


}

export default Books
