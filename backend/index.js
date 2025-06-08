import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./src/db/connectDb.js";
import authRoutes from './src/routes/auth.route.js'
import bookRoutes from './src/routes/book.route.js'
import reviewRoutes from './src/routes/review.route.js'

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/book', bookRoutes)
app.use('/api/v1/review', reviewRoutes)



const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
