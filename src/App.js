import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId, setSort } from "./redux/slices/filterSlice";

import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";

export const SearchContext = React.createContext("");

function App() {
  // Начальный стейт из редакса
  const { categoryId, sort } = useSelector((state) => state.filterReducer);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  // Стейт для пагинации
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openPopup, setOpenPopup] = React.useState(false);

  // Беру данные с сервера
  React.useEffect(() => {
    setIsLoading(true);
    // Все дополнения к ссылке в документации mockapi
    // Если catIndex больше 0, то в категории засовываю catIndex
    const categories = categoryId > 0 ? `category=${categoryId}` : "";
    // Убираю минус в канечной ссылке
    const sortBy = sort.sort.replace("-", "");
    // Если в ссылке есть - то сортировка по возрастанию, если нет - по убыванию.
    const order = sort.sort.includes("-") ? "asc" : "desc";
    // Поиск на бэкенде
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://628c1a08a3fd714fd02cbd66.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    // При рендере компонента - перекидывает сразу наверх страницы
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  const dispatch = useDispatch();

  // Функция сортировки
  const handleSortItems = (obj) => {
    dispatch(setSort(obj));
    setOpenPopup(!openPopup);
  };

  //При клике выбирается категория
  const onClickCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  // Поиск по пиццам (способ поиска на фронтенде)
  const pizzas = items.filter((el) => {
    return (
      el.title && el.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <div className="App">
      <div className="wrapper">
        {/*Кладу переменные в контекст*/}
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    items={items}
                    pizzas={pizzas}
                    isLoading={isLoading}
                    categoryId={categoryId}
                    sort={sort}
                    setCurrentPage={setCurrentPage}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    onClickCategory={onClickCategory}
                    handleSortItems={handleSortItems}
                  />
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
