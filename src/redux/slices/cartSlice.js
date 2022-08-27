import { createSlice } from "@reduxjs/toolkit";

// Начальный стейт фильтрации и сортировки
export const initialState = {
  totalPrice: 0,
  items: [],
};

// Функция фильтрации, поиска, пагинации и сортировки данных
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // добавление в корзину
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: +1,
        });
      }
      // Сумма добавленных пицц
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    // Удаление из корзины
    removeItem(state, action) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    // Очистить корзину
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
  },
});

// Вытакскиваю методы из filterSlice
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
