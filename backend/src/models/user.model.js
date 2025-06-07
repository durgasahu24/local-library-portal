import mongoose from "mongoose";
import borrowedBooksSchema from "./borrowBooks.model.js";

const UserSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    readerLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    borrowedBooks: [borrowedBooksSchema]

})


const User = mongoose.model("User", UserSchema);

export default User;