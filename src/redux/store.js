import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";

// Хранилище
export const store = configureStore({
  reducer: { filterReducer },
});
