import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Делаю запрос на сервер ассинхронным экшеном с помощью createAsyncThunk
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ currentPage, categories, sortBy, order, searchPizza }) => {
    const items = await axios.get(
      `https://628c1a08a3fd714fd02cbd66.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sortBy}&order=${order}${searchPizza}`
    );
    return items.data;
  }
);

// Начальный стейт фильтрации и сортировки
export const initialState = {
  items: [],
  isLoading: "Loading",
};

// Функция фильтрации, поиска, пагинации и сортировки данных
export const pizzasSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  // в экроредюсеры отправляют ассинхронные запросы/ Связанно с createAsyncThunk
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.isLoading = "Loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.isLoading = "error";
      state.items = [];
    },
  },
});

export const selectPizza = (state) => state.pizzasSlice

// Вытакскиваю методы из filterSlice
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
