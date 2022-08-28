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
        console.log('1')
        findItem.count++;
      } else {
        console.log("2")
        state.items.push({
          ...action.payload,
          count: +1,
        });
      }
      // Сумма добавленных пицц
      state.totalPrice = state.items.reduce(
        (sum, obj) => {
          return obj.price * obj.count + sum
        },
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
      if (findItem && findItem.count >= 2) {
        findItem.count--;
      }
    },
  },
});

// Селекторы в редаксе - обычные функции чтоб не дублировать код, а импортировать функцию
export const selectCart = (state) => state.cartSlice;
export const selectCartItemById = (id) => state => state.cartSlice.items.find(obj => obj.id === id)

// Вытакскиваю методы из filterSlice
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
