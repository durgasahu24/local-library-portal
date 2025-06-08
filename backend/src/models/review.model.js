import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    rating: {
        type: Number,
        required: true
    },
    review:
    {
        type: String,
        required: true
    },
    learningReflection: {
        type: String,
        required: true
    },
    datePosted: {
        type: String
    }
});

const Review = mongoose.model('Review', reviewSchema);


export default Review;


