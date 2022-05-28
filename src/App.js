import axios from "axios";
import React from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  // Стейт для пагинации
  const [currentPage, setCurrentPage] = React.useState(1);
  // стейт категорий
  const [catIndex, setCatIndex] = React.useState(0);
  // стейт сортировки
  const [sortIndex, setSortIndex] = React.useState({
    name: 'популярности',
    sort: 'rating'
  });

  // Беру данные с сервера
  React.useEffect(() => {
    setIsLoading(true);
    // Все дополнения к ссылке в документации mockapi
    // Если catIndex больше 0, то в категории засовываю catIndex
    const categories = catIndex > 0 ? `category=${catIndex}` : '';
    // Убираю минус в канечной ссылке
    const sortBy = sortIndex.sort.replace('-', '');
    // Если в ссылке есть - то сортировка по возрастанию, если нет - по убыванию.
    const order = sortIndex.sort.includes('-') ? 'asc' : 'desc';
    // Поиск на бэкенде
    const search = searchValue ? `&search=${searchValue}` : '';
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
  }, [catIndex, sortIndex, searchValue, currentPage]);


  // Поиск по пиццам (способ поиска на фронтенде)
  const pizzas = items.filter(el =>  {
      return el.title && el.title.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <div className="App">
      <div className="wrapper">
        <Header search={searchValue} setSearch={setSearchValue} />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  items={items} pizzas={pizzas}
                  isLoading={isLoading}
                  catIndex={catIndex}
                  setCatIndex={setCatIndex}
                  sortIndex={sortIndex}
                  setSortIndex={setSortIndex}
                  setCurrentPage={setCurrentPage}
                />
              }
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
