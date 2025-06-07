import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    genreCode: {
        type: String
    },
    rating: {
        type: Number
    },
    available: {
        type: Boolean,
        default: true // book  avilable for borrow if true
    },
    borrowedByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    borrowedUntil: {
        type: String
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
