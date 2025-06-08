import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const registerUser = async (req, res) => {

    try {

        const { fullName, email, password, readerLevel } = req.body;

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ message: 'email already exist ' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);



        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            readerLevel,
            borrowedBooks: []
        }); hashedPassword

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            })
            .json({
                message: 'User created successfully',
                user: newUser
            });

    } catch (error) {
        console.log('error in register:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const loggedInUser = await User.findById(user._id).select("-password ");


        res.status(200)
            .cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            .json({
                message: 'login successfully',
                user: loggedInUser
            });

    } catch (error) {
        console.log('error in login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



export default {
    registerUser,
    loginUser
}