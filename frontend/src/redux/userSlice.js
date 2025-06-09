import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser: null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        logOut:(state,action) => {
            state.authUser = null;
        }
    }
})


export const { setAuthUser , logOut } = userSlice.actions;

export default userSlice.reducer;

