import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    accessToken: string | null;
}

const initialState: CounterState = {
    accessToken: null,
};

const counterSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
        },
    }
});

export const { setAccessToken, clearAccessToken } =
    counterSlice.actions;

export default counterSlice.reducer;
