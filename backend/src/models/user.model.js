import mongoose from "mongoose";
import borrowedBooksSchema from "./borrowBooks.model.js";

const UserSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlengh: 5
    },
    readerLevel: {
        type: String
    },
    borrowedBooks: [borrowedBooksSchema]

})


const User = mongoose.model("User", UserSchema);

export default User;