import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js'
import booksReducer from './bookSlice.js'



const store = configureStore({
    reducer:{
        user:userReducer,
        Books:booksReducer
    }
})


export default store;