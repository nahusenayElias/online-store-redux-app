import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const api = "https://fakestoreapi.com/products";

//Best practice: Functions go at the top
export const fetchProducts = createAsyncThunk('products/products', async () => {
    const response = await axios.get(api);
    return response.data;
})

//Best practice: initialState comes before the reducer
const initialState = {
    products: [],
    cart: [],
}
//Creating state
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
        },
        clearCart: (state) => {
            state.cart = [];
        }
    },
//Extra reducers are used for Async calls.
extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
    })
}
})
export const { addToCart, clearCart } = productSlice.actions;

export default productSlice.reducer;