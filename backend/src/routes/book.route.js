import express from 'express'
const route = express.Router();
import bookControler from '../controller/book.controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js';


route.get('/allBooks', bookControler.getAllBooks);
route.get('/getBookById/:id', bookControler.getBookById);
route.post('/borrowBook/:id', isAuthenticated, bookControler.borrowBook)
route.get('/borrowBooks', isAuthenticated, bookControler.getBorrowedBooks);
route.get('/filterBooks', bookControler.filterBooks);



export default route;