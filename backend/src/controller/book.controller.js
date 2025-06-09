import Book from '../models/book.model.js'
import moment from 'moment'
import User from '../models/user.model.js'
import mongoose from 'mongoose'


const getAllBooks = async (req, res) => {

    try {

        const Books = await Book.find()
        return res.status(200).json(Books)

    } catch (error) {
        console.log("error in getAllBooks : ", error)
        return res.status(500).json({ message: "server error" })
    }

}


const getBookById = async (req, res) => {

    try {
        const { id } = req.params;

        const book = await Book.findById(id).populate("reviews");

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);

    } catch (error) {

        console.log("error in getBookById:", error);

        return res.status(500).json({ message: "Server error" });
    }
};



const borrowBook = async (req, res) => {


    const bookId = req.params.id;
    const bookObjectId = new mongoose.Types.ObjectId(bookId);


    const user = req.user;


    const book = await Book.findById(bookId);


    const alreadyBorrowed = user.borrowedBooks.find(b => b.bookId.equals(bookObjectId));


    console.log("already Borrow ", alreadyBorrowed);


    if (alreadyBorrowed) {
        return res.status(400).json({ message: 'You have already borrowed this book' });
    }



    if (user.borrowedBooks.length >= 3) {
        return res.status(400).json({ message: 'Borrowing limit finished' });
    }


    const sameGenre = user.borrowedBooks.find(b => b.genre === book.genre);


    if (sameGenre) {
        return res.status(400).json({ message: `You have already borrowed a book from this genre` });
    }




    const borrowedUntil = moment().add(14, 'days').format('DD-MMM-YYYY');

    console.log("book genre 2 : ", book.genre)

    user.borrowedBooks.push({
        bookId: book.id,
        genre: book.genre,
        borrowedUntil
    });


    await user.save();


    return res.status(200).json({
        message: "Book borrowed successfully",
        borrowedUntil
    });
};


const getBorrowedBooks = async (req, res) => {

    const user = req.user;

    console.log("getBorrwes books : ", user);

    const borrowedBooks = await Promise.all(
        user.borrowedBooks.map(async (borrow) => {
            const book = await Book.findById(borrow.bookId);

            if (!book) return null;

            return {
                id: book._id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                borrowedUntil: borrow.borrowedUntil
            };
        })
    );

    console.log("borrow at the end  ", borrowedBooks);

    return res.status(200).json(borrowedBooks);
};



const filterBooks = async (req, res) => {
  try {
    let { genre, author, rating } = req.query;
    const filter = {};

    // Convert genre and author to arrays if they are not already
    if (genre) {
      genre = Array.isArray(genre) ? genre : genre.split(",");
      filter.genre = { $in: genre };
    }

    if (author) {
      author = Array.isArray(author) ? author : author.split(",");
      filter.author = { $in: author };
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    const books = await Book.find(filter);

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error in filterBooks:", error);
    res.status(500).json({ message: "Server error" });
  }
};





export default {
    getAllBooks,
    getBookById,
    borrowBook,
    getBorrowedBooks,
    filterBooks
}
