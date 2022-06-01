import { createSlice } from "@reduxjs/toolkit";

// Начальный стейт фильтрации и сортировки
export const initialState = {
    currentPage: 1,
};

// Функция фильтрации и сортировки данных
export const paginationSlice = createSlice({
  name: "pagination",
  initialState: initialState,
  reducers: {
    // Поиск
    setCurrentPage(state, action) {
        state.currentPage = action.payload
    },
  },
});

// Вытакскиваю методы из searchSlice
export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
