import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./src/db/connectDb.js";
import authRoutes from './src/routes/auth.route.js'


const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/api/auth', authRoutes)






const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
