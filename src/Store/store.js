import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { quantity: 0, cartItems: [], totalAmount: 0 };

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
        // eslint-disable-next-line
        state.cartItems.map((item) => {
          if (item.id === id) {
            item.quantity++;
          }
        });
      }
    },
    increment: (state, action) => {
      const id = action.payload;
      // eslint-disable-next-line
      state.cartItems.map((item) => {
        if (item.id === id) {
          item.quantity++;
        }
      });
    },
    decriment: (state, action) => {
      const id = action.payload;
      const checkItem = state.cartItems.find((item) => item.id === id);
      // eslint-disable-next-line
      state.cartItems.map((item) => {
        if (item.id === id) {
          item.quantity--;
        }
      });
      if (checkItem.quantity === 0) {
        const newCart = state.cartItems.filter((item) => {
          return item.id !== id;
        });
        state.cartItems = newCart;
      }
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const newCart = state.cartItems.filter((item) => {
        return item.id !== id;
      });
      state.cartItems = newCart;
    },
    cleareCart: (state) => {
      state.cartItems = [];
    },
    amount: (state, action) => {
      const totalSum = action.payload;
      const totalQuantity = totalSum
        .map((item) => item.quantity)
        .reduce((ac, cv) => ac + cv, 0);
      const totalPrice = totalSum
        .map((item) => item.price)
        .reduce((ac, cv) => ac + cv, 0);
      state.quantity = totalQuantity;
      state.totalAmount = totalPrice * totalQuantity;
    },
  },
});
const store = configureStore({ reducer: storeItems.reducer });

export const storeItemsActions = storeItems.actions;
export default store;
