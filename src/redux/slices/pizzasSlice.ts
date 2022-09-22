import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// Типизирую параметры в запросе fetch
type FetchPizzasArgs = {
  sortBy: string;
  order: string;
  categories: string;
  searchPizza: string;
  currentPage: string;
};

// Типизация items
export type Item = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  prices: number[];
  category: number;
  rating: number;
};

// Делаю запрос на сервер ассинхронным экшеном с помощью createAsyncThunk
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({
    currentPage,
    categories,
    sortBy,
    order,
    searchPizza,
  }: FetchPizzasArgs) => {
    const items = await axios.get(
      `https://628c1a08a3fd714fd02cbd66.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sortBy}&order=${order}${searchPizza}`
    );
    return items.data as Item[];
  }
);

// Типизация initialState (Объекты принято тепизировать с помощью интерфейса)
interface PizzsSliceState {
  items: Item[];
  isLoading: "Loading" | "success" | "error";
}

// Начальный стейт фильтрации и сортировки
export const initialState: PizzsSliceState = {
  items: [],
  isLoading: "Loading",
};

// Функция фильтрации, поиска, пагинации и сортировки данных
export const pizzasSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
  },
  // в экроредюсеры отправляют ассинхронные запросы/ Связанно с createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.isLoading = "Loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.isLoading = "error";
      state.items = [];
    });
  },

  // Без TS
  // extraReducers: {
  //   [fetchPizzas.pending]: (state, action) => {
  //     state.isLoading = "Loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.isLoading = "success";
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.isLoading = "error";
  //     state.items = [];
  //   },
  // },
});

export const selectPizza = (state: RootState) => state.pizzasSlice;

// Вытакскиваю методы из filterSlice
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
