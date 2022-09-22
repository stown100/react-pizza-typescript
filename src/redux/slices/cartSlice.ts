import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Типизация items
export type CartItem = {
  id: number,
  imageUrl: string,
  price: number,
  size: number,
  title: string,
  type: string,
  count: number,
}

// Типизация initialState (Объекты принято тепизировать с помощью интерфейса)
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

// Начальный стейт фильтрации и сортировки
export const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

// Функция фильтрации, поиска, пагинации и сортировки данных
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // добавление в корзину
    addItem(state, action: PayloadAction<CartItem>) {
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
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    // Очистить корзину
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count >= 2) {
        findItem.count--;
      }
    },
  },
});

// Селекторы в редаксе - обычные функции чтоб не дублировать код, а импортировать функцию
export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItemById = (id: number) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id)

// Вытакскиваю методы из filterSlice
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
