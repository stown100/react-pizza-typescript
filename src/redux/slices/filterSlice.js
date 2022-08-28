import { createSlice } from "@reduxjs/toolkit";

// Начальный стейт фильтрации и сортировки
export const initialState = {
  categoryId: 0,
  sort: {
    name: "от самой популярной",
    sortProperty: "rating",
  },
  search: "",
  currentPage: 1,
};

// Функция фильтрации, поиска, пагинации и сортировки данных
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
      state.sort = action.payload;
    },
    // Поиск
    setSearch(state, action) {
      state.search = action.payload;
    },
    // Пагинация
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    // Кладу в редакс значения с ссылки
    setFilters(state, action) {
      state.search = action.payload.search;
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

// Селекторы в редаксе - обычные функции чтоб не дублировать код, а импортировать функцию
export const selectSort = (state) => state.filterReducer

// Вытакскиваю методы из filterSlice
export const { setCategoryId, setSort, setSearch, setFilters, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
