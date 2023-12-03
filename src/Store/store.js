import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { quantity: 0, cartItems: [] };

const storeItems = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload.id;
      const items = action.payload.items;
      const checking = state.cartItems.find((item) => item.id === id);
      const wantedItem = items.find((item) => item.id === id);
      if (checking === undefined) {
        state.cartItems.push({ ...wantedItem, quantity: 1 });
      } else {
        state.cartItems.map((item) => {
          if (item.id === id) {
            item.quantity++;
            return;
          }
        });
      }
    },
  },
});
const store = configureStore({ reducer: storeItems.reducer });

export const storeItemsActions = storeItems.actions;
export default store;
