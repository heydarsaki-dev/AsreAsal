import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers:{
        [HYDRATE]: (state, action) => {
            return state = {
                ...state,
                ...action.payload.auth
            };
        },
    }
})
export const {setUser} = authSlice.actions;
export default authSlice.reducer;
