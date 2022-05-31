import { createSlice } from "@reduxjs/toolkit";

// Начальный стейт фильтрации и сортировки
export const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
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
    }
  },
});

// Вытакскиваю методы из filterSlice
export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
