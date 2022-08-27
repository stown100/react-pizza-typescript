import "./App.css";
import "./scss/app.scss";
import axios from "axios";
import React from "react";
// библиотека, для вшития в ссылку данных
import qs from "qs";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilters } from "./redux/slices/filterSlice";

import { listSort } from "./components/Sort";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { fetchPizzas } from "./redux/slices/pizzasSlice";

function App() {
  // Начальный стейт из редакса
  const { categoryId, sort, currentPage, search } = useSelector(
    (state) => state.filterReducer
  );
  const { items, isLoading } = useSelector((state) => state.pizzasSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Рефы для того, чтоб не происходило лишнего рендера данных
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // При первом рендере кладу данные в ссылку
  React.useEffect(() => {
    if (window.location.search) {
      // substring(1) - убирает вопросительный знак из ссылки
      const params = qs.parse(window.location.search.substring(1));
      const sort = listSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      // Для того, чтоб при первом рендере не добавлялась ссылка со значаниями сортировки, поиска, фильтрации и пагинации
      isSearch.current = true;
    }
  }, []);

  // Беру данные с сервера
  // React.useEffect(() => {
  //   // При рендере компонента - перекидывает сразу наверх страницы
  //   window.scrollTo(0, 0);
  //   if (!isSearch.current) {

  //   }
  //   isSearch.current = false;
  // }, [categoryId, sort, search, currentPage]);

  const getPizzas = async () => {
    // setIsLoading(true);
    // Все дополнения к ссылке в документации mockapi
    // Если catIndex больше 0, то в категории засовываю catIndex
    const categories = categoryId > 0 ? `category=${categoryId}` : "";
    // Убираю минус в канечной ссылке
    const sortBy = sort.sortProperty.replace("-", "");
    // Если в ссылке есть - то сортировка по возрастанию, если нет - по убыванию.
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    // Поиск на бэкенде
    const searchPizza = search ? `&search=${search}` : "";
    dispatch(
      fetchPizzas({
        currentPage,
        categories,
        sortBy,
        order,
        searchPizza,
      })
    );
  };

  React.useEffect(() => {
    // ПОСЛЕ первого рендера вкладываю (из редакса) значения в ссылку
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
        search,
      });
      // В ссылку вкладываю значания сортировки, фильтрации и пагинации
      navigate(`?${queryString}`);
    }
    // После первого рендера ставлю значение true и после этого можно будет вложить данные в ссылку
    isMounted.current = true;
    isSearch.current = false;
  }, [categoryId, sort, search, currentPage, navigate]);

  // Поиск по пиццам (способ поиска на фронтенде)
  // const pizzas = items.filter((el) => {
  //   return (
  //     el.title && el.title.toLowerCase().includes(search.toLowerCase())
  //   );
  // });

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Home items={items} isLoading={isLoading} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
