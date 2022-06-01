import { createSlice } from "@reduxjs/toolkit";

// Начальный стейт фильтрации и сортировки
export const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
  searchPizza: "",
};

// Функция фильтрации и сортировки данных
export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
      // фильтрация
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    // сортировка
    setSort(state, action) {
        state.sort = action.payload
    },
    setSearch(state, action) {
        console.log(action)
        state.searchPizza = action.payload
    },
  },
});

// Вытакскиваю методы из filterSlice
export const { setCategoryId, setSort, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
