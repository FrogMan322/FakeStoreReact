import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
  cartItems: [],
  checkout: [],
  totalAmount: 0,
  isVisible: false,
  notification: null,
  modalVisible: false,
  showCart: false,
  imageValue: "",
  searchValue: "",
  chagePicture: null,
};

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
    modalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },

    getImageValue: (state, action) => {
      const id = action.payload.id;

      if (id === undefined) {
        state.imageValue = "";
        state.chagePicture = null;
        return;
      }
      const data = action.payload.data;

      const imgIndx = data.findIndex((el) => {
        return el.id === id;
      });

      state.chagePicture = imgIndx;
      state.imageValue = data[state.chagePicture].image;
    },

    slideCart: (state, action) => {
      state.showCart = action.payload;
    },
    searchValueForm: (state, action) => {
      state.searchValue = action.payload;
    },
    getCheckoutItems(state, action) {
      state.checkout = state.cartItems;
    },
    deleteCheckoutItem(state, action) {
      // Zavrsi kasnije brisanje itama iz checkout
      const itemId = action.id;
      const idx = state.checkout.findIndex((item) => item.id === itemId);
      state.checkout.splice(idx, 1);
    },
  },
});
const store = configureStore({ reducer: storeItems.reducer });

export const storeItemsActions = storeItems.actions;
export default store;
