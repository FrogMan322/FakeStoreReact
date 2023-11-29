import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { quantity: 0, cartItems: [] };

const storeItems = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    addToCart: async (state, id) => {
      // id radi
      const endpoint = await fetch(
        `https://fakestoreapi.com/products/${id.payload}`
      );
      const data = await endpoint.json();
    },
  },
});
const store = configureStore({ reducer: storeItems.reducer });

export const storeItemsActions = storeItems.actions;
export default store;
