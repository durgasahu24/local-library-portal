import express from 'express'
const route = express.Router();
import authController from '../controller/auth.controller.js';

route.post('/register', authController.registerUser)
route.post('/login', authController.loginUser)


export default route;