import { createSlice } from "@reduxjs/toolkit";

// Начальный стейт фильтрации и сортировки
export const initialState = {
  search: "",
};

// Функция фильтрации и сортировки данных
export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    // Поиск
    setSearch(state, action) {
        state.search = action.payload
    },
  },
});

// Вытакскиваю методы из searchSlice
export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
