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
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
          },
          decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item) {
              item.quantity -= 1;
              if (item.quantity === 0) {
                state.cart = state.cart.filter(i => i.id !== action.payload);
              }
            }
          },
    },
//Extra reducers are used for Async calls.
extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
    })
}
})
export const { addToCart, clearCart, removeFromCart, decrementQuantity } = productSlice.actions;

export default productSlice.reducer;