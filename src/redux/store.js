import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import searchReducer from './slices/searchSlice'
import paginationReducer from './slices/paginationSlice'

// Хранилище
export const store = configureStore({
  reducer: { filterReducer, searchReducer, paginationReducer },
});
