import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async(checkoutData, {rejectWithValue}) => {
   try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`, 
            },
        }
    );
    return response.data;
   } catch (error) {
    return rejectWithValue(error.response.data);
   }
});

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout : null,
        loading : false,
        error : null,
    },
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(createCheckout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCheckout.fulfilled, (state, action) => {
            state.loading = false;
            state.checkout = action.payload;
        })
        .addCase(createCheckout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    },
});

export default checkoutSlice.reducer;