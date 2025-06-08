import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {

    try {
        
        console.log(req.cookies);

        const token = req.cookies.token
        console.log(token)

        if (!token) {
            return res.status(400).json({ message: "user not authenticated : " })
        }



        const decodeToken =  jwt.verify(token, process.env.JWT_SECRET)

        if (!decodeToken) {

            return res.status(400).json({ message: "Invalid token" })
        }

        const user = await User.findById(decodeToken.userId)

        req.user = user;
        
        next();


    } catch (error) {
        console.log("error in isAuthenticated : ", error.message);
    }

}