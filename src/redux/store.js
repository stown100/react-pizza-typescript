import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

// Хранилище
export const store = configureStore({
  reducer: { filterReducer, cartSlice, pizzasSlice },
});
