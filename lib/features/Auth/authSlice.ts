import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    user: string | null;
}

const initialState: CounterState = {
    user: null,
};

const counterSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        currentUser: (state, action) => {
            state.user = action.payload;
        },
        clearAccessToken: (state) => {
            state.user = null;
        },
    }
});

export const { currentUser, clearAccessToken } =
    counterSlice.actions;

export default counterSlice.reducer;
