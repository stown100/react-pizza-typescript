import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

function App() {
  // Начальный стейт из редакса
  const { categoryId, sort } = useSelector((state) => state.filterReducer);
  const { search } = useSelector((state) => state.searchReducer);
  const { currentPage } = useSelector((state) => state.paginationReducer);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
    const searchPizza = search ? `&search=${search}` : "";
    axios
      .get(
        `https://628c1a08a3fd714fd02cbd66.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sortBy}&order=${order}${searchPizza}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    // При рендере компонента - перекидывает сразу наверх страницы
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, currentPage]);

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
