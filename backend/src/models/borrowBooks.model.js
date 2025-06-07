import mongoose from "mongoose"


const borrowedBooksSchema = new mongoose.Schema({

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    borrowedUntil: {
        type: String
    },
    genreCode: {
        type: String
    }

})

export default borrowedBooksSchema;

