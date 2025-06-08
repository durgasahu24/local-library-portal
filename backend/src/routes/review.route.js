import express from 'express'
const route = express.Router();
import reviewController from '../controller/review.controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js';


route.post('/:id/createReview',isAuthenticated,reviewController.createReview);
route.post('/:id/getReview',reviewController.getReviewByBookId);


export default route;