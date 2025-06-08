import Book from '../models/book.model.js';
import Review from '../models/review.model.js'
import User from '../models/user.model.js'


const createReview = async (req, res) => {

    try {

        const bookId = req.params.id;
        const userId = req.user.id;
        const user = req.user;

        const { rating, review, learningReflection } = req.body;

        if (!rating || !review || !learningReflection) {
            return res.status(404).json({ message: "all feilds are required :" })
        }

        const borrowedBook = user.borrowedBooks.find(b => b.bookId.toString() === bookId);
        if (!borrowedBook) {
            return res.status(403).json({ message: "You can only review books you have borrowed" });
        }

        const newReview = await Review.create({
            userId,
            bookId,
            rating,
            review,
            learningReflection,
            datePosted: new Date(),
        });

        return res.status(201).json({ message: "Review submitted successfully", review: newReview });

    } catch (error) {
        console.error("Error submitting review:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



const getReviewByBookId = async (req, res) => {

    try {
        const { id } = req.params;

        const bookReviews = await Review.find({ bookId: id }).select("rating review datePosted");

        res.status(200).json(bookReviews);

    } catch (error) {
        console.log("error in getReviewByBookId ", error);
        return res.status(500).json({ message: "server error " });
    }
}


export default {
    createReview,
    getReviewByBookId
};
