import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string,
  sortProperty: 'rating' | 'title' | '-price' | 'price',
}

interface FilterSliceState {
  categoryId: number,
  sort: Sort,
  search: string,
  currentPage: number,
}

// Начальный стейт фильтрации и сортировки
export const initialState: FilterSliceState = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    // сортировка
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    // Поиск
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    // Пагинация
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    // Кладу в редакс значения с ссылки
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.search = action.payload.search;
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

// Селекторы в редаксе - обычные функции чтоб не дублировать код, а импортировать функцию
export const selectSort = (state: RootState) => state.filterReducer

// Вытакскиваю методы из filterSlice
export const { setCategoryId, setSort, setSearch, setFilters, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
