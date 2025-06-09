import { createSlice } from '@reduxjs/toolkit';


const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: null
    },
    reducers: {
        setBooks: (state, action) => {
            console.log("action books ",action.payload);
            state.books = action.payload;
            console.log("state books ",state.books);
        }
    }
})


export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;

